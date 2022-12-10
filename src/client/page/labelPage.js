import React, { Fragment, Suspense } from "react";
import Loading from '../loading'
import LabelStudioWrapper from '../component/labelPage/LabelStudio'

export default function LabelPage() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#1c2127',
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
            color: '#fff'
          }}
        >
          <LabelStudioWrapper/>
        </div>
      </Suspense>
    </Fragment>
  );
}