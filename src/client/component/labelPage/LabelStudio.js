import React, { useState, useEffect, useRef } from "react";
import LabelStudio from "label-studio";
import "label-studio/build/static/css/main.css";

const LabelStudioWrapper = (props) => {
  // we need a reference to a DOM node here so LSF knows where to render
  const rootRef = useRef();
  // this reference will be populated when LSF initialized and can be used somewhere else
  const lsfRef = useRef();

  const [label, setLabel] = useState();
  const [path, setPath] = useState();

  const image = 'https://i.pinimg.com/originals/1e/06/e1/1e06e107f0ca520aed316957b685ef5c.jpg'

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
                <Label value="${label}"></Label>
                <Label value="Label2"></Label>
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
          setLabel("Label1");
          setPath(image);
        },
        onSubmitAnnotation: function (ls, annotation) {
          console.log(annotation.serializeAnnotation());
          console.log(label);
        }
      });
    }
  }, [label, path]);
  // just a wrapper node to place LSF into
  return <div ref={rootRef}></div>;
};

export default (LabelStudioWrapper)