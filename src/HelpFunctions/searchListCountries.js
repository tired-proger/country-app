
function searchListCountries(list, value) {

    value = value.toLowerCase();

    let searchedList = list.filter(el => {
        let countryName = el.name.common.toLowerCase();
        if (countryName.includes(value)) return true;
        return false;
    });

    return searchedList;

}

export { searchListCountries }

