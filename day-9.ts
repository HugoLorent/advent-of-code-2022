const moveTail = (headCoords: number[], tailCoords: number[]) => {
  const xDiff = headCoords[0] - tailCoords[0];
  const yDiff = headCoords[1] - tailCoords[1];

  if (xDiff === 0 && yDiff === 2) {
    // UP MOVE
    tailCoords[1] += 1;
    return;
  } else if ((xDiff === 1 && yDiff === 2) || (xDiff === 2 && yDiff === 1)) {
    // RIGHT UP MOVE
    tailCoords[0] += 1;
    tailCoords[1] += 1;
    return;
  } else if (xDiff === 2 && yDiff === 0) {
    // RIGHT MOVE
    tailCoords[0] += 1;
    return;
  } else if ((xDiff === 2 && yDiff === -1) || (xDiff === 1 && yDiff === -2)) {
    // RIGHT DOWN MOVE
    tailCoords[0] += 1;
    tailCoords[1] -= 1;
    return;
  } else if (xDiff === 0 && yDiff === -2) {
    // DOWN  MOVE
    tailCoords[1] -= 1;
    return;
  } else if ((xDiff === -1 && yDiff === -2) || (xDiff === -2 && yDiff === -1)) {
    // LEFT DOWN MOVE
    tailCoords[0] -= 1;
    tailCoords[1] -= 1;
    return;
  } else if (xDiff === -2 && yDiff === 0) {
    // LEFT MOVE
    tailCoords[0] -= 1;
    return;
  } else if ((xDiff === -2 && yDiff === 1) || (xDiff === -1 && yDiff === 2)) {
    // LEFT UP MOVE
    tailCoords[0] -= 1;
    tailCoords[1] += 1;
    return;
  }
};

const verifyTailCoords = (
  tailCoords: number[],
  tailCoordsPositions: Set<string>
) => {
  const tailCoordsAsString = `${tailCoords[0]}-${tailCoords[1]}`;
  tailCoordsPositions.add(tailCoordsAsString);
};

const moveRope = (
  move: string,
  headCoords: number[],
  tailCoords: number[],
  tailCoordsPositions: Set<string>
) => {
  const direction = move[0];
  let steps = parseInt(move[2]);

  if (direction === 'U') {
    while (steps > 0) {
      headCoords[1] += 1;
      moveTail(headCoords, tailCoords);
      verifyTailCoords(tailCoords, tailCoordsPositions);
      steps -= 1;
    }
  } else if (direction === 'R') {
    while (steps > 0) {
      headCoords[0] += 1;
      moveTail(headCoords, tailCoords);
      verifyTailCoords(tailCoords, tailCoordsPositions);
      steps -= 1;
    }
  } else if (direction === 'D') {
    while (steps > 0) {
      headCoords[1] -= 1;
      moveTail(headCoords, tailCoords);
      verifyTailCoords(tailCoords, tailCoordsPositions);
      steps -= 1;
    }
  } else if (direction === 'L') {
    while (steps > 0) {
      headCoords[0] -= 1;
      moveTail(headCoords, tailCoords);
      verifyTailCoords(tailCoords, tailCoordsPositions);
      steps -= 1;
    }
  }
};

const getPositionTailVisitedAtLeastOnce = (moves: string) => {
  const tailCoordsPositions: Set<string> = new Set();
  const headCoords = [0, 0];
  const tailCoords = [0, 0];

  moves
    .split('\n')
    .forEach((move) =>
      moveRope(move, headCoords, tailCoords, tailCoordsPositions)
    );
  return tailCoordsPositions.size;
};

console.log(
  getPositionTailVisitedAtLeastOnce(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)
);
