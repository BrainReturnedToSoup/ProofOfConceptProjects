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

  #numOfShortestMovesToUseMax = 3;

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

  #pickFourOrLessShortestMoves(possibleCoords, corresDists) {
    //takes the possible move coordinates, and an array of the corresponding distances each coordinate
    //is from the target with matching indices, bind the corresponding elements, and use the binded coordinates
    //to their distances in order to sort the coordinates themselves from shortest to longest distance from the
    //target. Return the four shortest coordinates to be used in the node processing
    const bindedCoordsArr = [];

    for (let i = 0; i < possibleCoords.length; i++) {
      const newPair = {
        dist: corresDists[i],
        coord: possibleCoords[i],
      };

      bindedCoordsArr.push(newPair);
    }

    const sortedBindedCoords = this.#selectionSort(bindedCoordsArr),
      shortestMoves = [];

    for (let i = 0; i < this.#numOfShortestMovesToUseMax; i++) {
      //just in case there are less than 4 sorted coords
      if (sortedBindedCoords[i]) {
        shortestMoves.push(sortedBindedCoords[i].coord);
      }
    }

    return shortestMoves;
  }

  #selectionSort(bindedCoordsArr) {
    const n = bindedCoordsArr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (bindedCoordsArr[j].dist < bindedCoordsArr[minIndex].dist) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        const temp = bindedCoordsArr[i];
        bindedCoordsArr[i] = bindedCoordsArr[minIndex];
        bindedCoordsArr[minIndex] = temp;
      }
    }

    return bindedCoordsArr;
  }

  #shortestAmountOfMoves = -1;

  #shortestFoundPaths = null;

  #foundAValidPath(node) {
    //create the complete path and measure it to see if it
    //is either shorter than the established shortest amount of moves
    //or the first found valid path
    const completeFinalPath = node.path;
    completeFinalPath.push(node.currentCoord);

    if (
      completeFinalPath.length < this.#shortestAmountOfMoves ||
      this.#shortestAmountOfMoves === -1
    ) {
      this.#shortestFoundPaths = [];
      this.#shortestAmountOfMoves = completeFinalPath.length - 1;
      this.#shortestFoundPaths.push(completeFinalPath);
    } else {
      this.#shortestFoundPaths.push(completeFinalPath);
    }
  }

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
      shortestMoves = this.#pickFourOrLessShortestMoves(
        validMoveCoords,
        corresDists
      );

    return shortestMoves;
  }

  #checkNode(node, finishCoord) {
    if (
      node.currentCoord[0] === finishCoord[0] &&
      node.currentCoord[1] === finishCoord[1]
    ) {
      this.#foundAValidPath(node);
      return [];
    } else if (
      node.path.length < this.#shortestAmountOfMoves ||
      this.#shortestAmountOfMoves === -1
    ) {
      //should return an array filled with the best possible moves
      return this.#findShortestValidMoves(node.currentCoord, finishCoord);
    } else {
      return [];
    }
  }

  #updateNode(node, possibleCoord) {
    //updates the coord, adds the new coord as the current coord,
    //and puts the last current coord in the path
    node.update(possibleCoord);
  }

  #splitNode(parentNode, possibleCoord) {
    //clones the parent node, and defines the new current coord that may
    //be different than the parent node's current coord
    const newSplitNode = parentNode.split(possibleCoord);

    return newSplitNode;
  }

  findShortestPath(startCoord, finishCoord) {
    const nodeQueue = this.#initQueue(startCoord);

    while (nodeQueue.length > 0) {
      const frontOfQueueNode = nodeQueue.shift();

      //if the node already exceeds the shortest amount of moves, no point in processing it further
      if (
        frontOfQueueNode.path.length < this.#shortestAmountOfMoves ||
        this.#shortestAmountOfMoves === -1
      ) {
        //should either return new possible coords in an array, or an empty array when there aren't any possible moves any more
        //or if the front of queue node reached the finish destination
        const possibleBestCoords = this.#checkNode(
          frontOfQueueNode,
          finishCoord
        );

        for (let i = 0; i < possibleBestCoords.length; i++) {
          if (i === 0) {
            //update the parent node using the shortest next move
            this.#updateNode(frontOfQueueNode, possibleBestCoords[i]);
            nodeQueue.push(frontOfQueueNode);
          } else {
            //make new nodes that split from the parent node, copying the path information
            //but choosing the next shortest coords as the next new position
            const newNode = this.#splitNode(
              frontOfQueueNode,
              possibleBestCoords[i]
            );
            nodeQueue.push(newNode);
          }
        }
      }
    }

    console.log(this.#shortestFoundPaths);

    return this.#shortestAmountOfMoves;
  }
}

module.exports = KnightsTrail;
