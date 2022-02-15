import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import store from './store/store'
import 'antd/dist/antd.css'

const App = lazy(() => import('./App'))

const app = (
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<Spin size='large' />}>
        <App />
      </Suspense>
    </HashRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))