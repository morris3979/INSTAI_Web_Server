import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const ProjectTable = lazy(() => import('../component/projectPage/projectTable'))

const ProjectPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectTable />
    </Suspense>
  )
}

export default ProjectPage