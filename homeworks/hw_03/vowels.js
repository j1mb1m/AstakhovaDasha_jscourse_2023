

function calc() {
    let elementNumberOfVowels = document.getElementById("numberOfVowels");
    let userString = document.getElementById("userString").value;

    let count = getCountVowels(userString);

    console.time("for");
    console.log(getCountVowels(userString));
    console.timeEnd("for");

    elementNumberOfVowels.innerText = `В строке ${count} гласных`;
}


function getCountVowels(str) {
    let count = 0;
    let vowel = "аяуюэеоёиы";

    for (let i = 0; i < str.length; i++) {
        if (vowel.indexOf(str[i].toLowerCase()) != -1)
            count++;
    }

    return count;
}
/* 
function getCountVowels1(str) {
    let count = 0;
    let vowel = "аяуюэеоёиы";

    for (let i = 0; i < str.length; i++) {
        if (vowel.includes(str[i].toLowerCase()))
            count++;
    }

    return count;
}

 function getCountVowels2(str) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        let s = str[i];
        if (s.toLowerCase() == "а" || s.toLowerCase()  == "я"
        || s.toLowerCase()  == "у" || s.toLowerCase()  == "ю"
        || s.toLowerCase()  == "э" || s.toLowerCase()  == "е" 
        || s.toLowerCase()  == "о" || s.toLowerCase()  == "ё"
        || s.toLowerCase()  == "и" || s.toLowerCase()  == "ы") 
        count++;
    }

    return count;
}

function getCountVowels3(str) {
    let count = 0;
    let vowel = "аяуюэеоёиы";
    let ns = str.split(''); 

    for (i of ns) {
        if (vowel.indexOf(i.toLowerCase()) != -1) 
        count++;
    }

    return count;
}


function getCountVowels4(str) {
    let count = 0;
    let vowel = "аяуюэеоёиы";
    
    count = str.split('').filter(x=>vowel.includes(x)).length;

    return count;
}  */