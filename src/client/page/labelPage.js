import React, { Fragment, Suspense, useState } from "react";
import Loading from '../loading'
import LabelStudioWrapper from '../component/labelPage/LabelStudio'
import {
  Upload,
  Typography
} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons'

const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function LabelPage({ onClick }) {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 6,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Fragment>
      <Title>{'<LabelStudio>'}</Title>
      <div style={{width: '800px'}}>
        <Upload.Dragger
          multiple
          maxCount={7}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length > 7 ? null : uploadButton}
        </Upload.Dragger>
      </div>
      <div  style={{height: '10px'}}></div>
      <Suspense fallback={<Loading />}>
        <LabelStudioWrapper fileList={fileList}/>
      </Suspense>
    </Fragment>
  );
}