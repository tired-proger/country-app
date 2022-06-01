
function editNumberPopulation(number) {
    
    number = String(number);
    let numberLetters = [ ...number ];

    if (numberLetters.length < 4) return number;

    switch (numberLetters.length) {
        case 4:
            numberLetters.splice(1, 0, ",");
            break;
        case 5:
            numberLetters.splice(2, 0, ",");
            break;
        case 6:
            numberLetters.splice(3, 0, ",");
            break;
        case 7:
            numberLetters.splice(1, 0, ",");
            numberLetters.splice(5, 0, ",");
            break;
        case 8:
            numberLetters.splice(2, 0, ",");
            numberLetters.splice(6, 0, ",");
            break;
        case 9:
            numberLetters.splice(3, 0, ",");
            numberLetters.splice(7, 0, ",");
            break;
        case 10:
            numberLetters.splice(1, 0, ",");
            numberLetters.splice(5, 0, ",");
            numberLetters.splice(9, 0, ",");
            break;
    }

    return numberLetters.join("");

}

export { editNumberPopulation }