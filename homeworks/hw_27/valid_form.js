"use strict";

const userForm = document.forms.info;
userForm.addEventListener('submit', validateForm, false);

const validateRules = {
    developers: function (target) {
        return (/[0-9]/g.test(target.value) || !target.value.trim())
    },
    sitename: function (target) {
        return (/^[0-9]|[а-яА-Я]/g.test(target.value) || !target.value.trim())
    },
    siteurl: function (target) {
        const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return (!urlPattern.test(target.value) || !target.value.trim())
    },
    launchdate: function (target) {
        return (target.value =='' || new Date(target.value) >= new Date());
    },
    visitors: function (target) {
        const numberPattern = /^\d+$/;
        return !numberPattern.test(target.value);
    },
    email: function (target) {
        const numberEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        return (!numberEmail.test(target.value) || !target.value.trim());
    },
    division: function (target) {
        return (target.value == '1');
    },
    payment: function (target) {
        const radiobtns = document.getElementsByName(target.name);
        let checkedValue = '-1';
        for (const iterator of radiobtns){
            if (iterator.checked) checkedValue = iterator.value;
        }
        return (checkedValue == '1' || checkedValue == '-1');
    },
    votes: function (target) {
        return !target.checked;
    },
    description: function (target) {
        return !target.value.trim();
    },

};

function validateForm(e) {
    e = e || window.event;

    let hasErrors = false;
    for (const iterator of userForm.elements) {
        if ((iterator.name in validateRules) && validateRules[iterator.name](iterator)) {
            if (iterator.type === 'radio' && !iterator.parentNode.classList.contains('invalid')) {
                iterator.parentNode.classList.add('invalid');
            }
            else {
                iterator.classList.add('invalid');
            }
            if (!hasErrors) {
                iterator.scrollIntoView();
                iterator.focus();
            }
            hasErrors = true;
        }
    }

    if (hasErrors) {
        e.preventDefault();
        return;
    }

}

function validateInpute(e) {
    e = e || window.event;
    let target = e.target;

    switch (e.type) {
        case 'focus': removeClassInvalid(target);
            break;
        case 'blur':
            if ((target.name in validateRules) && validateRules[target.name](target)) target.classList.add('invalid');
            break;
        case 'change':
            if ((target.name in validateRules) && validateRules[target.name](target)) {
                if (target.type == 'radio')
                    target.parentNode.classList.add('invalid');
                else
                    target.classList.add('invalid');
            }
            else
                removeClassInvalid(target);
            break;
        default: break;
    }

}
function removeClassInvalid(target) {
    if (target.type == 'radio') removeClassInvalid(target.parentNode);

    if (target.classList.contains('invalid'))
        target.classList.remove('invalid');
}

for (const iterator of userForm.elements) {
    if (iterator.type === "checkbox" || iterator.type === "radio") {
        iterator.addEventListener('change', validateInpute, false);
    }
    else if (iterator.type !== "submit") {
        iterator.addEventListener('blur', validateInpute, false);
        iterator.addEventListener('focus', validateInpute, false);
    }
}
