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

  split(possibleCoord) {
    const newNode = new TraversalNode(possibleCoord);
    newNode.path = this.path.slice();

    return newNode;
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
    const xDiff = startingCoord[0] - targetCoord[0],
      yDiff = startingCoord[1] - targetCoord[1];

    return Math.sqrt(yDiff ** 2 + xDiff ** 2);
  }

  #findValidMoveCoords(startingCoord) {
    const validMoveCoords = [],
      { x, y } = this.#validMoves;

    for (let i = 0; i < x.length; i++) {
      const xDiff = startingCoord[0] + x[i],
        yDiff = startingCoord[1] + y[i];

      if (
        xDiff >= this.#boardSize.x[0] &&
        xDiff <= this.#boardSize.x[1] &&
        yDiff >= this.#boardSize.y[0] &&
        yDiff <= this.#boardSize.y[1]
      ) {
        const newValidMoveCoord = [xDiff, yDiff];

        validMoveCoords.push(newValidMoveCoord);
      }
    }

    return validMoveCoords;
  }

  #pickFourShortestMoves(possibleCoords, corresDists) {
    const bindedCoordsArr = [];

    for (let i = 0; i < possibleCoords.length; i++) {
      const newPair = [corresDists[i], possibleCoords[i]];

      bindedCoordsArr.push(newPair);
    }

    const sortedBindedCoords = this.#mergeSort(bindedCoordsArr),
      fourShortestMoves = [];

    for (let i = 0; i < 4; i++) {
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

  #initQueue(startCoord) {}

  #findShortestValidMoves(startingCoord) {}

  #checkNode(node, finishCoord) {}

  #updateNode(node) {}

  #splitNode(parentNode, possibleCoord) {}

  findShortestPath(startCoord, finishCoord) {
    const nodeQueue = this.#initQueue(startCoord);

    while (nodeQueue.length > 0) {
      const frontOfQueueNode = nodeQueue.shift();

      //if the node already exceeds the shortest amount of moves, no point in processing it further
      if (frontOfQueueNode.path.length < this.#shortestAmountOfMoves) {
        possibleCoords = this.#checkNode(frontOfQueueNode, finishCoord);

        for (let i = 0; i < possibleCoords.length; i++) {
          if (i === 0) {
            //update the parent node using the shortest next move
            this.#updateNode(frontOfQueueNode);
            nodeQueue.push(frontOfQueueNode);
          } else {
            //make new nodes that split from the parent node, copying the path information
            //but choosing the next shortest coords as the next new position
            const newNode = this.#splitNode(
              frontOfQueueNode,
              possibleCoords[i]
            );
            nodeQueue.push(newNode);
          }
        }
      }
      
    }
  }
}
