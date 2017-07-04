import Coordinate from 'surrounding-coordinates';

function* nextCoordinate() {
    let x = 0;
    let y = 0;
    while (x < 2 || y < 2) {
        yield new Coordinate(x, y)
        yield new Coordinate(x, y+1)
        yield new Coordinate(x+1, y)
        x++
        y++
    }
    yield new Coordinate(x, y);
}

let gen = nextCoordinate();
let currentCoord = gen.next().value;
let coordinateArray = [];
while (currentCoord) {
    coordinateArray.push(currentCoord);
    currentCoord = gen.next().value;
}

console.log(coordinateArray);