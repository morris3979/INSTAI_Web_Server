import React, { useState, useEffect, useRef, Fragment } from "react";
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import {
  Button,
  Upload,
  Modal,
  Input
} from 'antd'
import {
  BugOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const defaultConfig = `
    <View>
      <Image name="img" value="$image"></Image>
      <RectangleLabels name="tag" toName="img">
        <Label value="Label1"/>
        <Label value="Label2"/>
        <Label value="Label3"/>
      </RectangleLabels>
    </View>
  `

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef();
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef();
  const labelRef = useRef();

  const [labelConfig, setLabelConfig] = useState(defaultConfig);
  // const [additionalLabels, setAdditionalLabels] = useState([]);

  const [path, setPath] = useState();
  const annotationArr = [];
  const [json4Training, setJson4Training] = useState();
  const [openImg, setOpenImg] = useState('https://i.pinimg.com/originals/1e/06/e1/1e06e107f0ca520aed316957b685ef5c');

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    if (rootRef.current) {
      lsfRef.current = new LabelStudio(rootRef.current, {
        /* all the options according to the docs */
        config: labelConfig,

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
          setPath(openImg+'.jpg');
        },
        onSubmitAnnotation: (ls, annotation) => {
          // console.log('ls info: ', ls);
          console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null;
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null;
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100));
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100));
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100));
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100));
            annotationArr.push(
              `{
                  "category_id": ${index},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            );
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${openImg+'.jpg'}",
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
          // console.log('ls info: ', ls);
          console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null;
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null;
          annotationArr.length = 0;
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100));
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100));
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100));
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100));
            annotationArr.push(
              `{
                  "category_id": ${index},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            );
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${openImg+'.jpg'}",
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
  }, [ path, openImg, previewImage, previewTitle ]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleCancel = () => setPreviewOpen(false);

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

  const crawler_onClick = () => {
    console.log('test: ', json4Training)
  }

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
    console.log('test: ', json4Training)
    downloadFile({
      data: JSON.parse(json4Training),
      fileName: openImg+'.json',
      fileType: 'text/json',
    })
  }

  // const onAddLabel = () => {
  //   let currentConfig = labelConfig;
  //   let currentValue = labelRef.current.input.value;
  //   console.log('currentValue: ', currentValue)
  //   let newConfig = currentConfig.split("</RectangleLabels>")[0]
  //     + `\n <Label value="${currentValue}"/>
  //         </RectangleLabels>
  //         <Image name="img" value="$image"/>
  //         </View>`;
  //   setAdditionalLabels((current) => {
  //     return [...current, currentValue];
  //   });
  //   setLabelConfig(newConfig);
  //   labelRef.current.input.value = "";
  // }

  // const onReset = () => {
  //   setAdditionalLabels([]);
  // };

  // just a wrapper node to place LSF into
  return (
    <Fragment>
      <Upload
        maxCount={6}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 6? null: uploadButton}
      </Upload>
      <div ref={rootRef}></div>
      <div>
        <Button onClick={exportToJson} icon={<DownloadOutlined />} />
        <Button onClick={crawler_onClick} icon={<BugOutlined />} />
      </div>
      {/* <div>
        <Input
          type="text"
          ref={labelRef}
          placeholder="Input a Label"
          style={{ width: 120 }}
        />
        <Button onClick={onAddLabel} icon={<PlusOutlined />} />
        <Button onClick={onReset} icon={<DeleteOutlined />} />
      </div> */}
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </Fragment>
  );
};

export default (LabelStudioWrapper)