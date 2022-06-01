
import { createRange } from "../../HelpFunctions/createRange"
import { getListByNumberPage } from "../../HelpFunctions/getListByNumberPage"

const INIT_PAGINATION = "INIT_PAGINATION";
const SET_PAGINATION_DISPLAY_PAGE = "SET_PAGINATION_DISPLAY_PAGE";

const defaultState = {
    paginationDisplayPage: 1,
    paginationAllDisplayPages: null,
    paginationDisplayPagesListDefault: [],
    paginationDisplayPagesList: [],
}

function paginationReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT_PAGINATION:
            let rangePaginationArr = createRange(1, action.allPages);
            return ({
                ...state,
                paginationDisplayPagesListDefault: rangePaginationArr,
                paginationAllDisplayPages: Math.ceil(action.allPages / 3),
                paginationDisplayPagesList: getListByNumberPage(state.paginationDisplayPage, rangePaginationArr, 3)
            })
        case SET_PAGINATION_DISPLAY_PAGE:
            return ({
                ...state,
                paginationDisplayPage: action.paginationDisplayPage,
                paginationDisplayPagesList: getListByNumberPage(
                    action.paginationDisplayPage,
                    state.paginationDisplayPagesListDefault, 
                    3
                )
            })
        default:
            return state;
    }
}

//action creators
const initPagination = (allPages) => ({ type: INIT_PAGINATION, allPages })
const setPaginationDisplayPage = (paginationDisplayPage) => ({ type: SET_PAGINATION_DISPLAY_PAGE, paginationDisplayPage })

export { paginationReducer }
export { initPagination, setPaginationDisplayPage }
