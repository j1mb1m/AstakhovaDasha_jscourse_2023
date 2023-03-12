const ALPHABET_ENG = /^[a-zA-Z]+$/i;
const ALPHABET_RU = /^[а-яёА-ЯЁ]+$/i;

const msgExp = "Не верно введены данные. \nПовторите ввод.\n";
const Languages = { NONE: "none", RU: "ru", ENG: "eng" };

let language = Languages.NONE;

function completeQuestionnaire() {
    let fio = enterFIO();
    let age = enterAge("Сколько вам лет (введите полные года)?");
    let gender = confirm("Bаш пол - мужской? \nВыберите \"ОК\", если пол мужской; выберите \"ОТМЕНА\", если пол женский.");

    let information = `ваше ФИО: ${fio}
ваш возраст в годах: ${age}
ваш возраст в днях: ${age * 365} 
через 5 лет вам будет: ${age + 5}
ваш пол: ${(gender ? "мужской" : "женский")} 
вы на пенсии: ${((gender ? age >= 63 : age >= 58) == true ? "да" : "нет")}`;

    alert(information);
}

function enterFIO() {

    let lastName = enterStringFromPrompt("Ваша фамилия ?");
    let firstName = enterStringFromPrompt("Ваше имя ?");
    let patronymic = enterStringFromPrompt("Ваше отчество ?");

    return `${toCamelCase(lastName)} ${toCamelCase(firstName)} ${toCamelCase(patronymic)} `;
}

function toCamelCase(str) {
    let result = String(str).toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
}

function enterStringFromPrompt(msg) {
    let str = "";
    let hasExp = false;
    let hasNull = false;

    do {
        str = prompt((hasExp ? msgExp : "")
            + (hasNull ? "Поле обязательно для заполнения!!!!\n" : "")
            + `${msg} ${language == Languages.NONE ? "" : "(используйте раскладку \"" + language + "\")"}`);

        if (str == null) {
            hasNull = true;
            continue;
        }
        hasExp = true;
        hasNull = false;

    } while (str == null || !validateString(str));

    return str.trim();
}

function validateString(value) {

    switch (language) {
        case Languages.ENG: return ALPHABET_ENG.test(value);
        case Languages.RU: return ALPHABET_RU.test(value);
        default:
            if (ALPHABET_ENG.test(value)) {
                language = Languages.ENG;
                return true;
            }
            else if (ALPHABET_RU.test(value)) {
                language = Languages.RU;
                return true;
            }
            else return false;
    }
    return false;
}

function enterAge(msg) {
    let str = 18;
    let hasExp = false;

    do {
        str = prompt((hasExp ? msgExp : "") + `${msg}`, 18);
        str = Number(str);
        hasExp = true;

    } while (isNaN(str) || !(str > 0 && str < 130) || Math.round(str) != str);

    return str;
}
