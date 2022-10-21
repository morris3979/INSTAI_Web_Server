import React, { useState, useEffect, useRef, Fragment } from "react";
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import {
  Button,
  Upload,
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
  // const labelRef = useRef();

  const [labelConfig, setLabelConfig] = useState(defaultConfig);
  // const [additionalLabels, setAdditionalLabels] = useState([]);

  const [path, setPath] = useState();
  const annotationArr = [];
  const [json4Training, setJson4Training] = useState();

  const [previewImage, setPreviewImage] = useState('http://www.ezcopy.net/wp-content/uploads/2018/02/upload-1.png');
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
          setPath(previewImage);
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
  }, [ path, previewImage, previewTitle ]);

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
      fileName: 'test.json',
      fileType: 'text/json',
    })
  }

  const crawler_onClick = () => {
    console.log('test: ', json4Training)
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
        multiple
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleUpload}
        customRequest={dummyRequest}
      >
        {fileList.length < 6 ? uploadButton : null}
      </Upload>
      {/* <Button onClick={handleSubmit}>Submit</Button> */}
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
    </Fragment>
  );
};

export default (LabelStudioWrapper)