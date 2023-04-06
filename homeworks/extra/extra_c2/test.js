function test(testSet) {
    if (testSet.equal) {
        for (let element of testSet.equal) {
            it(`${JSON.stringify(element.obj1)} === ${JSON.stringify(element.obj2)}  будет ${element.result} `, function () {
                const answer = (element.obj1 === element.obj2);
                assert.deepEqual(answer, element.result);
            });
        }
    }
    if (testSet.isNaN) {
        for (let element of testSet.isNaN) {
            it(`isNaN(${element.obj1})  будет ${element.result} `, function () {
                const answer = isNaN(element.obj1);
                assert.deepEqual(answer, element.result);
            });
        }
    }
    if (testSet.isArray) {
        for (let element of testSet.isArray) {
            it(`${element.obj1} instance Array будет ${element.result} `, function () {
                const answer = (element.obj1 instanceof Array);
                assert.deepEqual(answer, element.result);
            });
        }
    } if (testSet.typeof) {
        for (let element of testSet.typeof) {
            it(`typeof(${element.obj1}) === typeof(${element.obj2}) будет ${element.result} `, function () {
                const answer = (typeof (element.obj1) === typeof (element.obj2));
                assert.deepEqual(answer, element.result);
            });
        }
    }
}

describe('Test 1: deepCopy - deep copy function of the value passed to it', function () {

    let h1 = { a: 5, b: { b1: 6, b2: 7 }, c: [33, 22], d: null, e: undefined, f: Number.NaN };
    let h2 = deepCopy(h1);

    let testSet = {
        equal: [
            { obj1: h1, obj2: h2, result: false },
            { obj1: h1.a, obj2: h2.a, result: true },
            { obj1: h1.b, obj2: h2.b, result: false },
            { obj1: h1.b.b1, obj2: h2.b.b1, result: true },
            { obj1: h1.c, obj2: h2.c, result: false },
            { obj1: h1.c[0], obj2: h2.c[0], result: true },
            { obj1: h1.d, obj2: h2.d, result: true },
            { obj1: h1.e, obj2: h2.e, result: true },
            { obj1: h1.c, obj2: h2.c, result: false }
        ],
        isNaN: [
            { obj1: h2.f, result: true }
        ],
        isArray: [
            { obj1: h2.c, result: true }
        ]
    };

    test(testSet);
});

describe('Test 2: deepCopy - deep copy function of the value passed to it', function () {

    let a1 = [5, { b1: 6, b2: 7 }, [33, 22], null, undefined, Number.NaN];
    let a2 = deepCopy(a1);

    let testSet = {
        equal: [
            { obj1: a1, obj2: a2, result: false },
            { obj1: a1[0], obj2: a2[0], result: true },
            { obj1: a1[1], obj2: a2[1], result: false },
            { obj1: a1[1].b1, obj2: a2[1].b1, result: true },
            { obj1: a1[2], obj2: a2[2], result: false },
            { obj1: a1[2][0], obj2: a2[2][0], result: true },
            { obj1: a1[3], obj2: a2[3], result: true },
            { obj1: a1[4], obj2: a1[4], result: true }
        ],
        isNaN: [
            { obj1: a2[5], result: true }
        ],
        isArray: [
            { obj1: a2[2], result: true }
        ],
        typeof: [
            { obj1: a2, obj2: a1, result: true }
        ]
    };

    test(testSet);
});

describe('Test 3: deepCopy - deep copy function of the value passed to it', function () {

    var v1 = "sss";
    var v2 = deepCopy(v1);

    let testSet = {
        equal: [
            { obj1: v1, obj2: v2, result: true }
        ],
        typeof: [
            { obj1: v2, obj2: v1, result: true }
        ]
    };

    test(testSet);
});

describe('Test 4: deepCopy - deep copy function of the value passed to it', function () {

    var z1 = null;
    var z2 = deepCopy(z1);

    let testSet = {
        equal: [
            { obj1: z1, obj2: z2, result: true }
        ],
        typeof: [
            { obj1: z2, obj2: z1, result: true }
        ]
    };

    test(testSet);
});

describe('Test 5: deepCopy - deep copy function of the value passed to it', function () {

    var n1 = Number.NaN;
    var n2 = deepCopy(n1);

    let testSet = {
        isNaN: [
            { obj1: n2, result: true }
        ],
        typeof: [
            { obj1: n2, obj2: n1, result: true }
        ]
    };

    test(testSet);
});