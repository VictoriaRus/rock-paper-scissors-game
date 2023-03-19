class TableService {
    printTable(availableMoves) {
        const arrayTable = this.#createArrayTable(availableMoves);
        console.table(arrayTable)
    }

    #createArrayTable(array) {
        let arrayWithDraws = this.#addDrawsToArray(array, "Draw");
        let arrayWithWins = this.#addWinsToArray(arrayWithDraws, "Win", "Draw");
        const result = this.#addLoseToArray(arrayWithWins, "Lose");
        return result;
    }

    #addDrawsToArray(defaultArray, drawWord) {
        let result = [];
        for (let i = 0; i <= defaultArray.length; i++) {
            if (i === 0) {
                result.push([' ']);
                result[i].push(...defaultArray);
            } else {
                result.push(new Array(defaultArray.length + 1));
                result[i][0] = defaultArray[i - 1];
                result [i][i] = drawWord;
            }
        }
        return result;
    }

    #addWinsToArray(defaultArray, winWord, drawWord) {
        let array = [...defaultArray];
        const half = Math.floor(array.length / 2 - 1);
        for (const innerArray of array) {
            for (let i = 0; i < innerArray.length; i++) {
                if (innerArray[i] === drawWord) {
                    let count = i;
                    for (let j = 0; j < half; j++) {
                        if (count + 1 >= innerArray.length) {
                            count = 0;
                        }
                        innerArray[count + 1] = winWord
                        count += 1;
                    }
                }
            }
        }
        return array;
    }

    #addLoseToArray(defaultArray, loseWord) {
        let array = [...defaultArray];
        const half = Math.floor(array.length / 2 - 1);
        for (const innerArray of array) {
            for (let i = 0; i < innerArray.length; i++) {
                if (!innerArray[i]) {
                    innerArray[i] = loseWord
                }
            }
        }
        return array;
    }
}

export default TableService;