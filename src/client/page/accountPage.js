import React, { lazy, Suspense } from 'react'
import Loading from '../loading'

const AccountManageTable = lazy(() => import('../component/accountPage/accountTable'))

const AccountPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AccountManageTable />
    </Suspense>
  )
}

export default AccountPage