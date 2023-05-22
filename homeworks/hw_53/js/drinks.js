'use strict';
import { LocalStorageClass } from "./LocalStorageClass.js";

const drinkStorage = new LocalStorageClass('drinks');
const dishStorage = new LocalStorageClass('dishes');

const objects = {
    drink:['напиток', 'напитка', 'напитку', 'напиток', 'напитком', 'напитке'],
    dish:['блюдо', 'блюда', 'блюду', 'блюдо', 'блюдом', 'блюде'], 
}


function addItem(db, item) {
    let drinkName = inputName('Напишите название напитка?');
    let drinkDescription = {};

    drinkDescription.alcohol = confirm(`${item[0]} cодержит алкоголь (\"OK\" - содержит, \"Отмена\" - не содержит)?`);
    drinkDescription.recipe = enterStringFromPrompt("Напишите рецепт? ");
    db.addValue(drinkName, drinkDescription);

}

function getInfo(db, item) {
    let drinkName = inputName();
    let drinkValue = db.getValue(drinkName);

    let info = "Информация отсутствует!";

    if (drinkValue != undefined) {
        info = `${item[0]} ${drinkName}\nалкогольный ${(drinkValue.alcohol ? "да" : "нет")}\nрецепт приготовления: ${drinkValue.recipe}`;
    }
    alert(info);
}

function deleteItem(db, item) {
    let drinkName = inputName();
    let state = db.deleteValue(drinkName);

    alert(state ? `информация о ${item[7]} успешно удалена` : `невозможно удалить, возможно вы указали не существующую позицию`);
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
    if (event.target.id === 'inputDrink') addItem(drinkStorage, objects.drink);
    if (event.target.id === 'getDrinkInfo') getInfo(drinkStorage, objects.drink);
    if (event.target.id === 'deleteDrink') deleteItem(drinkStorage, objects.drink);
    if (event.target.id === 'showDrinkList') showList(drinkStorage);
    if (event.target.id === 'inputDish') addItem(dishStorage, objects.dish);
    if (event.target.id === 'getDishInfo') getInfo(dishStorage, objects.dish);
    if (event.target.id === 'deleteDish') deleteItem(dishStorage, objects.dish);
    if (event.target.id === 'showDishList') showList(dishStorage);
};



