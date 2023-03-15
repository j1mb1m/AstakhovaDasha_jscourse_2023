"use strict";

var drinkStorage = new HashStorageClass();

var inputDrink = document.getElementById("inputDrink");
inputDrink.onclick = function () {

    var drinkName = inputDrinkName();

    var drinkDescription = {};

    drinkDescription.alcohol = confirm("Напиток содержит алкоголь (\"OK\" - содержит, \"Отмена\" - не содержит)?");
    drinkDescription.recipe = enterStringFromPrompt("Напишите рецепт напитка? ");
    drinkStorage.addValue(drinkName, drinkDescription);

}

var getDrinkInfo = document.getElementById("getDrinkInfo");
getDrinkInfo.onclick = function () {
    var drinkName = inputDrinkName()
    var drinkValue = drinkStorage.getValue(drinkName);

    var info = "Информация о таком напитке отсутствует!";

    if (drinkValue != undefined) {
        info = `напиток ${drinkName}\nалкогольный ${(drinkValue.alcohol ? "да" : "нет")}\nрецепт приготовления: ${drinkValue.recipe}`;
    }
    alert(info);
}

var deleteDrink = document.getElementById("deleteDrink");
deleteDrink.onclick = function () {
    var drinkName = inputDrinkName();
    var state = drinkStorage.deleteValue(drinkName);

    alert(state ? "информация успешно удалена" : "невозможно удалить, возможно вы указали не существующий напиток");
}

var showDrinkList = document.getElementById("showDrinkList");
showDrinkList.onclick = function () {
    alert(drinkStorage.getKeys());
}

function inputDrinkName() {
    return enterStringFromPrompt("Напишите название напитка? ");
}

function enterStringFromPrompt(msg) {
    let str = "";
    let hasExp = false;

    do {
        str = prompt((hasExp ? "Поле обязательно для заполнения!!!!\n" : "")
            + `${msg}`);

        hasExp = true;

    } while (str == null || str.trim() == "");

    return str.trim();
}

