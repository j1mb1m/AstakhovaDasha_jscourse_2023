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
        return (!!(new Date(target.value)) || new Date(target.value) >= new Date());
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
        return (target.value == '3');
    },
    payment: function (target) {
        return (target.value !== '2' && target.value !== '3');
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
            if (iterator.type === 'radio') {
                iterator.parentNode.classList.add('invalid');
            }
            else {
                iterator.classList.add('invalid');
            }
            if (!hasErrors){
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
    let target = e.target;

    switch (e.type) {
        case 'focus': if (target.classList.contains('invalid'))
            target.classList.remove('invalid');
            break;
        case 'blur':
            if ((target.name in validateRules) && validateRules[target.name](target)) target.classList.add('invalid');
            break;
        case 'change':
            if ((target.name in validateRules) && validateRules[target.name](target)) target.classList.add('invalid');
            break;
        default: break;
    }

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
