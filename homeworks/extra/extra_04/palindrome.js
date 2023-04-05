"use strict";

function checkString() {

    let userString = document.getElementById("userString").value;
    alert(`${checkPalindrome(userString) ? "palindrome" : "not a palindrome"}`);

}

function checkPalindrome(str) {

    let clearStr = str.toLowerCase().replace(/[^а-яёa-z0-9]|[ьъ]/g, '').replace(/ё/g, 'е');
    return isPalindrome(clearStr);
}

function isPalindrome(str) {

    if (str.length <= 1) return true;
    if (str.charAt(0) != str.charAt(str.length - 1)) return false;

    return isPalindrome(str.substring(1, str.length - 1));
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", checkString, false);