/*
Setting up redux - npm i @reduxjs/toolkit react-redux

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configureStore({
    reducer: { user: userReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //Prevents errors when using reducers
        serializableCheck: false
    }),
})
*/

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


//combineReducers to combine all our reducers 
const rootReducer = combineReducers({ user: userReducer })
const persistConfig = {
    //Can be seen in testing
    //name of data to be shared in local storage
    key: 'root',
    version: 1,
    //imported from redux-persist/lib/storage' to save data locally
    storage,
}

//persistReducer() is from redux-persist'
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false,
    }),
})

//persistStore(store) is going to save data locally this is imported from 'redux-persist'
export const persistor = persistStore(store)