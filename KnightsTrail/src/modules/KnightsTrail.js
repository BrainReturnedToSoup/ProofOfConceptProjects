class TraversalNode {
  constructor(currentCoord) {
    this.currentCoord = currentCoord;
    this.path = [];
  }

  update(newCoord) {
    const temp = this.currentCoord;

    this.currentCoord = newCoord;
    this.path.push(temp);
  }

  split(possibleCoords) {
    const splitNodes = [];

    for (let i = 1; i < possibleCoords.length; i++) {
      const newNode = new TraversalNode(possibleCoords[i]);

      newNode.path = this.path.slice();
      splitNodes.push(newNode);
    }

    return splitNodes;
  }
}

class KnightsTrail {
  #validMoves = {
    x: [-2, -2, -1, -1, 1, 1, 2, 2],
    y: [1, -1, 2, -2, 2, -2, 1, -1],
  };

  #boardSize = {
    x: [0, 7],
    y: [0, 7],
  };

  #calcEuclideanDist(startingCoord, targetCoord) {
    const xDif = startingCoord[0] - targetCoord[0],
    yDif = startingCoord[1] - targetCoord[1];

    return Math.sqrt(yDif**2 - xDif**2);
  }

  #findValidMoveCoords(startingCoord) {
    const validMoveCoords = [],
    { x, y } = this.#validMoves;

    for(let i = 0; i < x.length; i++) {
        
    }

  }

  #pickFourShortestMoves(possibleCoords, corresDists) {
    const bindedCoordsArr = [];

    for(let i = 0; i < possibleCoords.length; i++) {
        const newPair = Array.from(corresDists[i], possibleCoords[i]);

        bindedCoordsArr.push(newPair);
    }

    const sortedBindedCoords = this.#mergeSort(bindedCoordsArr),
    fourShortestMoves = [];

    for(let i = 0; i < 4; i++) {
        fourShortestMoves.push(sortedBindedCoords[i][1]);
    }

    return fourShortestMoves;
  }

  #mergeSort(bindedCoordsArr) {
    if (bindedCoordsArr.length <= 1) {
      return bindedCoordsArr;
    } else {
      const newSortedArr = [],
        middle = Math.floor(bindedCoordsArr.length / 2),
        leftSide = bindedCoordsArr.slice(0, middle),
        rightSide = bindedCoordsArr.slice(middle, bindedCoordsArr.length);

      const returnedLeftSide = this.#mergeSort(leftSide),
        returnedRightSide = this.#mergeSort(rightSide);

      let i = 0,
        j = 0;

      while (i + j < bindedCoordsArr.length) {
        if (
          returnedLeftSide[i] <= returnedRightSide[j] ||
          j === returnedRightSide.length
        ) {
            newSortedArr.push(returnedLeftSide[i]);
            i++;
        } else {
            newSortedArr.push(returnedRightSide[j]);
            j++;
        }
      }

      return newSortedArr;
    }
  }

  #shortestAmountOfMoves = null;

  #shortestFoundPaths = [];

  findShortestPath(startCoord, finishCoord) {}
}
