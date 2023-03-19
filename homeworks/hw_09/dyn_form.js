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

    for (let i = 0; i < arrayProperties.length; i++) {
        let currProperty = arrayProperties[i];
        let div_el = form.appendChild(document.createElement("div"));
        if ("label" in arrayProperties[i]) {
            createLabel(div_el, currProperty.label, currProperty.name);
        }

        switch (currProperty.kind) {
            case "longtext":
                createInputText(div_el, currProperty.kind, currProperty.name);
                break
            case "number":
                createInputText(div_el, currProperty.kind, currProperty.name);
                break
            case "shorttext":
                createInputText(div_el, currProperty.kind, currProperty.name);
                break
            case "combo":
                createSelect(div_el, currProperty.kind, currProperty.name, currProperty.variants);
                break;
            case "radio":
                createRadio(div_el, currProperty.kind, currProperty.name, currProperty.variants);
                break;
            case "check":
                createCheck(div_el, currProperty.kind, currProperty.name);
                break;
            case "memo":
                createTextArea(div_el, currProperty.kind, currProperty.name);
                break;
            case "submit":
                createButton(div_el, currProperty.kind, currProperty.caption);
                break;  
        }
    }
}

function createLabel(position, context, nameFor) {
    let element = position.appendChild(document.createElement("label"));
    element.setAttribute("for", nameFor);
    element.textContent = context;
}

function createInputText(position, kind, inputName) {
    let element = position.appendChild(document.createElement("input"));
    element.setAttribute("data-kind", kind);
    element.setAttribute("type", "text");
    element.setAttribute("name", inputName);
}

function createSelect(position, kind, inputName, variants) {
    let element = position.appendChild(document.createElement("select"));
    element.setAttribute("data-kind", kind);
    element.setAttribute("name", inputName);

    for (let i = 0; i < variants.length; i++) {
        let variant = element.appendChild(document.createElement("option"));
        variant.setAttribute("value", variants[i].value);
        variant.textContent = variants[i].text;
        variant.selected = true;
    }
}

function createRadio(position, kind, inputName, variants) {
    let element = position.appendChild(document.createElement("div"));

    for (let i = 0; i < variants.length; i++) {
        let variant = element.appendChild(document.createElement("input"));
        variant.setAttribute("type", "radio");
        variant.setAttribute("name", inputName);
        variant.setAttribute("value", variants[i].value);

        let variantName = element.appendChild(document.createElement("span"));
        variantName.textContent = variants[i].text;
    }
}

function createCheck(position, kind, inputName) {
    let element = position.appendChild(document.createElement("input"));
    element.setAttribute("data-kind", kind);
    element.setAttribute("type", "checkbox");
    element.setAttribute("name", inputName);
    element.checked = true;
}

function createTextArea(position, kind, inputName) {
    let element = position.appendChild(document.createElement("textarea"));
    element.setAttribute("data-kind", kind);
    element.setAttribute("name", inputName);
}

function createButton(position, kind, value) {
    let element = position.appendChild(document.createElement("input"));
    element.setAttribute("data-kind", kind);
    element.setAttribute("type", "submit");
    element.setAttribute("value", value);
}

window.onload = showForm();