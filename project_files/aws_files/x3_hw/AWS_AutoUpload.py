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

#process = subprocess.run(["hrut_socuid"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding="utf-8", timeout=1)	# X3 BoardID
#boardid = (process.stdout.split('\n')[0]).split(' ')[1]								# get BoardID
boardid = '0x0001'

#bucket_name = 'lab321-carview'

username = 'admin'     # RDS account
password = '12345678'     # RDS password
host = 'carview.cvprqxu67qc8.us-east-1.rds.amazonaws.com'    # RDS address
port = '3306'         # RDS port
database = 'carview'   # RDS name
engine = sqlalchemy.create_engine(f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}',echo=False)


config = TransferConfig(multipart_threshold = 1024*10,		# more than 10MB
			max_concurrency = 10,			
			multipart_chunksize = 1024*10,		# multipart size
			use_threads = True)			# S3 multi thread transmit


class SendFile():
	def __init__(self, s, address, upload, sucupload):
		self.s = s
		self.upload = upload					# data folder name
		self.files = address + upload				# data folder path
		self.UploadSuccess = address + sucupload		# finish upload folder path
		self.allFileLise = os.listdir(self.files)		# data list

	def multipart_upload_boto3(self):
		# get RDS data
		metadata = sqlalchemy.schema.MetaData(engine)
		# auto map RDS data
		automap = sqlalchemy.ext.automap.automap_base()
		automap.prepare(engine, reflect=True)

		# ORM connect 
		session = sqlalchemy.orm.Session(engine)

		sqlalchemy.Table('CarNumber', metadata, autoload=True)
		# CarNumber list
		CarNumber1 = automap.classes['CarNumber']			# RDS CarNumber table
		lst = []							# table empty

		loguru.logger.info('Get RDS data with filter')
		res1 = []
		res1 = session.query(CarNumber1).filter(CarNumber1.boardId == boardid).all()	# get this boardId's Table
		# get CarNumberId		
		resn1 = []
		for CarNumber1 in res1:
			resn1 = CarNumber1.id
			accesskey = CarNumber1.accessKey			# get accessKey
			secretkey = CarNumber1.secretKey			# get secretKey
		if resn1 == lst :    
			# boardId isn't in RDS
			session.rollback()
			loguru.logger.error('Hardware is not authorize')      
			# close RDS connect
			session.close()      
		else:	
			s3 = boto3.resource('s3', aws_access_key_id=os.getenv('AWS_S3_ACCESS_KEY_ID', accesskey),	# S3 login setting 
    						aws_secret_access_key=os.getenv('AWS_S3_SECRET_ACCESS_KEY', secretkey), 						endpoint_url='https://lab321-carview.s3-accelerate.amazonaws.com')
			# close RDS connect
			session.close()

			for file in self.allFileLise:
				list1 = file.split('_')				# filename split
				list2 = file.split('.')				# main filename split
				file_path = self.files + file			# data path include filename
				key = file					# aws target path
				bucket_name = self.upload.split('/')[0] 
				eventtime = list1[2][0:4] + '-' + list1[2][4:6] + '-' + list1[2][6:8] + ' ' + list1[2][8:10] + ':' + list1[2][10:12] + ':' + list1[2][12:14]						# file event time
				
				if list1[0] == boardid:
					# ORM connect 
					session = sqlalchemy.orm.Session(engine)
					# get Event list
					sqlalchemy.Table('Event', metadata, autoload=True)
					Event1 = automap.classes['Event']				# RDS Event table
					res2 = []
					res2 = session.query(Event1).filter(Event1.eventTime == eventtime, Event1.carNumberId == resn1).all()
					# get EventId
					resn2 = []
					for Event1 in res2:
						resn2 = Event1.id 
					if resn2 == lst:
						try:
							# add first Event
							Event2 = Event1()
							Event2.eventTime = eventtime
							Event2.carNumberId = resn1
							session.add(Event2)

							# write on RDS
							session.commit()
							res2 = session.query(Event1).filter(Event1.eventTime == eventtime, Event1.carNumberId == resn1).all()
							# get EventId again
							resn2 = []
							for Event1 in res2:
								resn2 = Event1.id
						except Exception as e:
        						# error
							session.rollback()
							loguru.logger.error('Event create fail')
							loguru.logger.error(e)
				
					Details = automap.classes['Details']				# RDS Detail table
					res3 = []
					res3 = session.query(Details).filter(Details.details == list2[0], Details.eventId == resn2).all()
					# get DetailsId
					resn3 = []
					for Details in res3:
						resn3 = Details.id 
					if resn3 == lst:	
						try:
							# add first Details
							Details = Details()
							Details.details = list2[0]			# filename
							Details.eventId = resn2
							# update according to file extension
							if list2[1] == 'jpg':
								Details.image = 1
							elif list2[1] == 'mp4':
								Details.video = 1
							session.add(Details)
							
							# write on RDS
							session.commit()
	
							# close RDS connect
							session.close()

							# upload data
							s3.Object(bucket_name, key).upload_file(file_path, ExtraArgs = {'ContentType':'*/*'},
										Config = config, Callback = ProgressPercentage(file_path))

							# move to finish upload folder
							#os.replace(file_path, self.UploadSuccess + file)
						except Exception as e:
							# error
							session.rollback()
							loguru.logger.error('Data create fail')
							loguru.logger.error(e)
							# close RDS connect
							session.close()
	
					else:
						try:
							# update according to file extension
							if list2[1] == 'jpg':
								Details.image = 1
							elif list2[1] == 'mp4':
								Details.video = 1
							session.add(Details)

							# write on RDS
							session.commit()

							# close RDS connect
							session.close()

							# upload data
							s3.Object(bucket_name, key).upload_file(file_path, ExtraArgs = {'ContentType':'*/*'},
										Config = config, Callback = ProgressPercentage(file_path))

							# move to finish upload folder
							#os.replace(file_path, self.UploadSuccess + file)
						except Exception as e:
							# error
							session.rollback()
							loguru.logger.error('File extension create fail')
							loguru.logger.error(e)

							# close RDS connect
							session.close()
				# close RDS connect
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
	# Picture upload
	send = SendFile(s, '/home/lab321/桌面/data/', 'image/', 'im_success/')		# Data path；Picture folder name；Finish data folder name
	send.multipart_upload_boto3()
	# Video upload
	send = SendFile(s, '/home/lab321/桌面/data/', 'video/', 'vi_success/')		# Data path；video folder name；Finish data folder name
	send.multipart_upload_boto3()
	
	print ('upload finish')

	loguru.logger.add(
		f'{datetime.date.today():%Y%m%d}.log',
		rotation='1 day',
		retention='7 days',
		level='DEBUG'
	)
