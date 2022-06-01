
import { getListByNumberPage } from "../../HelpFunctions/getListByNumberPage"

//actions
const FIRST_GET_COUNTRIES = "FIRST_GET_COUNTRIES";
const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
const GET_COUNTRIES = "GET_COUNTRIES";
const SET_ALL_COUNTRIES = "SET_ALL_COUNTRIES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_SELECTED_OPTION = "SET_SELECTED_OPTION";


const defaultState = {

    isLoader: true,
    defaultListCountries: [],
    displayListCountries: [],

    paginationCurrentPage: 1,
    paginationAllPages: null,
    paginationVisible: true,

    isVisibleBtnUp: false,
    selectedOption: null

}

function countriesReducer(state = defaultState, action) {
    switch (action.type) {
        case FIRST_GET_COUNTRIES:
            let allPages = Math.ceil(action.countries.length / 20);
            return ({
                ...state,
                defaultListCountries: action.countries,
                displayListCountries: getListByNumberPage(
                    state.paginationCurrentPage,
                    action.countries
                ),
                paginationAllPages: allPages,
            })
        case GET_COUNTRIES:
            return ({ ...state, displayListCountries: action.countries, paginationVisible: false, isVisibleBtnUp: true })
        case SET_ALL_COUNTRIES:
            return ({ 
                ...state,
                displayListCountries: getListByNumberPage(
                    state.paginationCurrentPage,
                    state.defaultListCountries
                ),
                paginationVisible: true,
                isVisibleBtnUp: false
            })
        case SET_CURRENT_PAGE:
            return ({
                ...state,
                paginationCurrentPage: action.page,
                displayListCountries: getListByNumberPage(action.page, state.defaultListCountries)
            })
        case SET_SELECTED_OPTION:
            return ({ ...state, selectedOption: action.option })
        case SHOW_LOADER:
            return ({ ...state, isLoader: true })
        case HIDE_LOADER:
            return ({ ...state, isLoader: false })
        default: 
            return state;
    }
}

//action creators
const showLoader = () => ({ type: SHOW_LOADER });
const hideLoader = () => ({ type: HIDE_LOADER });
const firstSetAllCountries = (countries) => ({ type: FIRST_GET_COUNTRIES, countries });
const setRegionCountries = (countries) => ({ type: GET_COUNTRIES, countries });
const setAllCountries = () => ({ type: SET_ALL_COUNTRIES });
const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
const setSelectedOption = (option) => ({ type: SET_SELECTED_OPTION, option });

//thunks
const firstGetAllCountriesThunk = async (dispatch) => {
    dispatch(showLoader());
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    dispatch(firstSetAllCountries(data));
    dispatch(hideLoader());
}

const setRegionCountriesThunk = (region) => {
    return async (dispatch) => {
        dispatch(showLoader());
        let response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        let data = await response.json();
        dispatch(setRegionCountries(data));
        dispatch(hideLoader());
    }
}

export { countriesReducer }
export { setAllCountries, setCurrentPage, setSelectedOption }
export { firstGetAllCountriesThunk, setRegionCountriesThunk }