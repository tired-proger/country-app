
import { searchListCountries } from "../../HelpFunctions/searchListCountries";

const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const SET_SEARCH_LIST = "SET_SEARCH_LIST";
const RESET_SEARCH_LIST = "RESET_SEARCH_LIST";

const defaultState = {
    searchValue: "",
    searchListCountries: [],
};

function searchReducer(state = defaultState, action) {

    switch (action.type) {
        case SET_SEARCH_VALUE:
            return { ...state, searchValue: action.value }
        case SET_SEARCH_LIST:
            return { ...state, searchListCountries: searchListCountries(action.list, state.searchValue) }
        case RESET_SEARCH_LIST:
            return { searchListCountries: [], searchValue: "" }
        default:
            return state;
    }

}

//action creators
const setSearchValue = (value) => ({ type: SET_SEARCH_VALUE, value })
const setSearchListCountries = (list) => ({ type: SET_SEARCH_LIST, list })
const resetListCountries = () => ({ type: RESET_SEARCH_LIST })

export { setSearchListCountries, setSearchValue, resetListCountries }
export { searchReducer }

