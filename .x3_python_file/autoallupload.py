import requests
import threading
import os
import boto3
import sys
import subprocess

import datetime
import loguru
import sqlalchemy
import sqlalchemy.ext.automap
import sqlalchemy.orm
import sqlalchemy.schema
from boto3.s3.transfer import TransferConfig

#process = subprocess.run(["hrut_socuid"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding="utf-8", timeout=1)	# X3執行取得BoardID指令
#boardid = (process.stdout.split('\n')[0]).split(' ')[1]								# 取得BoardID
boardid = '010d0f14001807020107012020122316'

bucket_name = 'lab321-carview'

username = 'admin'     # 資料庫帳號
password = '12345678'     # 資料庫密碼
host = 'testdb.cvprqxu67qc8.us-east-1.rds.amazonaws.com'    # 資料庫位址
port = '3300'         # 資料庫埠號
database = 'carview'   # 資料庫名稱
engine = sqlalchemy.create_engine(f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}',echo=False)


config = TransferConfig(multipart_threshold = 1024*10,		# 大於10MB時分段上傳
			max_concurrency = 10,			
			multipart_chunksize = 1024*10,		# 分段時每個部份的大小
			use_threads = True)			# 執行S3傳輸時使用並行線程


class SendFile():
	def __init__(self, s, address, upload, sucupload):
		self.s = s
		self.upload = upload					# 檔案資料夾名稱
		self.files = address + upload				# 待上傳資料夾
		self.UploadSuccess = address + sucupload		# 已上傳資料夾
		self.allFileLise = os.listdir(self.files)		# 待上傳檔案列表

	def multipart_upload_boto3(self):
		# 取得資料庫元資料
		metadata = sqlalchemy.schema.MetaData(engine)
		# 產生自動對應參照
		automap = sqlalchemy.ext.automap.automap_base()
		automap.prepare(engine, reflect=True)

		# 準備 ORM 連線
		session = sqlalchemy.orm.Session(engine)

		sqlalchemy.Table('CarNumber', metadata, autoload=True)
		# 取出對應 CarNumber 資料表的類別
		CarNumber1 = automap.classes['CarNumber']			# RDS CarNumber table
		lst = []							# table empty

		loguru.logger.info('使用過濾條件取出資料表資料')
		res1 = []
		res1 = session.query(CarNumber1).filter(CarNumber1.boardId == boardid).all()	# 取得此板號的Table
		# 載入CarNumberId		
		resn1 = []
		for CarNumber1 in res1:
			resn1 = CarNumber1.id
			accesskey = CarNumber1.accessKey			# 取得accessKey
			secretkey = CarNumber1.secretKey			# 取得secretKey
		if resn1 == lst :    
			# 硬體板號未登入在RDS
			session.rollback()
			loguru.logger.error('硬體未授權')      
			# 關閉連線
			session.close()      
		else:	

			s3 = boto3.resource('s3', aws_access_key_id=os.getenv('AWS_S3_ACCESS_KEY_ID', accesskey),	# S3登入設定 
    						aws_secret_access_key=os.getenv('AWS_S3_SECRET_ACCESS_KEY', secretkey), 						region_name=os.getenv('AWS_S3_REGION_NAME', 'us-east-1'))
			# 關閉連線
			session.close()

			for file in self.allFileLise:
				list1 = file.split('_')				# 檔名拆分
				list2 = file.split('.')				# 主副檔名拆分
				file_path = self.files + file			# 含檔名的完整路徑
				key = self.upload + file			# aws目標位置
				eventtime = list1[2][0:4] + '-' + list1[2][4:6] + '-' + list1[2][6:8] + ' ' + list1[2][8:10] + ':' + list1[2][10:12] + ':' + list1[2][12:14]						# 檔案發生時間
								
				# 準備 ORM 連線
				session = sqlalchemy.orm.Session(engine)
				# 載入 Event 資料表資訊
				sqlalchemy.Table('Event', metadata, autoload=True)
				Event1 = automap.classes['Event']				# RDS Event table
				res2 = []
				res2 = session.query(Event1).filter(Event1.eventTime == eventtime, Event1.carNumberId == resn1).all()
				# 載入EventId
				resn2 = []
				for Event1 in res2:
					resn2 = Event1.id 
				if resn2 == lst:
					try:
						# 新增第一筆Event
						Event2 = Event1()
						Event2.eventTime = eventtime
						Event2.carNumberId = resn1
						session.add(Event2)

						# 寫入資料庫
						session.commit()
						res2 = session.query(Event1).filter(Event1.eventTime == eventtime, Event1.carNumberId == resn1).all()
						# 再次載入EventId
						resn2 = []
						for Event1 in res2:
							resn2 = Event1.id
					except Exception as e:
        					# 發生例外錯誤
						session.rollback()
						loguru.logger.error('新增事件失敗')
						loguru.logger.error(e)
				
				Details = automap.classes['Details']				# RDS Detail table
				res3 = []
				res3 = session.query(Details).filter(Details.details == list2[0], Details.eventId == resn2).all()
				# 載入DetailsId
				resn3 = []
				for Details in res3:
					resn3 = Details.id 
				if resn3 == lst:	
					try:
						# 建立第一筆Details
						Details = Details()
						Details.details = list2[0]			# 檔名
						Details.eventId = resn2
						# 依照副檔名更新資料
						if list2[1] == 'jpg':
							Details.image = 1
						elif list2[1] == 'mp4':
							Details.video = 1
						session.add(Details)
						
						# 寫入資料庫
						session.commit()

						# 關閉連線
						session.close()

						# 上傳
						s3.Object(bucket_name, key).upload_file(file_path, ExtraArgs = {'ContentType':'*/*'},
									Config = config, Callback = ProgressPercentage(file_path))

						# 將已上傳的檔案移到已上傳的資料夾
						#os.replace(file_path, self.UploadSuccess + file)
					except Exception as e:
						# 發生例外錯誤
						session.rollback()
						loguru.logger.error('新增資料失敗')
						loguru.logger.error(e)
						# 關閉連線
						session.close()

				else:
					try:
						# 依照副檔名更新資料
						if list2[1] == 'jpg':
							Details.image = 1
						elif list2[1] == 'mp4':
							Details.video = 1
						session.add(Details)

						# 寫入資料庫
						session.commit()

						# 關閉連線
						session.close()

						# 上傳
						s3.Object(bucket_name, key).upload_file(file_path, ExtraArgs = {'ContentType':'*/*'},
									Config = config, Callback = ProgressPercentage(file_path))

						# 將已上傳的檔案移到已上傳的資料夾
						#os.replace(file_path, self.UploadSuccess + file)
					except Exception as e:
						# 發生例外錯誤
						session.rollback()
						loguru.logger.error('新增副檔名失敗')
						loguru.logger.error(e)

						# 關閉連線
						session.close()
				# 關閉連線
				session.close()

						
