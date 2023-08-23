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

  #numOfShortestMovesToUseMax = 4;

  #calcEuclideanDist(startingCoord, targetCoord) {
    //calculates the distance of a given coordinate to the target coordinate
    //by using the euclidean distance by finding the hypoteneus of the triangle created
    //by the coordinates
    const xDiff = startingCoord[0] - targetCoord[0],
      yDiff = startingCoord[1] - targetCoord[1];

    return Math.sqrt(yDiff ** 2 + xDiff ** 2);
  }

  #findValidMoveCoords(startingCoord) {
    //finds valid coords by iterating over the valid move set
    //and then checking if each coordinate created falls within the established
    //board size bounds. If such does, add it as a valid move coordinate
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
    //takes the possible move coordinates, and an array of the corresponding distances each coordinate
    //is from the target with matching indices, bind the corresponding elements, and use the binded coordinates
    //to their distances in order to sort the coordinates themselves from shortest to longest distance from the
    //target. Return the four shortest coordinates to be used in the node processing
    const bindedCoordsArr = [];

    for (let i = 0; i < possibleCoords.length; i++) {
      const newPair = [corresDists[i], possibleCoords[i]];

      bindedCoordsArr.push(newPair);
    }

    const sortedBindedCoords = this.#mergeSort(bindedCoordsArr),
      fourShortestMoves = [];

    for (let i = 0; i < this.#numOfShortestMovesToUseMax; i++) {
      //just in case there are less than 4 sorted coords
      if (sortedBindedCoords[i]) {
        fourShortestMoves.push(sortedBindedCoords[i][1]);
      }
    }

    return fourShortestMoves;
  }

  #mergeSort(bindedCoordsArr) {
    //used to sort the coords by distance from the target
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
          returnedLeftSide[i][0] <= returnedRightSide[j][0] ||
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

  #shortestAmountOfMoves = -1;

  #shortestFoundPaths = [];

  #initQueue(startCoord) {
    const nodeQueue = [],
      startingNode = new TraversalNode(startCoord);

    nodeQueue.push(startingNode);

    return nodeQueue;
  }

  #findShortestValidMoves(startingCoord, finishCoord) {
    const validMoveCoords = this.#findValidMoveCoords(startingCoord),
      corresDists = validMoveCoords.map((coord) => {
        return this.#calcEuclideanDist(coord, finishCoord);
      }),
      fourShortestMoves = this.#pickFourShortestMoves(
        validMoveCoords,
        corresDists
      );

    return fourShortestMoves;
  }

  #checkNode(node, finishCoord) {
    if (
      node.currentCoord[0] === finishCoord[0] &&
      node.currentCoord[1] === finishCoord[1]
    ) {

    } else if (
      node.path.length <= this.#shortestAmountOfMoves ||
      this.#shortestAmountOfMoves === -1
    ) {
        
    } else {
      return [];
    }
  }

  #updateNode(node, possibleCoord) {
    node.update(possibleCoord);
  }

  #splitNode(parentNode, possibleCoord) {
    const newSplitNode = parentNode.split(possibleCoord);

    return newSplitNode;
  }

  findShortestPath(startCoord, finishCoord) {
    const nodeQueue = this.#initQueue(startCoord);

    while (nodeQueue.length > 0) {
      const frontOfQueueNode = nodeQueue.shift();

      //if the node already exceeds the shortest amount of moves, no point in processing it further
      if (frontOfQueueNode.path.length < this.#shortestAmountOfMoves) {
        //should either return new possible coords in an array, or an empty array when there aren't any possible moves any more
        //or if the front of queue node reached the finish destination
        const possibleCoords = this.#checkNode(frontOfQueueNode, finishCoord);

        for (let i = 0; i < possibleCoords.length; i++) {
          if (i === 0) {
            //update the parent node using the shortest next move
            this.#updateNode(frontOfQueueNode, possibleCoords[i]);
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
