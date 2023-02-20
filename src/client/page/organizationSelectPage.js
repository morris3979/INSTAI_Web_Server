import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const SelectOrganization = lazy(() => import('../component/loginPage/SelectOrganization'))

const OrganizationSelectPage = () => {
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
        <SelectOrganization />
      </div>
    </Suspense>
  )
}

export default OrganizationSelectPage