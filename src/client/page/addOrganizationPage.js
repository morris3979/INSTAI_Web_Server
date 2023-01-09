import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const OrganizationForm = lazy(() => import('../component/registerPage/OrganizationForm'))

const AddOrganizationPage = () => {
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
        <OrganizationForm />
      </div>
    </Suspense>
  )
}

export default AddOrganizationPage