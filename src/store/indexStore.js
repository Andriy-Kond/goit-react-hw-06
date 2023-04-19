// ^ З використанням localStorage:
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// імпорт при default-експорті дозволяє називати змінну як завгодно:
import phoneSliceReducer from './phoneBookSlice';
import filterSliceReducer from './filterSlice';

import {
  persistStore,
  persistReducer,
  // ~ Додаткові константи, щоби позбутись помилки у консолі - необхідні для роботи Redux-Persist
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// Додатковий імпорт згідно документації для роботи з localStorage:
import storage from 'redux-persist/lib/storage';

// Об'єднуємо кілька редюсерів в один, бо експортувати можемо лише один
const rootReducer = combineReducers({
  storeContacts: phoneSliceReducer,
  storeFilter: filterSliceReducer,
});

// Об'являємо спеціальне Redux-Persist сховище:
const persistConfig = {
  key: 'root', // ключ, необхідний для того, щоб можна було створювати декілька таких сховищ (вкладених?)
  storage, // storage: storage, - це storage import storage from 'redux-persist/lib/storage';
  blacklist: ['storeFilter'],
};

// "Персистуємо" наш загальний (об'єднаний) редюсер:
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Глобальний стор Redux виносимо у окрему змінну:
const storeRedux = configureStore({
  reducer: persistedReducer, // тепер сюди передаємо наш 'персистований' редюсер

  // ~ Додаткова якась хрінь (middleware), щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // якісь перевірки для серилізації:
      serializableCheck: {
        // якісь екшени, які будуть ігноруватись:
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Пов'язуємо створене Redux-Persist сховище з глобальним Redux стором:
export const persister = persistStore(storeRedux); // Маємо передати його до PersistGate у кореневому index.js

export default storeRedux;

// ^ Без використання localStorage:
// import { configureStore } from '@reduxjs/toolkit';
// // імпорт при експорті default дозволяє назвати цей редюсер як завгодно:
// import phoneSliceReducer from './phoneBookSlice';
// import filterSliceReducer from './filterSlice';

// export default configureStore({
//   reducer: {
//     // Задаємо будь-яке ім'я:
//     storeContacts: phoneSliceReducer,
//     storeFilter: filterSliceReducer,
//   },
// });
