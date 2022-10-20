import React, { useState, useEffect, useRef, Fragment } from "react";
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";
import {
  Button
} from 'antd'
import {
  BugOutlined
} from '@ant-design/icons'

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef();
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef();

  // const [label, setLabel] = useState();
  const [path, setPath] = useState();
  const annotationArr = [];
  const [json4Training, setJson4Training] = useState();
  const [openImg, setOpenImg] = useState('https://i.pinimg.com/originals/1e/06/e1/1e06e107f0ca520aed316957b685ef5c.jpg');

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    if (rootRef.current) {
      lsfRef.current = new LabelStudio(rootRef.current, {
        /* all the options according to the docs */
        config:
          `
            <View>
              <Image name="img" value="$image"></Image>
              <RectangleLabels name="tag" toName="img">
                <Label value="Label1"></Label>
                <Label value="Label2"></Label>
                <Label value="Label3"></Label>
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
          setPath(openImg);
        },
        onSubmitAnnotation: (ls, annotation) => {
          // if (props.fileList.length > 0) {
          //   setOpenImg(props.fileList[0].originFileObj)
          // }
          // console.log('ls info: ', ls);
          console.log('annotation info: ', annotation.serializeAnnotation());
          // console.log(label);
          const originalWidth = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_width: null;
          const originalHeight = annotation.serializeAnnotation().length > 0? annotation.serializeAnnotation()[0].original_height: null;
          for (let index = 0; index < annotation.serializeAnnotation().length; index++) {
            // console.log('index: ', index);
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
                "file_name": "${openImg}",
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
                "file_name": "${openImg}",
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
  }, [ path, openImg ]);

  // just a wrapper node to place LSF into
  const onClick = () => {
    console.log('test: ', json4Training)
  }

  return (
    <Fragment>
      <div ref={rootRef}></div>
      <div>
        <Button onClick={onClick} icon={<BugOutlined />} />
      </div>
    </Fragment>
  );
};

export default (LabelStudioWrapper)