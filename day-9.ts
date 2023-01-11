type Motion = {
  direction: string;
  nbMoves: number;
};

type Point = {
  x: number;
  y: number;
};

const parseInstructionInput = (instructions: string) => {
  return instructions.split('\n').map((instruction) => {
    const motion: Motion = {
      direction: instruction[0],
      nbMoves: parseInt(instruction.slice(instruction.indexOf(' '))),
    };
    return motion;
  });
};

const updateTail = (head: Point, tail: Point) => {
  const distance = Math.max(
    Math.abs(tail.x - head.x),
    Math.abs(tail.y - head.y)
  );
  if (distance > 1) {
    const directionX = head.x - tail.x;
    tail.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
    const directionY = head.y - tail.y;
    tail.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
  }
};

const moveHead = (motion: Motion, head: Point) => {
  switch (motion.direction) {
    case 'U':
      head.y += 1;
      break;
    case 'R':
      head.x += 1;
      break;
    case 'D':
      head.y -= 1;
      break;
    case 'L':
      head.x -= 1;
      break;
    default:
      break;
  }
};

const markAsVisited = (
  x: number,
  y: number,
  visitedTailCoordsOnce: Set<string>
) => {
  visitedTailCoordsOnce.add(`${x}-${y}`);
};

const getNbPositionTailRopeVisitedAtLeastOncePartOne = (
  instructions: string
) => {
  const motionsArray = parseInstructionInput(instructions);
  const head: Point = { x: 0, y: 0 };
  const tail: Point = { x: 0, y: 0 };
  const visitedTailCoordsOnce = new Set<string>();

  motionsArray.forEach((motion) => {
    for (let i = 0; i < motion.nbMoves; i++) {
      moveHead(motion, head);
      updateTail(head, tail);
      markAsVisited(tail.x, tail.y, visitedTailCoordsOnce);
    }
  });
  return visitedTailCoordsOnce.size;
};

const getNbPositionTailRopeVisitedAtLeastOncePartTwo = (
  instructions: string
) => {
  const motionsArray = parseInstructionInput(instructions);
  const rope: Point[] = new Array(10).fill(0).map(() => {
    const newPoint: Point = { x: 0, y: 0 };
    return newPoint;
  });
  const head = rope[0];
  const visitedTailCoordsOnce = new Set<string>();

  motionsArray.forEach((motion) => {
    for (let i = 0; i < motion.nbMoves; i++) {
      moveHead(motion, head);
      for (let i = 1; i < rope.length; i++) {
        updateTail(rope[i - 1], rope[i]);
        if (i === rope.length - 1) {
          markAsVisited(rope[i].x, rope[i].y, visitedTailCoordsOnce);
        }
      }
    }
  });
  return visitedTailCoordsOnce.size;
};
