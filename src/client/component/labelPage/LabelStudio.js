import React, { useState, useEffect, useRef, Fragment } from "react";
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import {
  Button,
  Upload,
  Input,
  Popconfirm,
  Typography
} from 'antd'
import {
  BugOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'

const { Title } = Typography;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef();
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef();
  const labelRef = useRef(true);

  const [additionalLabels, setAdditionalLabels] = useState([]);

  const annotationArr = [];
  const [path, setPath] = useState();
  const [json4Training, setJson4Training] = useState();

  const [previewImage, setPreviewImage] = useState('https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [urlImage, setUrlImage] = useState();

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    if (rootRef.current) {
      lsfRef.current = new LabelStudio(rootRef.current, {
        /* all the options according to the docs */
        config: `
          <View>
            <Image name="img" value="$image"></Image>
            <RectangleLabels name="tag" toName="img">
              ${additionalLabels}
            </RectangleLabels>
          </View>
        `,

        interfaces: [
          "panel",
          "update",
          "submit",
          "skip",
          "controls",
          "infobar",
          "topbar",
          "instruction",
          "side-column",
          "annotations:history",
          "annotations:tabs",
          "annotations:menu",
          "annotations:current",
          "annotations:add-new",
          "annotations:delete",
          "annotations:view-all",
          "predictions:tabs",
          "predictions:menu",
          "auto-annotation",
          "edit-history"
        ],

        user: {
          pk: 1,
          firstName: "Morris",
          lastName: "Chang"
        },

        task: {
          annotations: [],
          predictions: [],
          id: 1,
          data: {
            image: path
          }
        },

        onLabelStudioLoad: function (ls) {
          var c = ls.annotationStore.addAnnotation({
            userGenerate: true
          });
          ls.annotationStore.selectAnnotation(c.id);
          setPath(previewImage);
        },

        onSubmitAnnotation: (ls, annotation) => {
          // console.log('ls info: ', ls);
          // console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null;
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null;
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100));
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100));
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100));
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100));
            const categoryId = additionalLabels.indexOf(
              `<Label value="${annotation.serializeAnnotation()[index].value.rectanglelabels[0]}"/>`
              );
            annotationArr.push(
              `{
                  "category_id": ${categoryId},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            );
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${previewTitle}",
                "width": ${originalWidth},
                "height": ${originalHeight}
              },
              "annotation":
              [
                ${annotationArr.length > 0? annotationArr: null}
              ]
            }
          `)
        },

        onUpdateAnnotation: (ls, annotation) => {
          // console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null;
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null;
          annotationArr.length = 0;
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100));
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100));
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100));
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100));
            const categoryId = additionalLabels.indexOf(
              `<Label value="${annotation.serializeAnnotation()[index].value.rectanglelabels[0]}"/>`
              );
            annotationArr.push(
              `{
                  "category_id": ${categoryId},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            );
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${previewTitle}",
                "width": ${originalWidth},
                "height": ${originalHeight}
              },
              "annotation":
              [
                ${annotationArr.length > 0? annotationArr: null}
              ]
            }
          `)
        }
      }
      );
    }
  }, [ path, previewImage, previewTitle, additionalLabels ]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleUpload = ({ fileList: newFileList }) => setFileList(newFileList);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleInput = (e) => {
    setUrlImage(e.target.value);
  }

  const onAddImgUrl = () => {
    setPreviewImage(urlImage);
    setPreviewTitle(urlImage);
  }

  const sendImageUrlButton = (
    !urlImage?
    <Button style={{ margin: 5 }} icon={<EyeInvisibleOutlined />} disabled />:
    <Button onClick={onAddImgUrl} style={{ margin: 5 }} icon={<EyeOutlined />} />
  );

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = () => {
    const jsonData = JSON.parse(json4Training)
    downloadFile({
      data: JSON.stringify(jsonData),
      fileName: 'test.json',
      fileType: 'text/json',
    })
  }

  const crawler_onClick = () => {
    const jsonData = JSON.parse(json4Training)
    console.log('web crawler: ', jsonData)
  }

  const onAddLabel = () => {
    const label = `<Label value="${labelRef.current.input.value}"/>`
    setAdditionalLabels((value) => [ ...value, label ]);
  }

  const onReset = () => {
    setAdditionalLabels([]);
  };

  // just a wrapper node to place LSF into
  return (
    <Fragment>
      <Title level={4} style={{ margin: 5 }}>Upload Image</Title>
      <div style={{ margin: 5 }}>
        <Input
          allowClear
          type="text"
          placeholder="Input Image URL..."
          style={{ height: 30, width: 700 }}
          onChange={handleInput}
        />
        {sendImageUrlButton}
        <Upload
          maxCount={10}
          multiple
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleUpload}
          customRequest={dummyRequest}
        >
          {fileList.length < 10 ? uploadButton : null}
        </Upload>
      </div>
      <div style={{ margin: 5 }}>
        <Title level={4}>Label Image</Title>
        <Input
          allowClear
          type="text"
          placeholder="Input Label Name"
          style={{ height: 30, width: 160 }}
          ref={labelRef}
        />
        <Button onClick={onAddLabel} style={{ margin: 2 }} icon={<PlusOutlined />} />
        <Popconfirm
          title='Clear all Labels?'
          onConfirm={onReset}
        >
          <Button style={{ margin: 2 }} icon={<DeleteOutlined />} />
        </Popconfirm>
        <Button onClick={exportToJson} style={{ margin: 2 }} icon={<DownloadOutlined />} />
        <Button onClick={crawler_onClick} style={{ margin: 2 }} icon={<BugOutlined />} />
      </div>
      <div style={{ margin: 5 }} ref={rootRef} />
    </Fragment>
  );
};

export default (LabelStudioWrapper)