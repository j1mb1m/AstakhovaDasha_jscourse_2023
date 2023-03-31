
function main() {
    let userString = document.getElementById("userString").value;

    alert(`$${trimSpaces(userString)}$`);
}

function trimSpaces(userString) {
    let startStr = 0;
    let endStr = userString.length;

    for (let i = 0; i < userString.length; i++) {
        if (userString.charAt(i) !== ' ') {
            console.info("Первый символ в начале строки в позиции (начиная с 0): " + i);
            startStr = i;
            break;
        }
    }

    if (startStr == userString.length - 1) {
        console.info("Строка состоит из одних пробелов. Возращаем пустую строку.");
        return "";
    }

    for (let i = userString.length - 1; i >= 0; i--) {
        if (userString.charAt(i) !== ' ') {
            console.info("Последний символ в конце строки в позиции (начиная с 0): " + i);
            endStr = i + 1;
            break;
        }
    }

    if (startStr == 0 && endStr == userString.length) {
        console.info("Строка не содержит пробелов. Возвращаем как есть.");
        return userString
    };

    console.info("Строка начинается в позиции " + startStr + " и заканчивается в позиции " + (endStr - 1) + ". Обрезаем. ");
    return userString.slice(startStr, endStr);
}