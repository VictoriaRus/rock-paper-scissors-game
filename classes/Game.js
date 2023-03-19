import promptSync from "prompt-sync";

class Game {
    #tableService;

    constructor(tableService) {
        this.#tableService = tableService;
    }

    start(availableMoves, helpWord, exitWord, nameOne, nameTwo, minLengthArgs, hmacGenerator, gameLogic) {
        if (this.#checkEmpty(availableMoves) ||
            this.#checkParity(availableMoves) ||
            this.#checkUniquenessArgs(availableMoves) ||
            this.#checkLengthArgs(availableMoves, minLengthArgs)
        ) {
            return null;
        }

        const randomMoveFromComputer = this.#getRandomMoveFromComputer(availableMoves);

        const hmacFromComputerMove = hmacGenerator.createHMACFromText(randomMoveFromComputer);
        console.log(`HMAC (computerMove): ${hmacFromComputerMove}`);

        this.#printMenu(availableMoves, exitWord, helpWord);

        let userMove = this.#getMoveFromUser(availableMoves, helpWord, exitWord);
        console.log(`You move: ${userMove}`);

        if (userMove === exitWord) {
            return null;
        }

        while (true) {
            if (this.#isContainHelpPrintTable(availableMoves, randomMoveFromComputer, userMove, helpWord)
                && this.#IsContainElems(availableMoves, randomMoveFromComputer, userMove)
            ) {
                break;
            } else {
                this.#printMenu(availableMoves, exitWord, helpWord);
                userMove = this.#getMoveFromUser(availableMoves, helpWord, exitWord);
                console.log(`You move: ${userMove}`);
            }
        }
        console.log(`Computer move: ${randomMoveFromComputer}`);

        if (this.#elemsIsEqual(randomMoveFromComputer, userMove)) {
            console.log("Same moves - draw")
        } else {
            const winnerName = gameLogic
                .getWinnerName(nameOne, randomMoveFromComputer, nameTwo, userMove, availableMoves);

            console.log(`Winner: ${winnerName}`);
        }
        const securityKey = hmacGenerator.getSecurityKey();
        console.log("HMAC security key:")
        console.log(securityKey);
    }

    #getMoveFromUser(availableMoves, helpWord, exitWord) {
        const prompt = promptSync({});
        const index = prompt("Enter your move: ");
        if (index === helpWord) {
            return helpWord;
        }
        if (index === exitWord) {
            return null;
        }
        return availableMoves[Number(index - 1)];
    }

    #getRandomMoveFromComputer(availableMoves) {
        const min = 0;
        const max = availableMoves.length - 1;
        const randomIndex = Math.floor(Math.random() * (max - min) + min);
        return availableMoves[randomIndex]
    }

    #printMenu(availableMoves, exitWord, helpWord) {
        for (let i = 0; i < availableMoves.length; i++) {
            console.log(`${i + 1} - ${availableMoves[i]}`);
        }
        console.log(`${exitWord} - exit`);
        console.log(`${helpWord} - help`);
    }

    #checkUniquenessArgs(availableMoves) {
        const defaultLength = availableMoves.length;
        const lengthOnlyUniqueArgs = new Set(availableMoves).size;
        if (defaultLength !== lengthOnlyUniqueArgs) {
            console.log("Error message:");
            console.log("Args unique:");
            return true;
        }
        return false;
    }

    #checkLengthArgs(availableMoves, minimumLength) {
        if (availableMoves.length !== minimumLength && availableMoves.length <= 3) {
            console.log("Error message:");
            console.log("Args length less than " + minimumLength);
            return true
        }
        return false;
    }

    #checkParity(availableMoves) {
        if (availableMoves.length % 2 === 0) {
            console.log("Error message:");
            console.log("Even number of lines");
            return true;
        }
        return false;
    }

    #checkEmpty(availableMoves) {
        if (!availableMoves.length) {
            console.log("Error message:");
            console.log("It is empty");
            return true;
        }
        return false;
    }

    #elemsIsEqual(moveOne, moveTwo) {
        if (moveOne === moveTwo) {
            console.log("Error message:");
            console.log(`Two moves is equal, you must enter move another time`);
            return true;
        }
        return false;
    }

    #IsContainElems(availableMoves, moveOne, moveTwo) {
        if (
            availableMoves.includes(moveOne) && availableMoves.includes(moveTwo)
        ) {
            return true;
        }
        console.log("Error message:");
        console.log("Args is not contain moves");2
        return false;
    }

    #isContainHelpPrintTable(availableMoves, moveOne, moveTwo, helpWord) {
        if (moveOne === helpWord || moveTwo === helpWord) {
            this.#tableService.printTable(availableMoves);
            console.log();
            return false;
        }
        return true;
    }
}

export default Game;