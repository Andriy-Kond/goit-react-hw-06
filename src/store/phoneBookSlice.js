import { createSlice } from '@reduxjs/toolkit';

const phoneSlice = createSlice({
  name: 'phoneBook',

  initialState: {
    stateContacts: [],
  },

  reducers: {
    addInStateContact(state, action) {
      state.stateContacts.push(action.payload);
    },

    deleteInStateContact(state, action) {
      state.stateContacts = state.stateContacts.filter(
        contact => contact.id !== action.payload.id
      );
    },
  },
});

// Щоб відпрацьовував потрібний редюсер треба викликати відповідний екшен у UI (у компоненті) при настанні відповідної події.
// Екшени створюються автоматично у Redux-ToolKit і в цьому випадку знаходяться тут: phoneSlice.actions

// Експорт екшенів (подій) для подальшому виклику у необхідних місцях компонентів:
export const { addInStateContact, deleteInStateContact } = phoneSlice.actions;

// Експорт самого редюсеру (якщо за замовчуванням, то значить можна буде використовувати будь-яке ім'я при імпорті)
export default phoneSlice.reducer;
// reducer - це initialState (чи initialState+reducers?). Саме його треба підключити у глобальному store Redux.
