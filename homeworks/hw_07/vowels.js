
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
    let vowel = "аяуюэеоёиы";

    Array.from(str)
        .forEach(x => (vowel.indexOf(x) != -1 ? count++ : 0));

    return count;
}

function getCountVowelsFilter(str) {

    let vowel = "аяуюэеоёиы";
    let count = Array.from(str)
        .filter(x => vowel.indexOf(x) != -1)
        .length;

    return count;
}

function getCountVowelsReduce(str) {

    let vowel = "аяуюэеоёиы";
    let sum = Array.from(str)
        .reduce((count, curVal) => count + (vowel.indexOf(curVal) != -1 ? 1 : 0), 0);

    return sum;
}
