/**
 * Sorted contiguous bodies of water.
 *
 * Given a 2d matrix with values marked as having water (with a 1)
 *
 * Return a list of the coordinates of the bodies of water that exist in the matrix, sorted from smallest to largest.
 *
 * Algorithm in words:
 * Start in top left corner (0, 0)
 *
 * If the square does not have water, move on to the next square in the matrix
 * If the square has water, start exploration algorithm:
 *   - explore:
 *      - Returns an array of the coordinates of the matrix that are contiguous
 *      - Contiguous means that it is connected to the square either up, down, right, left, or diagonally
 *          - probably need a function that will return these coordinates surrounding the current square, to use for exploration.
 *      - 1) push current square's coordinates to the return array (called explored)
 *      - 2) mark the current square as empty (prevents unnecessary work in the future).
 *      - 3) initiate exploration of surrounding squares for other water.
 *              - push any squares with water from this exploration to another array called (yetToBeExplored )
 *              - if a square's value is in either the yetToBeExplored array, or the explored array, do not push to yetToBeExplored.
 *      - 4) call the function recursively on the first square pused to the exploration array (the first square with water)
 *          - the process repeats until all
 *      - once yetToBeExplored is empty, return the explored array to the caller.
 *
 * Push the returned Array from explore to a "bodiesOfWater" array. Continue to the next square.
 *
 * Once all squares in the matrix have been visited, sort bodiesOfWater by their length (ascending) and return.
 */

const matrix = [
    [1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

const prettyPrintMatrix = (matrix) => {
    matrix.forEach((row) => {
        console.log(row);
    });
}

function Coordinate (x, y) {
    this.x = x;
    this.y = y;
    this.equals = function (other) {
        return this.x === other.x && this.y === other.y;
    }
}

Coordinate.prototype.toString = function () {
    return `Coordinate { x: ${this.x} y: ${this.y} }`
}

/**
 * @function findSurroundingCoordinates - returns array of valid coordinates surrounding the given coordinate
 * @param {Coordinate} center
 * @param {integer} matrixLen
 * @return {Array<Coordinate>}
 */
Coordinate.prototype.findSurroundingCoordinates = function (center, matrixLen) {
    const surroundingCoordinates = [
        new Coordinate(center.x - 1, center.y - 1),
        new Coordinate(center.x, center.y - 1),
        new Coordinate(center.x + 1, center.y - 1),
        new Coordinate(center.x - 1, center.y),
        new Coordinate(center.x + 1, center.y),
        new Coordinate(center.x - 1, center.y + 1),
        new Coordinate(center.x, center.y + 1),
        new Coordinate(center.x + 1, center.y + 1)
    ];

    return surroundingCoordinates.filter((item) => {
        if (item.x >= 0 && item.y >= 0 && item.x < matrixLen && item.y < matrixLen) {
            return item;
        }
    });
}


const findContiguousBodies = (matrix) => {
    const bodiesOfWater = [];
    matrix.forEach((row, x) => {
        row.forEach((squareValue, y) => {
            if (squareValue) {
                const explored = [];
                const needToExplore = [new Coordinate(x, y)];

                const explore = (currentSquare) => {
                    explored.push(currentSquare);
                    matrix[currentSquare.x][currentSquare.y] = '';

                    // returns coordinates that have water
                    const exploreSurrounding = (coord) => {
                        const surrounding = Coordinate.prototype.findSurroundingCoordinates(coord, matrix.length);
                        surrounding.forEach((coord) => {
                            if (matrix[coord.x][coord.y]) {

                                const isAlreadyQueued = needToExplore.reduce((acc, item) => {
                                    return acc || item.equals(coord);
                                }, false)

                                if (!isAlreadyQueued) {
                                    needToExplore.push(coord);
                                }
                            }
                        });
                    }

                    exploreSurrounding(currentSquare);
                }

                while (needToExplore.length) {
                    explore(needToExplore.pop());
                }

                bodiesOfWater.push(explored);
                prettyPrintMatrix(matrix);
            }
        });
    });
    return bodiesOfWater.sort((a, b) => a.length > b.length);
}


// Tests for findSurroundingCoordinates
// console.log(Coordinate.prototype.findSurroundingCoordinates(new Coordinate(0, 0), matrix.length));
// console.log(Coordinate.prototype.findSurroundingCoordinates(new Coordinate(2, 2), matrix.length));
console.log(findContiguousBodies(matrix).map(String));

console.log(new Coordinate(0,0).toString());