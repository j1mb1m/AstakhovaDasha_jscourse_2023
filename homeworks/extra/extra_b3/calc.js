"use strict";

function calculate(str) {

    /* Проверим на корректность введеное выражение, остальное проверим в кейсах ниже */
    /* Исключаем:
    1. выражения начинающиеся с '.', '/', '*', ')'
    2. выражения начинающиеся с '.', '/', '*', ')' после '(' 
    3. выражения с различными символами, которые не должны использоваться и буквами
    4. где подряд идут символы '.', '/', '*' два и более раз
    5. где операнды идут перед ')'
    6. где формула заканчивается операндами
    7. где точка не идет после числа*/
    if (/^[/*.)]|\([/*.)]|[^\d+-.*/\)\(]|[/*.]{2,}|[+-/*.]\)|[+-/*.\(]$|[^\d](?=[.])/g.test(str))
        throw { name: "UncorrectExpressionError", message: "The expression is not constructed correctly. Calculation cannot be performed." };

    const operation =
    {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '/': (x, y) => x / y,
        '*': (x, y) => x * y
    };

    str = str.replace(/ /g, "");

    let arrSteps;
    do {
        arrSteps = /\([\d\+\-\*\/\.]+\)/g.exec(str); //находим все выражения (...)
        if (!arrSteps) break;
        arrSteps.forEach(x => str = str.replace(x, calculateStep(x.substring(1, x.length - 1)))); // просчитваем и подставляем в строку
    } while (true);

    /* Если все же есть символы '(' и ')' значит формула некоррекная, пробросим ошибку */
    if (/[\(\)]+/g.test(str)) throw { name: "UncorrectExpressionError", message: "The expression is not constructed correctly. Calculation cannot be performed." };
    /* Если нечего считать - выходим и возвращаем что получилось */
    if (!/[+*-/=]/g.test(str)) return Number(str);

    /* посчитаем простую операцию */
    function calculateStep(str) {
        let indexOfEquals = str.indexOf('=');

        if (indexOfEquals >= 0 && indexOfEquals != str.length - 1) throw { name: "UncorrectExpressionError", message: "Incorrect usage character '='" };
        if (indexOfEquals < 0) str += "=";

        const stack = [];
        let firstIndex = 0;
        let result = 0;
        let prevOperand = "";
        for (let index = 0; index < str.length; index++) {
            if ("+-*/=".includes(str.charAt(index)) && !"+-*/=".includes(prevOperand)) {
                let firstOperand = Number(str.slice(firstIndex, index));
                let operand = str[index];
                firstIndex = index + 1;

                if (operand !== '*' && operand !== '/') {
                    while (stack.length) {
                        let prev = stack.pop();
                        firstOperand = operation[prev.action](prev.value, firstOperand);
                    }
                }

                if (operand == '=') {
                    if (stack.length) throw { name: "UncorrectExpressionError", message: "Incorrect expression" };
                    result = firstOperand;
                }
                else {
                    stack.push({
                        value: firstOperand,
                        action: operand
                    });
                }
                prevOperand = operand;
            }
            prevOperand = str.charAt(index);
        }
        return result;
    }

    return calculateStep(str);

}

function doTest() {

    let setTests = [
        "-5*3*2",
        "5*3*(-2)",
        "1.3+9.56",
        "1+(*3+6*(2+5))",
        "1+(-3+6*(2+5))",
        "1+(-3+6**(2+5)(",
        "1+(-3+6*(2+5)(",
        "1+(-3+6*(2+5))*",
        "1+(-3+6*(2+5)",
        "1+(-3+-6*(2+5))",
        "*1",
        ")1",
        ".1+(-3+6*(2+5))",
        "*1+(-3+6*(2+5))",
        "1+(.-3+6*(2+5))",
        "1+(-3.+6*(2+5))",
        "1+(-3.0+6*(2+5))",
        ",",
        "i9",
        "1f+(-3.0+6*(2+5))",
        "-1.8+(-3+6*(2+5))",
        "(-3+6)",
        "1.8*3",
        "1.8/3",
        "/1.8/3*(-3+4)",
        "2*(-3+1)",
        "((3/2+10)*10-7)*2+4"

    ];


    for (const iterator of setTests) {
        try {
            let result = calculate(iterator);
            console.log(`${iterator} = ${result} eval:${result == eval(iterator)}`);
        }
        catch (e) {
            let hasExp = false;
            try {
                eval(iterator);
            }
            catch {
                hasExp = true;
            }
            console.log(`${iterator} = ${e.message} eval: ${hasExp}`);
        }
    }

}


function enterTheFormula() {
    let str = prompt("Введите формулу", "2*(-3+1)");
    try {
        alert(calculate(str));
    }
    catch (e) {
        alert(e.message);
    }
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", doTest, false);

// Add event listener
const elEnter = document.getElementById("enter");
elEnter.addEventListener("click", enterTheFormula, false);