describe('isPalindrome - the function of checking on the palindrome', function () {

    const testSet = [
        { phrase: "НА В ЛОБ, БОЛВАН", answer: true },
        { phrase: "Мат и тут и там", answer: true },
        { phrase: "Я аж орала, рожая!", answer: true },
        { phrase: "676", answer: true },
        { phrase: "Лёша на полке клопа нашёл", answer: true },
        { phrase: "Он — верба, но / Она — бревно", answer: true },
        { phrase: "Лег на храм, и дивен и невидим архангел", answer: true }
    ];

    for (let test of testSet) {
        it(`Phraze: ${test.phrase} is ${test.answer} `, function () {
            const answer = isPalindrome(test.phrase);
            assert.deepEqual(answer, test.answer);
        });
    }

});