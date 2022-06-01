
import { getSaveTheme, SAVE_THEME } from "../../HelpFunctions/getSaveTheme";

const TOGGLE_THEME = "TOGGLE_THEME";

function themeReducer(state = getSaveTheme(), action) {
    switch (action.type) {
        case TOGGLE_THEME:
            let nextTheme = state === "light" ? "dark" : "light";
            localStorage.setItem(SAVE_THEME, nextTheme);
            return nextTheme;
        default:
            return state;
    }
}

//action creators
const toggleTheme = () => ({ type: TOGGLE_THEME });

export { themeReducer }
export { toggleTheme }