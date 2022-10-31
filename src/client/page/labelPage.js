import React, { Fragment, Suspense, useState } from "react";
import Loading from '../loading'
import LabelStudioWrapper from '../component/labelPage/LabelStudio'

export default function LabelPage() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <LabelStudioWrapper/>
      </Suspense>
    </Fragment>
  );
}