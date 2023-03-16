
"use srict";

function calc() {
    let numberOfVowelsForEach = document.getElementById("numberOfVowelsForEach");
    let numberOfVowelsFilter = document.getElementById("numberOfVowelsFilter");
    let numberOfVowelsReduce = document.getElementById("numberOfVowelsReduce");

    let userString = document.getElementById("userString").value;

    let countForEach = getCountVowelsForEach(userString);
    let countFilter = getCountVowelsFilter(userString);
    let countReduce = getCountVowelsReduce(userString);

    numberOfVowelsForEach.innerText = `ForEach: в строке ${countForEach} гласных`;  
    numberOfVowelsFilter.innerText = `Filter: в строке ${countFilter} гласных`;  
    numberOfVowelsReduce.innerText = `Reduce: в строке ${countReduce} гласных`;

}

function getCountVowelsForEach(str) {
    let count = 0;

    Array.from(str).forEach(x => (isVowel(x) ? count++ : 0));

    return count;
}

function getCountVowelsFilter(str) {

    let arrayFiltered = Array.from(str).filter(x => isVowel(x));

    return arrayFiltered.length;
}

function getCountVowelsReduce(str) {

    let sum = Array.from(str).reduce((count, curVal) => count + (isVowel(curVal) ? 1 : 0), 0);

    return sum;
}

function isVowel(s) {
    if (s.toLowerCase() == "а" || s.toLowerCase()  == "я"
        || s.toLowerCase()  == "у" || s.toLowerCase()  == "ю"
        || s.toLowerCase()  == "е" || s.toLowerCase()  == "о" || s.toLowerCase()  == "ё"
        || s.toLowerCase()  == "и" || s.toLowerCase()  == "ы") return true;

    return false;
}