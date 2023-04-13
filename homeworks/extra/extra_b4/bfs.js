"use strict";


class Dfs {
    #graph = ["ЛУЖА", "МУЗА", "ЛИРА", "МЕХА", "ЛИГА", "ТАРА", "ЛИПА", "ТУРА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];
    #search_queue = []; //очередь, куда будем помещать узлы для анализа
    #visited_nodes = []; //массив посещенных узлов
    #distances = {}; //для хранения расстояний, чтобы после поиска взять короткий путь
    #first_word = "";
    #last_word = "";

    constructor(first_word, last_word) {
        this.#first_word = first_word.toUpperCase();
        this.#last_word = last_word.toUpperCase();
        this.#run();
    }

    /* обход графа в ширину */
    #run() {
        this.#search_queue.push(this.#first_word); //заполняем очередь первым значением
        this.#distances[this.#first_word] = { distance: 0, parents: null }; //указываем его родителя и расстояние к нему

        while (this.#search_queue.length) { //обходим очередь, пока она не закончится
            let node = this.#search_queue.shift(); // берем первое помещенное значение в очередь для анализа
            if (!this.#visited_nodes.includes(node)) { //если мы не проходили узел, то проанализируем
                if (node === this.#last_word) {
                    break;
                }
                else {
                    this.#popNeighbors(node, this.#last_word); //добавляем в очередь соседей, т.к. не нашли нужный узел
                }
                this.#visited_nodes.push(node); //отмечаем, что узел посетили
            }
        }

    }

    #popNeighbors(node, search_value) {
        /* если есть совпадение с искомым значением, то берем его */
        if (this.isSimilarWord(node, search_value)) {
            this.#search_queue.push(search_value);
            this.#distances[search_value] = {
                distance: this.#distances[node].distance += 1,
                parents: node
            };
        }
        /* нет совпадения с исходным значением, поэтому смотрим соседние узлы */
        else {
            this.#graph.forEach(x => {
                if (!this.#visited_nodes.includes(x) && !this.#search_queue.includes(x) && this.isSimilarWord(x, node)) {
                    /* если нашли похожие узлы, то ставим в очередь, считаем расстояние и отмечаем родителя */
                    this.#search_queue.push(x);
                    this.#distances[x] = {
                        distance: this.#distances[node].distance += 1,
                        parents: node
                    };
                }
            });
        }

    }

    isSimilarWord(word1, word2) {

        if (word1.length != word2.length) return false;

        let summ = Array.from(word1).reduce((acc, ch, index) => acc += (ch != word2[index]), 0);
        if (summ === 1) return true; //должна отличаться только одна буква

        return false;
    }

    find() {
        /* печатаем цепочку прохода к узлу.  */
        if (this.#last_word in this.#distances) {
            let result = this.#last_word;
            let node = this.#last_word;
            while (this.#distances[node].parents) {
                node = this.#distances[node].parents;
                result = node + "-" + result;
            }

            return result;
        }
        else return "Not found!";
    }

}

function doTest() {

    let setTests = [
        { first: "МУХА", last: "СЛОН", answer: "МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН" },
        { first: "ЛИСА", last: "ЛОСЬ", answer: "ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ" },
        { first: "МУХА", last: "КРОТ", answer: "Not found!" },
        { first: "МУХА", last: "ПАРА", answer: "МУХА-МУРА-ТУРА-ТАРА-ПАРА" }
    ];


    for (let iterator of setTests) {
        let answer = new Dfs(iterator.first, iterator.last).find();
        console.log(`${iterator.first} -> ${iterator.last} : ${answer} ${answer === iterator.answer}`);
    }
}


function enterTheFormula() {
    let strFirst = prompt("Enter fist word:", "муха");
    let strLast = prompt("Enter last word:", "слон");

    alert(new Dfs(strFirst, strLast).find());
}

// Add event listener
const el = document.getElementById("check");
el.addEventListener("click", doTest, false);

// Add event listener
const elEnter = document.getElementById("enter");
elEnter.addEventListener("click", enterTheFormula, false);