"use strict";

const graph = ["ЛУЖА", "МУЗА", "ЛИРА", "МЕХА", "ЛИГА", "ТАРА", "ЛИПА", "ТУРА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];
let search_queue = []; //очередь, куда будем помещать узлы для анализа
let visited_nodes = []; //массив посещенных узлов
let distances = {}; //для хранения расстояний, чтобы после поиска взять короткий путь

/* обход графа в ширину */
function dfs(start, search_value) {
    start = start.toUpperCase();
    search_value = search_value.toUpperCase();
    
    // очищаем значения
    search_queue = [];
    visited_nodes = [];
    distances = {};

    search_queue.push(start); //заполняем очередь первым значением
    distances[start] = { distance: 0, parents: null }; //указываем его родителя и расстояние к нему

    while (search_queue.length) { //обходим очередь, пока она не закончится
        let node = search_queue.shift(); // берем первое помещенное значение в очередь для анализа
        if (!visited_nodes.includes(node)) { //если мы не проходили узел, то проанализируем
            if (node == search_value) {
                break;
            }
            else {
                popNeighbors(node, search_value); //добавляем в очередь соседей, т.к. не нашли нужный узел
            }
            visited_nodes.push(node); //отмечаем, что узел посетили
        }
    }

    /* печатаем цепочку прохода к узлу.  */
    if (search_value in distances) {
        let result = search_value;
        let node = search_value;
        while (distances[node].parents) {
            node = distances[node].parents;
            result = node + "-" + result;
        }

        return result;
    }
    else return "Not found!";

}

function popNeighbors(node, search_value) {
    /* если есть совпадение с искомым значением, то берем его */
    if (similarWord(node, search_value)) {
        search_queue.push(search_value);
        distances[search_value] = {
            distance: distances[node].distance += 1,
            parents: node
        };
    }
    /* нет совпадения с исходным значением, поэтому смотрим соседние узлы */
    else {
        graph.forEach(x => {
            if (!visited_nodes.includes(x) && !search_queue.includes(x) && similarWord(x, node)) {
                /* если нашли похожие узлы, то ставим в очередь, считаем расстояние и отмечаем родителя */
                search_queue.push(x);
                distances[x] = {
                    distance: distances[node].distance += 1,
                    parents: node
                };
            }
        });
    }

}

function similarWord(word1, word2) {

    if (word1.length != word2.length) return false;

    let summ = Array.from(word1).reduce((acc, ch, index) => acc += (ch != word2[index]), 0);
    if (summ === 1) return true; //должна отличаться только одна буква

    return false;
}

function doTest() {

    let setTests = [
        { first: "МУХА", last: "СЛОН", answer: "МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН" },
        { first: "ЛИСА", last: "ЛОСЬ", answer: "ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ" },
        { first: "МУХА", last: "КРОТ", answer: "Not found!" },
        { first: "МУХА", last: "ПАРА", answer: "МУХА-МУРА-ТУРА-ТАРА-ПАРА" }
    ];


    for (let iterator of setTests) {
        let answer = dfs(iterator.first, iterator.last);
        console.log(`${iterator.first} -> ${iterator.last} : ${answer} ${answer === iterator.answer}`);
    }
}


function enterTheFormula() {
    let strFirst = prompt("Enter fist word:", "муха");
    let strLast = prompt("Enter last word:", "слон");

    alert(dfs(strFirst, strLast));
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", doTest, false);

// Add event listener
const elEnter = document.getElementById("enter");
elEnter.addEventListener("click", enterTheFormula, false);