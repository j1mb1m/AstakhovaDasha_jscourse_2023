function checkString() {
    let userString = document.getElementById("userString").value;
    alert(`${isPalindrome(userString) ? "palindrome" : "not a palindrome"}`);
}

function isPalindrome(str) {
    let clearStr = str.toLowerCase().replace(/[^а-яёa-z0-9]|[ьъ]/g, '').replace(/ё/g, 'е');

    if (clearStr.length <= 1) { return true; }

    let middleStr = clearStr.length % 2 == 0 ? clearStr.length / 2 : (clearStr.length - 1) / 2;

    for (let i = 0; i < middleStr; i++) {
        console.log(`step ${i}: check indexes ${i} ${clearStr.length - 1 - i} `);
        if (clearStr.charAt(i) != clearStr.charAt(clearStr.length - 1 - i)) return false;
    }

    return true;
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", checkString, false);