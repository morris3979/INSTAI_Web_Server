import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const CreateOrganization = lazy(() => import('../component/RegisterPage/CreateOrganization'))

const CreateOrganizationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1c2127',
        }}
      >
        <CreateOrganization />
      </div>
    </Suspense>
  )
}

export default CreateOrganizationPage