import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import Reducer from './reducer'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, Reducer)
const store = configureStore({ reducer: persistedReducer })

export const persistor = persistStore(store)
export default store