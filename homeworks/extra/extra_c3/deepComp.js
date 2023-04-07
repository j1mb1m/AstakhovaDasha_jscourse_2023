"use strict";

function deepComp(obj1, obj2) {

    if (obj1 === obj2) return true;

    if (typeof (obj1) != typeof (obj2)) return false;

    if (obj1 === null || obj2 === null) return false;

    if (typeof (obj1) === "number" && isNaN(obj1) && isNaN(obj2)) return true;

    if (obj1.constructor.name != obj2.constructor.name) return false;

    if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length === obj2.length) {
        obj1.sort();
        obj2.sort();
        return obj1.filter((element, index) => deepComp(element, obj2[index])).length === obj1.length;
    }

    if (typeof (obj1) === "object" && Object.keys(obj1).length === Object.keys(obj2).length) {
        let kesObj1 = Object.keys(obj1);
        return kesObj1.filter(element => ((element in obj2) ? deepComp(obj1[element], obj2[element]) : false)).length === kesObj1.length;
    }



    return false;
}

function test(testSet) {

    for (let element of testSet) {
        console.log(`${JSON.stringify(element.obj1)} === ${JSON.stringify(element.obj2)} будет ${element.result} ${(deepComp(element.obj1, element.obj2) === element.result ? "УСПЕХ" : "ПРОВАЛ")}`);
    }

}

function doTest() {
    var H1 = { a: 5, b: { b1: 6, b2: 7 } };
    var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
    var H3 = { a: 5, b: { b1: 6 } };
    var H4 = { a: 5, b: { b1: 66, b2: 7 } };
    var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
    var H6 = { a: null, b: undefined, c: Number.NaN };
    var H7 = { c: Number.NaN, b: undefined, a: null };
    var H8 = { a: 5, b: 6 };
    var H9 = { c: 5, d: 6 };
    var H10 = { a: 5 };
    var A1 = [5, 7];
    var A2 = [5, 5, 7];
    var A3 = [5, 8, 7];

    let testSet = [
        { obj1: H1, obj2: H2, result: true },
        { obj1: H1, obj2: H3, result: false },
        { obj1: H1, obj2: H4, result: false },
        { obj1: H1, obj2: H5, result: false },
        { obj1: H6, obj2: H7, result: true },
        { obj1: H8, obj2: H9, result: false },
        { obj1: H8, obj2: H10, result: false },
        { obj1: null, obj2: H10, result: false },
        { obj1: H10, obj2: null, result: false },
        { obj1: null, obj2: null, result: true },
        { obj1: 5, obj2: "5", result: false },
        { obj1: 5, obj2: H1, result: false },
        { obj1: A1, obj2: H1, result: false },
        { obj1: A2, obj2: A3, result: false },
        { obj1: { a: 5, b: undefined }, obj2: { a: 5, c: undefined }, result: false }, 
        { obj1: [5, 7], obj2: { 0: 5, 1: 7 }, result: false },
        { obj1: [5, 7], obj2: { 0: 5, 1: 7, length: 2 }, result: false },
        { obj1: "aaa", obj2: "bbb", result: false },
        { obj1: Number.NaN, obj2: Number.NaN, result: true }
    ];

    test(testSet);
}



// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", doTest, false);