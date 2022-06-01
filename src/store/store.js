
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { countriesReducer } from "./reducers/countriesReducer";
import { paginationReducer } from "./reducers/paginationReducer";
import { searchReducer } from "./reducers/searchReducer";
import { themeReducer } from "./reducers/themeReducer";

const rootReducer = combineReducers({
    listCountries: countriesReducer,
    search: searchReducer,
    paginate: paginationReducer,
    theme: themeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };