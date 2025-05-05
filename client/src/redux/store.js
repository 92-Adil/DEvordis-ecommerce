import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'cart', 'wishlist'],
}

import cartReducer from "./cartSlice.js"
import wishlistReducer from "./wishlist.js"
import authReducer from "./authSlice.js"
import productReducer from "./productSlice.js"
import orderReducer from "./orderSlice.js"
import searchReducer from "./searchSlice.js"

const rootReducer=combineReducers({
    cart:cartReducer,
    wishlist:wishlistReducer,
    auth:authReducer,
    product:productReducer,
    order:orderReducer,
    search:searchReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});



// const store= configureStore({
//     reducer:{
//         cart:cartReducer,

//     }
// })

export default store