class ProgressPercentage(object):
	def __init__(self, filename):
		self._filename = filename
		self._size = float(os.path.getsize(filename))
		self._seen_so_far = 0
		self._lock = threading.Lock()

	def __call__(self, bytes_amount):
		# To simplify we'll assume this is hooked up
		# to a single filename.
		with self._lock:
			self._seen_so_far += bytes_amount
			percentage = (self._seen_so_far / self._size) * 100
			sys.stdout.write("\r%s  %s / %s  (%.2f%%)" % (
				self._filename, self._seen_so_far, self._size,
				percentage))
			sys.stdout.flush()


if __name__ == '__main__':
	s = requests.session()
	# 上傳圖片
	send = SendFile(s, '/home/lab321/桌面/data/', 'image/', 'im_success/')		# 檔案資料路徑；圖片資料夾；圖片上傳成功資料夾
	send.multipart_upload_boto3()
	# 上傳影片
	send = SendFile(s, '/home/lab321/桌面/data/', 'video/', 'vi_success/')		# 檔案資料路徑；影片資料夾；影片上傳成功資料夾
	send.multipart_upload_boto3()
	
	print ('upload finish')

	loguru.logger.add(
		f'{datetime.date.today():%Y%m%d}.log',
		rotation='1 day',
		retention='7 days',
		level='DEBUG'
	)
