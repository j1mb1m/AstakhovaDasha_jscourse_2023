'use strict';

const sample = [
  {
    name: 'Пункт 1', submenu:
      [
        {
          name: 'Пункт 1.1', submenu:
            [
              { name: 'Пункт 1.1.1', url: 'http://www.onliner.by' },
              { name: 'Пункт 1.1.2 длинный', url: 'http://www.onliner.by' }
            ]
        },
        { name: 'Пункт 1.2', url: 'http://www.onliner.by' },
        {
          name: 'Пункт 1.3 длинный', submenu:
            [
              { name: 'Пункт 1.3.1', url: 'http://www.onliner.by' },
              { name: 'Пункт 1.3.2', url: 'http://www.onliner.by' },
              { name: 'Пункт 1.3.3', url: 'http://www.onliner.by' },
              { name: 'Пункт 1.3.4 длинный', url: 'http://www.onliner.by' }
            ]
        }
      ]
  },
  { name: 'Пункт 2 длинный', url: 'http://www.tut.by' },
  {
    name: 'Пункт 3', submenu:
      [
        { name: 'Пункт 3.1 длинный', url: 'http://www.onliner.by' },
        { name: 'Пункт 3.2', url: 'http://www.onliner.by' }
      ]
  }
];

function createForm() {
  let menu = new Menu();
  document.body.insertBefore(menu.createMenu(sample), document.body.firstElementChild);
}

window.onload = createForm(); 
