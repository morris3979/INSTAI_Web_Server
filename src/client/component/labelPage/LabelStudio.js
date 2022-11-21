import React, { useState, useEffect, useRef, Fragment } from "react";
import LabelStudio from "label-studio";
import { connect } from 'react-redux'
import "label-studio/build/static/css/main.css";
import {
  Button,
  Upload,
  Input,
  Modal,
  Popconfirm,
  Typography,
  Collapse,
  Table,
  Image,
  message,
  Switch,
  Col
} from 'antd'
import {
  BugOutlined,
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  RocketOutlined,
  UploadOutlined,
  CheckOutlined,
  CloseOutlined,
  SaveOutlined
} from '@ant-design/icons'
import {
  GetProjectTableData,
  GetEventList,
  UploadJsonFile
} from '../../store/actionCreater'

const { Title } = Typography;
const { Panel } = Collapse;
const { Column } = Table;

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef();
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef();
  const labelRef = useRef(true);

  const annotationArr = [];
  const [path, setPath] = useState();
  const [json4Training, setJson4Training] = useState();
  const [additionalLabels, setAdditionalLabels] = useState([]);

  const [previewImage, setPreviewImage] = useState('https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png');
  const [previewTitle, setPreviewTitle] = useState('');
  const [urlImage, setUrlImage] = useState();

  const {
    loginInformation,
    eventList,
    getEventList,
    uploadJsonFile
  } = props

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    getEventList()
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
                  "category_id": ${categoryId+1},
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
                  "category_id": ${categoryId+1},
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

  const handleInput = (e) => {
    setUrlImage(e.target.value);
  }

  const onAddImgUrl = () => {
    setPreviewImage(`https://d20cmf4o2f77jz.cloudfront.net/image/${urlImage}.jpg`);
    setPreviewTitle(urlImage+'.jpg');
  }

  const sendImageUrlButton = (
    !urlImage?
    <Button icon={<EyeInvisibleOutlined />} disabled />:
    <Button onClick={onAddImgUrl} icon={<EyeOutlined />} />
  )

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
    const fileName = previewTitle;
    const extIndex = fileName.lastIndexOf('.');
    const newFileName = extIndex != -1? fileName.substring(0, extIndex): fileName;
    downloadFile({
      data: JSON.stringify(jsonData),
      fileName: newFileName+'.json',
      fileType: 'text/json',
    })
  }

  const crawler_onClick = () => {
    // const jsonData = JSON.parse(json4Training)
    // console.log('web crawler: ', jsonData)
    const fileName = previewTitle;
    const extIndex = fileName.lastIndexOf('.');
    const newFileName = extIndex != -1? fileName.substring(0, extIndex): fileName;
    Modal.info({
      title: newFileName+'.json',
      content:(
        <div>
          <p>{!json4Training? 'No Data': json4Training}</p>
        </div>
      )
    });
  }

  const onAddLabel = () => {
    if (labelRef.current.input.value != '') {
      const label = `<Label value="${labelRef.current.input.value}"/>`
      setAdditionalLabels((value) => [ ...value, label ]);
    } else {
      message.warning('Input Label Name cannot be empty !')
    }
  }

  const onReset = () => {
    setAdditionalLabels([]);
  }

  const FilterData = (value) => {
    const response = eventList.filter((c) => {
      return c.Details
    })
    const FilterDetails = response.map((d) => {
      return d.Details
    })
    const DataArray = [].concat(...FilterDetails);
    const EachDetailData = DataArray.filter((e) => {
      return (
        loginInformation.user == true?
        e.details.slice(0,8) == value:
        e.details.slice(0,8)
      )
    })
    const CleanedData = EachDetailData.filter((data) => {
      return data.cleaned == '1'
    })
    return CleanedData
  }

  const handleUploadJson = async (file) => {
    console.log('file: ', file)
    // uploadJsonFile(file)
  }

  const checkCleaned = (text) => {
    if (text.cleaned == true) {
        return (
          <CheckOutlined />
        )
    } else {
        return (
          <CloseOutlined />
        )
    }
  }

  const checkLabeled = (text) => {
    if (text.labeled == true) {
        return (
          <Fragment>
            {/* <Col><CheckOutlined /></Col> */}
            <Col>
              <Switch
                style={{ margin: 3 }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(click) => {console.log('click T', click)}}
              />
            </Col>
          </Fragment>
        )
    } else {
        return (
          <Fragment>
            {/* <Col><CloseOutlined /></Col> */}
            <Col>
              <Switch
                style={{ margin: 3 }}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(click) => {console.log('click F', click)}}
              />
            </Col>
          </Fragment>
        )
    }
  }

  const checkJson = (text) => {
    if (text.json == true) {
      return (
        <Fragment>
          {/* <Col><CheckOutlined /></Col> */}
          <Col>
            <Switch
              style={{ margin: 3 }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Col>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          {/* <Col><CloseOutlined /></Col> */}
          <Col>
            <Switch
              style={{ margin: 3 }}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Col>
        </Fragment>
      )
    }
  }

  const actionBtn = (data) => {
    return(
      <Fragment>
        <div style={{ margin: 18 }}>
          <Button
            style={{ margin: 2 }}
            icon={<RocketOutlined />}
            onClick={() => {
              setUrlImage(data.details)
            }}
          >
            Send to Input
          </Button>
        </div>
        <div style={{ margin: 18 }}>
          {
            data.json == true?
            <Upload onChange={handleUploadJson}>
              <Button
                style={{ margin: 2 }}
                type="primary"
                icon={<UploadOutlined />}
                disabled
              >
                Upload JSON
              </Button>
            </Upload>:
            <Upload onChange={handleUploadJson}>
              <Button
                style={{ margin: 2 }}
                type="primary"
                icon={<UploadOutlined />}
              >
                Upload JSON
              </Button>
            </Upload>
          }
          <Button
            type="primary"
            style={{ margin: 2 }}
            icon={<SaveOutlined />}
          >
            Save Labeled
          </Button>
        </div>
      </Fragment>
    )
  }

  const findImageByDetail = (text) => {
    return (
      <Fragment align='center'>
        <Image
          src={`https://d20cmf4o2f77jz.cloudfront.net/image/${text.details}.jpg`}
          width='100%'
          height='100%'
        />
      </Fragment>
    )
  }

  // just a wrapper node to place LSF into
  return (
    <Fragment>
      <Collapse accordion style={{ margin: 5 }}>
        <Panel header='Data Store'>
          <span style={{ margin: 5 }}>
            <Input
              allowClear
              type="text"
              addonBefore="../S3/Image/"
              placeholder="Input Image Name ..."
              addonAfter=".jpg"
              style={{ height: 30, width: '60%'}}
              onChange={handleInput}
              value={ urlImage? urlImage: ''}
            />
            {sendImageUrlButton}
          </span>
          <Table
            style={{ margin: 5 }}
            dataSource={FilterData(loginInformation.project)}
            pagination={{ position: ['bottomCenter'], pageSize: 1 }}>
            <Column
              title='Data'
              align="center"
              render={findImageByDetail}
              width='20%'
            />
            <Column
              title='filename'
              align="center"
              dataIndex='details'
              width='35%'
            />
            <Column
                title='cleaned'
                render={checkCleaned}
                align='center'
                width='10%'
            />
            <Column
                title='labeled'
                render={checkLabeled}
                align='center'
                width='10%'
            />
            <Column
              title='json'
              render={checkJson}
              align='center'
              width='10%'
            />
            <Column
              title='操作'
              align="center"
              render={actionBtn}
              width='15%'
            />
          </Table>
        </Panel>
      </Collapse>
      <div style={{ margin: 5 }}>
        <Title level={3}>Label Workspace</Title>
        <Input
          allowClear
          type="text"
          placeholder="Input Label Name ..."
          style={{ height: 30, width: 220 }}
          ref={labelRef}
        />
        <Button
          onClick={onAddLabel}
          style={{ margin: 2 }}
          icon={<PlusOutlined />}
        >
          Add Label
        </Button>
        <Popconfirm
          title='Clear all Labels?'
          onConfirm={onReset}
        >
          <Button
            style={{ margin: 2 }}
            icon={<DeleteOutlined />}
          >
            Delete Labels
          </Button>
        </Popconfirm>
        <Button
          onClick={crawler_onClick}
          style={{ margin: 2 }}
          icon={<BugOutlined />}
        >
          View JSON
        </Button>
        {
          json4Training?
          <Button
            type="primary"
            onClick={exportToJson}
            style={{ margin: 2 }}
            icon={<DownloadOutlined />}
          >
            Download JSON
          </Button>:
          <Button
            style={{ margin: 2 }}
            icon={<DownloadOutlined />}
            disabled
          >
            Download JSON
          </Button>
        }
      </div>
      <div style={{ margin: 5 }} ref={rootRef} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    loginInformation: state.loginInformation,
    projectTableData: state.projectTableData,
    eventList: state.eventList
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getProjectTableData() {
      const action = GetProjectTableData()
      dispatch(action)
    },
    getEventList() {
      const action = GetEventList()
      dispatch(action)
    },
    uploadJsonFile(file) {
      const action = UploadJsonFile(file)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelStudioWrapper)