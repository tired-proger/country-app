
const SAVE_THEME = "themeCountries";

function getSaveTheme() {

    let valueTheme = localStorage.getItem(SAVE_THEME);
    if (valueTheme) return valueTheme;
    return "light";

}

export { getSaveTheme, SAVE_THEME }
