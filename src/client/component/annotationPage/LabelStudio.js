import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from 'react-redux'
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  GetLabelList,
  UploadJsonFile,
  GetDataItem,
  PatchDataItem
} from '../../store/actionCreater'

const LabelStudioWrapper = (props) => {
  const {
    dataItem,
    getLabelList,
    labelList,
    uploadJsonFile,
    downloadImage,
    getDataItem,
    projectImport,
    dataImport,
    patchDataItem,
    userImport
  } = props

  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef()
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef()

  const annotationArr = []
  const [ path, setPath ] = useState()
  const [ json4Training, setJson4Training ] = useState()
  const [ additionalLabels, setAdditionalLabels ] = useState([])
  const [ fileList, setFileList ] = useState([])

  const [ open, setOpen ] = useState(false)

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    dataItem
    getDataItem(dataImport)
    getLabelList(projectImport)
    labelList.Labels?.map((value) => {
      setAdditionalLabels((newClass) => [...newClass, `<Label value="${value.labelClass}"/>`])
    })
    // console.log('ProjectId', dataItem.ProjectId)
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
          // "skip",
          "controls",
          "infobar",
          "topbar",
          "instruction",
          "side-column",
          // "annotations:history",
          // "annotations:tabs",
          // "annotations:menu",
          // "annotations:current",
          // "annotations:add-new",
          // "annotations:delete",
          // "annotations:view-all",
          // "predictions:tabs",
          // "predictions:menu",
          // "auto-annotation",
          // "edit-history"
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
          setPath(`https://d20cmf4o2f77jz.cloudfront.net/image/${dataItem.data}.jpg`);
        },

        onSubmitAnnotation: (ls, annotation) => {
          // console.log('ls info: ', ls);
          // console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100))
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100))
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100))
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100))
            const categoryId = additionalLabels.indexOf(
              `<Label value="${annotation.serializeAnnotation()[index].value.rectanglelabels[0]}"/>`
              )
            annotationArr.push(
              `{
                  "category_id": ${categoryId+1},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            )
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${dataItem.data}",
                "width": ${originalWidth},
                "height": ${originalHeight}
              },
              "annotation":
              [
                ${annotationArr.length > 0? annotationArr: null}
              ]
            }
          `)
          setOpen(true)
        },

        onUpdateAnnotation: (ls, annotation) => {
          // console.log('annotation info: ', annotation.serializeAnnotation());
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null
          annotationArr.length = 0
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            const x_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.x / 100))
            const y_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[index].value.y / 100))
            const x_max_min = Math.round(annotation.serializeAnnotation()[index].original_width * (annotation.serializeAnnotation()[index].value.width / 100))
            const y_max_min = Math.round(annotation.serializeAnnotation()[index].original_height * (annotation.serializeAnnotation()[0].value.height / 100))
            const categoryId = additionalLabels.indexOf(
              `<Label value="${annotation.serializeAnnotation()[index].value.rectanglelabels[0]}"/>`
              )
            annotationArr.push(
              `{
                  "category_id": ${categoryId+1},
                  "bbox": [${x_min}.0, ${y_min}.0, ${x_max_min}.0, ${y_max_min}.0]
                }`
            )
          }
          setJson4Training(`
            {
              "image":
              {
                "file_name": "${dataItem.data}",
                "width": ${originalWidth},
                "height": ${originalHeight}
              },
              "annotation":
              [
                ${annotationArr.length > 0? annotationArr: null}
              ]
            }
          `)
          setOpen(true)
        }
      })
    }
  }, [ path, setAdditionalLabels ])

  const onSave = () => {
    // uploadJsonFile(fileList[0])
    patchDataItem(dataImport, { annotation: json4Training, UserId: userImport })
    getDataItem(dataImport)
    setOpen(false)
    setTimeout(() => {
      location.reload()
    }, 300)
  }

  const onCancel = () => {
    setOpen(false)
  }

  // just a wrapper node to place LSF into
  return (
    <div>
      <Box style={{ width: '85vw' }}>
        <div style={{ margin: 5 }} ref={rootRef} />
      </Box>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ backgroundColor: '#444950', width: '50vh' }}>
          <DialogContentText id="alert-dialog-description" style={{ color: 'lightgrey' }}>
            {dataItem.data}
          </DialogContentText>
        </DialogContent>
        <DialogTitle
          id="alert-dialog-title"
          textAlign={'center'}
          style={{ backgroundColor: '#444950', color: 'white', width: '50vh' }}>
          <div>
            <p>{json4Training}</p>
          </div>
        </DialogTitle>
        <DialogActions style={{ backgroundColor: '#444950', color: 'lightblue' }}>
          <Button
            size='small'
            variant="contained"
            onClick={onCancel}
            sx={{ margin: 1 }}
          >
            CANCEL
          </Button>
          <Button
            size='small'
            variant="contained"
            onClick={onSave}
            sx={{ margin: 1 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {
    dataItem: state.dataItem,
    labelList: state.labelList,
    projectImport: state.projectImport,
    dataImport: state.dataImport,
    userImport: state.userImport,
  }
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {
    getLabelList(id) {
      const action = GetLabelList(id)
      dispatch(action)
    },
    uploadJsonFile(file) {
      const action = UploadJsonFile(file)
      dispatch(action)
    },
    getDataItem(id) {
      const action = GetDataItem(id)
      dispatch(action)
    },
    patchDataItem(id ,data) {
      const action = PatchDataItem(id, data)
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelStudioWrapper)