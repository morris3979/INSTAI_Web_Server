import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from 'react-redux'
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import Box from '@mui/material/Box';
import {
} from '../../store/actionCreater'

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef()
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef()
  const labelRef = useRef(true)

  const annotationArr = []
  const [path, setPath] = useState()
  const [json4Training, setJson4Training] = useState()
  const [additionalLabels, setAdditionalLabels] = useState([])
  const [fileList, setFileList] = useState([])
  const [checkValue, setCheckValue] = useState([])

  const [previewImage, setPreviewImage] = useState('https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png')
  const [previewTitle, setPreviewTitle] = useState('')
  const [urlImage, setUrlImage] = useState()
  const [selectDataId, setSelectDataId] = useState()
  const [labeledDataId, setLabeledDataId] = useState()
  const {
  } = props

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    // getAccountTableData()
    // getDetailsData()
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
  }, [ path, previewImage, previewTitle, additionalLabels ])


  // just a wrapper node to place LSF into
  return (
    <div>
        <Box style={{ width: '85vw' }}>
            <div style={{ margin: 5 }} ref={rootRef} />
        </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  //state指的是store裡的數據
  return {}
}

const mapDispatchToProps = (dispatch) => {
  //dispatch指store.dispatch這個方法
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelStudioWrapper)