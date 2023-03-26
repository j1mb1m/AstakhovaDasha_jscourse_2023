
function main() {
    let userString = document.getElementById("userString").value;

    alert(`$${trimSpaces(userString)}$`);
}

function trimSpaces(userString) {
    let startStr = 0;
    let endStr = userString.length;

    for (let i = 0; i < userString.length; i++) {
        if (userString.charAt(i) !== ' ') {
            startStr = i;
            break;
        }
    }

    for (let i = userString.length - 1; i >= 0; i--) {
        if (userString.charAt(i) !== ' ') {
            endStr = i + 1;
            break;
        }
    }

    return userString.slice(startStr, endStr);
}