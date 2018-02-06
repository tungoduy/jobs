import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['likedJobs'] // only likedJobs will be persisted
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
let persistor = persistStore(store);

export default { store, persistor };

// => {
//     let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
//     let persistor = persistStore(store);
//     return { store, persistor };
// }


// const store = createStore(
//     rootReducer,
//     {},
//     compose(
//         applyMiddleware(thunk),
//     )
// );

// persistStore(store, persistConfig);

// export default store;
