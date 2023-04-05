function checkString() {
    let userString = document.getElementById("userString").value;
    alert(`${isPalindrome(userString) ? "palindrome" : "not a palindrome"}`);
}

function isPalindrome(str) {
    let clearStr = str.toLowerCase().replace(/[^а-яёa-z0-9]/g, '').replace(/ёьЪ/g, 'е');

    if (clearStr.length == 0) { return false; }
    if (clearStr.length == 1) { return true; }

    for (let i = 0; i < (clearStr.length - 1)/ 2; i++) {
        if (clearStr.charAt(i) != clearStr.charAt(clearStr.length - 1 - i)) return false;
    }

    return true;
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", checkString, false);