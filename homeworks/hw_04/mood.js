"use strict";

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
    const colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    let colorsShowed = {};

    if (colorsCount > colors.length) throw new Error("Количество цветов больше, чем можно выбрать!");

    console.log('цветов: ' + colorsCount);
    for (let i = 1; i <= colorsCount; i++) {
        let n = randomDiap(1, 7);
        let colorName = colors[n];

        while (colorName in colorsShowed){
            n = randomDiap(1, 7);
            colorName = colors[n];
        } 

        colorsShowed[colorName] = colorName;
        console.log(colorName);
    }
}
