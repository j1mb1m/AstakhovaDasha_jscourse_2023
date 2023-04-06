"use strict";

function buildWrapper(tagName) {

    function convertToHTML(text){
        let textHTML = "";
        if (text) {
            textHTML = text.replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')                
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        }  
        return textHTML;
    }

    function wrapP(value, attributes) {

        let attributesStr = "";
        if (attributes) {
            for (let key in attributes) {
                attributesStr += ` ${key} = '${convertToHTML(attributes[key])}'`;
            }
        }

        return `<${tagName}${attributesStr}>${convertToHTML(value)}<${tagName}>`;
    }

    return wrapP;

}

function showTests(){
    var wrapP = buildWrapper("P");
    console.log(wrapP());
    console.log(wrapP("Однажды в студёную зимнюю пору"));
    console.log(wrapP("Однажды в студёную зимнюю пору", { lang: "ru" }));
    console.log(wrapP("Однажды в <студёную> зимнюю пору") );

    var wrapH1 = buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
    console.log(wrapH1("СТИХИ", { align: "center", title: "M&M's" }));  
}


// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", showTests, false);