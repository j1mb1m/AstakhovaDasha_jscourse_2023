const formDef1 =
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

const formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

const operations = {
    longtext: { options: { tag: "input", type: "text" }, func: createInput },
    number: { options: { tag: "input", type: "number" }, func: createInput },
    shorttext: { options: { tag: "input", type: "text" }, func: createInput },
    combo: { options: { tag: "select" }, func: createSelect },
    check: { options: { tag: "input", type: "checkbox" }, func: createInput },
    radio: { options: { tag: "input", type: "radio" }, func: createRadio },
    memo: { options: { tag: "textarea" }, func: createInput },
    submit: { options: { tag: "input", type: "submit" }, func: createInput }
}

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
        let operation = operations[element.kind];
        if (operation) {
            if ("label" in element) {
                div.appendChild(createLabel(element.label, element.name));
            }
            div.appendChild(operation.func(operation.options, element));
        }
    }
    );
}


function createLabel(context, nameFor) {
    let element = document.createElement("label");
    element.setAttribute("for", nameFor);
    element.textContent = context;

    return element;
}

function createSelect(tagOptions, additionalOptions) {
    let elSelect = createInput(tagOptions, additionalOptions);

    if (additionalOptions.variants) {
        additionalOptions.variants.forEach(el => {
            let variant = elSelect.appendChild(document.createElement("option"));
            variant.setAttribute("value", el.value);
            variant.textContent = el.text;
            variant.selected = true;
        });
    }

    return elSelect;
}

function createRadio(tagOptions, additionalOptions) {
    let elRadio = document.createElement("div");
    tagOptions = tagOptions || {};
    additionalOptions = additionalOptions || {};

    if (additionalOptions.variants) {
        additionalOptions.variants.forEach(el => {
            let newEl = createInput(tagOptions, el);
            if (additionalOptions.name) newEl.setAttribute("name", additionalOptions.name);
            elRadio.appendChild(newEl);
            let variantName = elRadio.appendChild(document.createElement("span"));
            variantName.textContent = el.text;
        });
    }
    return elRadio;
}


function createInput(tagOptions, additionalOptions) {

    tagOptions = tagOptions || {};
    additionalOptions = additionalOptions || {};
    if (tagOptions.tag) {
        let element = document.createElement(tagOptions.tag);
        if (tagOptions.type) element.setAttribute("type", tagOptions.type);
        if (additionalOptions.kind) element.setAttribute("data-kind", additionalOptions.kind);
        if (additionalOptions.name) element.setAttribute("name", additionalOptions.name);
        if (additionalOptions.caption) element.setAttribute("value", additionalOptions.caption);
        if (additionalOptions.value) element.setAttribute("value", additionalOptions.value);
        if (tagOptions.type === "checkbox") {
            element.checked = true;
        }
        return element;
    }
    return undefined;
}

window.onload = showForm();