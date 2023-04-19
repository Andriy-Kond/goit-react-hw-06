import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

// Для підключення Redux треба огорнути застосунок у Provider:
import { Provider } from 'react-redux';
// Provider приймайє store, тому маємо його теж імпортувати:
import storeRedux, { persister } from './store/indexStore';
import { PreLoader } from 'components/PreLoader';

// Для використання localStorage:
import { PersistGate } from 'redux-persist/integration/react';

// Дістати зі стору будь-яке значення - хук useSelector
// Для виконання якоїсь дії стору - хук useDispatch

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Огортаємо App в Provider, щоби у App був доступ до store */}
    <Provider store={storeRedux}>
      {/* Огортаємо App в PersistGate для роботи з localStorage */}
      <PersistGate loading={<PreLoader />} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
