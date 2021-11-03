import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import contactsReducer from "./contacts/contacts-reducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const preloadedState = {
  contacts: {
    items: JSON.parse(localStorage.getItem("contacts")) ?? [],
    filter: "",
  },
};

const store = createStore(rootReducer, preloadedState, composeWithDevTools());

export default store;
