import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Spin } from 'antd'
import store from './store/store'

const App = lazy(() => import('./App'))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Spin size='large' />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))