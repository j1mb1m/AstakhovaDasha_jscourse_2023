'use strict';

class Menu {

    constructor() {
    }

    createMenu(data) {

        let menu = document.createElement("ul");
        menu.classList.add('menu');
        this.#createElements(menu, data);

        return menu;
    }

    #createElements(root, args) {
        for (const iterator of args) {
            if ("submenu" in iterator) {
                let li = root.appendChild(document.createElement("li"));

                let span = li.appendChild(document.createElement("span"));
                span.innerText = iterator.name;

                let icon = li.appendChild(document.createElement("i"));
                icon.classList.add('fa-chevron-down');

                let submenu = li.appendChild(document.createElement("ul"));
                submenu.classList.add("submenu");

                this.#createElements(submenu, iterator.submenu);
            }
            else {
                let link = root.appendChild(document.createElement("li"));
                let el;
                if ("url" in iterator) {
                    el = link.appendChild(document.createElement("a"));
                    el.setAttribute('href', iterator.url);
                }
                else {
                    el = link.appendChild(document.createElement("span"));
                }
                el.innerText = iterator.name;
            }
        }
    }

}