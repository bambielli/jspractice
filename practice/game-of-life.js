/**
 * Game of life rules:
    1. If a live cell in the grid is bordered by fewer than 2 neighbors, it dies in next generation (underpopulation)
    2. If a live cell in the grid is bordered by 2 or 3 neighbors, it lives to the next generation
    3. If a live cell is bordered by more than 3 neighbors, it dies (overpopulation)
    4. If a dead cell is bordered by exactly 3 neighbors, it becomes a live cell (reproduction)

    Initial pattern constitutes the “seed” of the system. Generation next is created by applying the above rules simultaneously to every cell in the seed to come up with the next generation.
    In other words, the order of calculation of cells for a new generation cannot effect whether a cell lives or dies for the gen++ calculation.

    My initial thoughts for how to model this game:

    The grid can be modeled like a coordinate system, each square representing a single coordinate.
    Class Coordinate(x, y, isAlive) <-- I think livingNeighbors will be calculated on demand.

    Need some method for returning the list of valid neighbors for a coordinate. My coordinate package does this already!

    Shouldn't pre-compute all possible generations... we should use some sort of generator-like functionality
    that we can request the .next() generation from. Generator can store the current generation, produce the next one,
    and overwrite the previous one.
 */

import Coordinate from 'surrounding-coordinates';

