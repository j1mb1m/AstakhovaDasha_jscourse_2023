"use strict";

function doTest() {
    var h1 = { a: 5, b: { b1: 6, b2: 7 }, c: [33, 22], d: null, e: undefined, f: Number.NaN };
    var h2 = deepCopy(h1);
    console.log(h1);
    console.log(h2);
    console.log("h1===h2 будет false " + (h1 === h2 ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("h1.a===h2.a будет true " + (h1.a === h2.a ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("h1.b===h2.b будет false " + (h1.b === h2.b ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("h1.b.b1===h2.b.b1 будет true " + (h1.b.b1 === h2.b.b1 ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("h1.c===h2.c будет false " + ((h1.c === h2.c) ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("h1.c[0]===h2.c[0] будет true " + (h1.c[0] === h2.c[0] ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("h1.d===h2.d будет true " + (h1.d === h2.d ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("h1.e===h2.e будет true " + (h1.e === h2.e ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("isNaN(h2.f) будет true " + (isNaN(h2.f) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("h2.c instanceof Array будет true " + (h2.c instanceof Array ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("<==============>");

    var a1 = [5, { b1: 6, b2: 7 }, [33, 22], null, undefined, Number.NaN];
    var a2 = deepCopy(a1);
    console.log(a1);
    console.log(a2);
    console.log("a1 === a2 будет false " + (a1 === a2 ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("typeof (a2) === typeof (a1) будет true " + (typeof (a2) === typeof (a1) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a1[0] === a2[0] будет true " + (a1[0] === a2[0] ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a1[1] === a2[1] будет false " + (a1[1] === a2[1] ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("a1[1].b1 === a2[1].b1 будет true " + (a1[1].b1 === a2[1].b1 ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a1[2] === a2[2] будет false " + (a1[2] === a2[2] ? "ПРОВАЛЕН" : "УСПЕХ"));
    console.log("a1[2][0] === a2[2][0] будет true " + (a1[2][0] === a2[2][0] ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a1[3] === a2[3] будет true " + (a1[3] === a2[3] ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a1[4] === a2[4] будет true " + (a1[4] === a2[4] ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("isNaN(a2[5]) будет true " + (isNaN(a2[5]) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("a2[2] instanceof Array будет true " + (a2[2] instanceof Array ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("<==============>");

    var v1 = "sss";
    var v2 = deepCopy(v1);
    console.log(v1);
    console.log(v2);
    console.log("typeof (v2) === typeof (v1) будет true " + (typeof (v2) === typeof (v1) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("v1 === v2 будет true " + (v1 === v2 ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("<==============>");

    var z1 = null;
    var z2 = deepCopy(z1);
    console.log(z1);
    console.log(z2);
    console.log("typeof(z2)===typeof(z1) будет true " + (typeof (z2) === typeof (z1) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("z1===z2 будет true " + (z1 === z2 ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("<==============>");

    var n1 = Number.NaN;
    var n2 = deepCopy(n1);
    console.log(n1);
    console.log(n2);
    console.log("typeof(n2)===typeof(n1) будет true " + (typeof (n2) === typeof (n1) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("isNaN(n2) будет true " + (isNaN(n2)));

    var l1 = undefined;
    var l2 = deepCopy(l1);
    console.log(l1);
    console.log(l2);
    console.log("typeof(l2)===typeof(l1) будет true " + (typeof (l2) === typeof (l1) ? "УСПЕХ" : "ПРОВАЛЕН"));
    console.log("l1===l2 будет true  " + (l1 === l2));
}

function deepCopy(obj) {

    if (obj === null) return null;

    if (Array.isArray(obj)) {
        let copy = [obj.length];
        obj.forEach((element, index) => {
            copy[index] = deepCopy(element)
        });
        return copy
    }

    if (typeof obj === "object") {
        let copy = {};
        Object.keys(obj).forEach(element => {
            copy[element] = deepCopy(obj[element])
        });

        return copy;
    }

    return obj;
}



// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", doTest, false);