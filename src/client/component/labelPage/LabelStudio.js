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

  const image1 = 'projectA_1000000057db1e5f_0x7680_20221013163446_049'
  const image2 = 'projectA_1000000057db1e5f_0x7680_20221013163446_049'

  // we're running an effect on component mount and rendering LSF inside rootRef node
  useEffect(() => {
    if (typeof label === "undefined") {
      setLabel("Label1");
    }
    if (typeof path === "undefined") {
      setPath(
        `https://d20cmf4o2f77jz.cloudfront.net/image/${image1}.jpg`
      );
    }
    if (rootRef.current) {
      lsfRef.current = new LabelStudio(rootRef.current, {
        /* all the options according to the docs */
        config:
          `
            <View>
              <Image name="img" value="$image"></Image>
              <RectangleLabels name="tag" toName="img">
                <Label value="` +
                label +
                `"></Label>
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
        },
        onSubmitAnnotation: function (ls, annotation) {
          console.log(annotation.serializeAnnotation());
          setLabel("Label");
          setPath(
            `https://d20cmf4o2f77jz.cloudfront.net/image/${image2}.jpg`
          );
          console.log(label);
        }
      });
    }
  }, [label, path]);
  // just a wrapper node to place LSF into
  return <div ref={rootRef}></div>;
};

export default (LabelStudioWrapper)