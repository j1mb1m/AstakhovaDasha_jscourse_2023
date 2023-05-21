'use strict';
import { LocalStorageClass } from "./LocalStorageClass.js";

const drinkStorage = new LocalStorageClass('drinks');
const dishStorage = new LocalStorageClass('dishes');



function addItem(db) {
    let drinkName = inputName('Напишите название напитка?');
    let drinkDescription = {};

    drinkDescription.alcohol = confirm("Содержит алкоголь (\"OK\" - содержит, \"Отмена\" - не содержит)?");
    drinkDescription.recipe = enterStringFromPrompt("Напишите рецепт? ");
    db.addValue(drinkName, drinkDescription);

}

function getInfo(db) {
    let drinkName = inputName();
    let drinkValue = db.getValue(drinkName);

    let info = "Информация отсутствует!";

    if (drinkValue != undefined) {
        info = `напиток ${drinkName}\nалкогольный ${(drinkValue.alcohol ? "да" : "нет")}\nрецепт приготовления: ${drinkValue.recipe}`;
    }
    alert(info);
}

function deleteItem(db) {
    let drinkName = inputName();
    let state = db.deleteDrink(drinkName);

    alert(state ? "информация успешно удалена" : "невозможно удалить, возможно вы указали не существующую позицию");
}

function showList(db) {
    alert(db.getKeys());
}

function inputName() {
    return enterStringFromPrompt('Напишите название?');
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

window.onclick = function (event) {
    event.preventDefault();
    if (event.target.id === 'inputDrink') addItem(drinkStorage);
    if (event.target.id === 'getDrinkInfo') getInfo(drinkStorage);
    if (event.target.id === 'deleteDrink') deleteItem(drinkStorage);
    if (event.target.id === 'showDrinkList') showList(drinkStorage);
    if (event.target.id === 'inputDish') addItem(dishStorage);
    if (event.target.id === 'getDishInfo') getInfo(dishStorage);
    if (event.target.id === 'deleteDish') deleteItem(dishStorage);
    if (event.target.id === 'showDishList') showList(dishStorage);
};



