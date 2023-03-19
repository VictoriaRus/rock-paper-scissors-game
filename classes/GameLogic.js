class GameLogic {
    getWinnerName(nameOne, moveOne, nameTwo, moveTwo, movementList) {
        const winnerMove = this.#getWinnerMove(moveOne, moveTwo, movementList);

        if (winnerMove === moveOne) {
            return nameOne;
        } else if (winnerMove === moveTwo) {
            return nameTwo;
        } else {
            return null;
        }
    }

    #getWinnerMove(moveOne, moveTwo, movementList) {
        let winnerMove = null;

        let indexElemOne = movementList.indexOf(moveOne);
        let indexElemTwo = movementList.indexOf(moveTwo);
        const halfLength = Math.floor(movementList.length / 2);

        for (let i = 1; i <= halfLength; i++) {
            if ((indexElemOne + 1) >= movementList.length) {
                indexElemOne = 0;
            } else {
                indexElemOne += 1;
            }

            if ((indexElemTwo + 1) >= movementList.length) {
                indexElemTwo = 0;
            } else {
                indexElemTwo += 1;
            }

            if (moveTwo === movementList[indexElemOne]) {
                winnerMove = moveOne;
            }

            if (moveOne === movementList[indexElemTwo]) {
                winnerMove = moveTwo;
            }

        }
        return winnerMove;
    }
}

export default GameLogic;