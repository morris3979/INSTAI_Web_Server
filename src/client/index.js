import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'

const App = lazy(() => import('./App'))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={
        <div
          style={{ textAlign: 'center', fontSize: 100 }}
        >
          載入中...
        </div>
      }>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))