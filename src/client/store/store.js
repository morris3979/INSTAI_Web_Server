import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const persistor = persistStore(store)
export const store = createStore(persistedReducer, applyMiddleware(thunk))