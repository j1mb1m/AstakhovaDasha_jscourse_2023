var formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];

var formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

function showForm() {
    createForm(document.getElementById("solution"), formDef1);
    createForm(document.getElementById("solution"), formDef2);
}


function createForm(position, arrayProperties) {
    const form = position.appendChild(document.createElement("form"));
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://fe.it-academy.by/TestForm.php");
    form.setAttribute("target", "_blank");

    arrayProperties.forEach(element => {
        let div = form.appendChild(document.createElement("div"));
        createTag(div, element);
    }
    );
}

function createTag(position, element) {

    if ("label" in element) {
        position.appendChild(createLabel(element.label, element.name));
    }

    if (element.kind == "longtext" || element.kind == "shorttext") {
        position.appendChild(createInput("input", "text", element.kind, element.name));
    }
    else if (element.kind == "number") {
        position.appendChild(createInput("input", "number", element.kind, element.name));
    }
    else if (element.kind == "combo") {
        position.appendChild(createSelect(element.kind, element.name, element.variants));
    }
    else if (element.kind == "radio") {
        position.appendChild(createRadio(element.name, element.variants));
    }
    else if (element.kind == "check") {
        let newElement = position.appendChild(createInput("input", "checkbox", element.kind, element.name));
        newElement.checked = true;
    }
    else if (element.kind == "memo") {
        position.appendChild(createInput("textarea", null, element.kind, element.name));
    }
    else if (element.kind == "submit") {
        position.appendChild(createInput("input", "submit", element.kind, null, element.caption));
    }

}

function createLabel(context, nameFor) {
    let element = document.createElement("label");
    element.setAttribute("for", nameFor);
    element.textContent = context;

    return element;
}

function createSelect(kind, inputName, variants) {
    let elSelect = createInput("select", null, kind, inputName);

    variants.forEach(el => {
        let variant = elSelect.appendChild(document.createElement("option"));
        variant.setAttribute("value", el.value);
        variant.textContent = el.text;
        variant.selected = true;
    });

    return elSelect;
}

function createRadio(inputName, variants) {
    let elRadio = document.createElement("div");

    variants.forEach(el => {
        elRadio.appendChild(createInput("input", "radio", null, inputName, el.value));
        let variantName = elRadio.appendChild(document.createElement("span"));
        variantName.textContent = el.text;
    });

    return elRadio;
}

function createInput(tag, tagType, kind, tagName, value) {

    let element = document.createElement(tag);
    if (tagType) element.setAttribute("type", tagType);
    element.setAttribute("data-kind", kind);
    element.setAttribute("name", tagName);
    if (value) element.setAttribute("value", value);

    return element;
}

window.onload = showForm();