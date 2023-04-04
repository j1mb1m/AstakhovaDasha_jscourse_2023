
"use srict";

function calc() {

    const interface = [
        {id: "numberOfVowelsForEach", func: getCountVowelsForEach, method: "ForEach"},
        {id: "numberOfVowelsFilter", func: getCountVowelsFilter, method: "Filter"},
        {id: "numberOfVowelsReduce", func: getCountVowelsReduce, method: "Reduce"},
    ];   
    
    let userString = document.getElementById("userString").value;

    interface.forEach(value => document.getElementById(value.id).innerText = `${value.method}: в строке ${value.func(userString)} гласных`);
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
