

function calc() {
    let elementNumberOfVowels = document.getElementById("numberOfVowels");
    let userString = document.getElementById("userString").value;

    let count = getCountVowels(String(userString).toLowerCase());

    console.log(count)
    elementNumberOfVowels.innerText = `В строке ${count} гласных`;
}

function getCountVowels(str) {
    let count = 0;


    for (let i = 0; i < str.length; i++) {
        if (str[i] == "а" || str[i] == "я"
            || str[i] == "у" || str[i] == "ю"
            || str[i] == "е" || str[i] == "о" || str[i] == "ё"
            || str[i] == "и" || str[i] == "ы")
            count++;
    }
    return count;
}