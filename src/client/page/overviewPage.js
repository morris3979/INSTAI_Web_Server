import React, { Fragment, Suspense } from "react";
import Loading from '../loading'
import OverviewCard from '../component/overviewPage/overviewCard'

export default function OverviewPage() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <OverviewCard/>
      </Suspense>
    </Fragment>
  );
}