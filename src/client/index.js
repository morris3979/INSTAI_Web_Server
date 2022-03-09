import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import 'antd/dist/antd.css'

const { Provider } = lazy(() => import('react-redux'))
const { PersistGate } = lazy(() => import('redux-persist/integration/react'))
const { HashRouter } = lazy(() => import('react-router-dom'))
const { store, persistor } = lazy(() => import('./store/store'))
const App = lazy(() => import('./App'))

const app = (
  <Suspense fallback={<Spin size='large' />}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </Suspense>
)

ReactDOM.render(app, document.getElementById('root'))