

function calc() {
    let elementNumberOfVowels = document.getElementById("numberOfVowels");
    let userString = document.getElementById("userString").value;

    let count = getCountVowels(userString);

    console.log(count)
    elementNumberOfVowels.innerText = `В строке ${count} гласных`;
}

function getCountVowels(str) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (isVowel(str[i])) count++;
    }

    return count;
}

function isVowel(s) {
    if (s.toLowerCase() == "а" || s.toLowerCase()  == "я"
        || s.toLowerCase()  == "у" || s.toLowerCase()  == "ю"
        || s.toLowerCase()  == "е" || s.toLowerCase()  == "о" || s.toLowerCase()  == "ё"
        || s.toLowerCase()  == "и" || s.toLowerCase()  == "ы") return true;

    return false;
}