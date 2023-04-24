import { createSlice } from '@reduxjs/toolkit';

// Слайс - об'являю його ім'я, початковий стан і редюсери, що будуть цей стано обробляти
const phoneSlice = createSlice({
  name: 'phoneBook',

  initialState: {
    stateContacts: [],
  },

  reducers: {
    // Додавання контакту:
    addInStateContact(state, action) {
      state.stateContacts.push(action.payload);
    },

    // Видалення контакту:
    deleteInStateContact(state, action) {
      state.stateContacts = state.stateContacts.filter(
        contact => contact.id !== action.payload.id
      );
    },
  },
});

// Щоб відпрацьовував потрібний редюсер треба викликати відповідний екшен у компоненті при настанні якоїсь події.
// Екшени створюються автоматично у Redux-ToolKit і в цьому випадку знаходяться тут: phoneSlice.actions
// Експорт екшенів (подій) для подальшого виклику у необхідних місцях компонентів:
export const { addInStateContact, deleteInStateContact } = phoneSlice.actions;

// Експорт самого редюсеру (export default дозволить використовувати довільне ім'я при імпорті)
export default phoneSlice.reducer;
// reducer - це initialState (чи initialState+reducers???). Саме його треба підключити у глобальному store Redux (файл indexStore.js).
