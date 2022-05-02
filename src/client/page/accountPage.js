import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const AccountManageTable = lazy(() => import('../component/accountManagePage/accountManageTable'))

const AccountPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AccountManageTable />
    </Suspense>
  )
}

export default AccountPage