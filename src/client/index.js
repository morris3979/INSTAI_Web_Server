import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'
import { Spin } from 'antd'
import 'antd/dist/antd.css'

const App = lazy(() => import('./App'))

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <Suspense fallback={<Spin size='large' />}>
          <App />
        </Suspense>
      </HashRouter>
    </PersistGate>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))