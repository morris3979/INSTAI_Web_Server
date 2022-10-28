import React, { Fragment, Suspense, useState } from "react";
import Loading from '../loading'
import LabelStudioWrapper from '../component/labelPage/LabelStudio'
import {
  Typography
} from 'antd'

const { Title } = Typography;

export default function LabelPage() {
  return (
    <Fragment>
      <Title style={{ margin: 5 }}>{'<INSTAI INC.>'}</Title>
      <Suspense fallback={<Loading />}>
        <LabelStudioWrapper/>
      </Suspense>
    </Fragment>
  );
}