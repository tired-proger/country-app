
function getListByNumberPage(currentPage, list, perPage = 20) {
    let lastIndex = currentPage * perPage;
    let firstIndex = lastIndex - perPage;
    return list.slice(firstIndex, lastIndex);
}

export { getListByNumberPage }
