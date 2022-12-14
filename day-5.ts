const reformatStacksAsArrays = (stacks: string[]) => {
  const reformatStacks: string[][] = [];
  for (let i = 0; i < Math.round(stacks[0].length / 4); i++) {
    const stack: string[] = [];
    reformatStacks.push(stack);
  }

  for (let i = 0; i < stacks.length; i++) {
    let stackIndexToPush = 0;
    for (let j = 0; j < stacks[i].length; j += 4) {
      const partToCut = stacks[i].substring(j, j + 4);
      reformatStacks[stackIndexToPush].push(partToCut);
      stackIndexToPush++;
    }
    stackIndexToPush = 0;
  }
  return reformatStacks.map((stack) =>
    stack
      .filter((char) => !char.includes('  '))
      .map((char) => char.replaceAll(/\[|\]|\s/g, ''))
      .reverse()
  );
};

const doInstruction = (
  stacksArrays: string[][],
  procedure: string,
  isFirstPartRearrangement: boolean
) => {
  let cratesNbToMove: number;
  let stackIndexDepart: number;
  let stackIndexArrival: number;
  if (procedure.length > 3) {
    cratesNbToMove = parseInt(procedure.slice(0, 2));
    stackIndexDepart = parseInt(procedure[2]) - 1;
    stackIndexArrival = parseInt(procedure[3]) - 1;
  } else {
    cratesNbToMove = parseInt(procedure[0]);
    stackIndexDepart = parseInt(procedure[1]) - 1;
    stackIndexArrival = parseInt(procedure[2]) - 1;
  }

  let cratesToMove = stacksArrays[stackIndexDepart].splice(
    stacksArrays[stackIndexDepart].length - cratesNbToMove,
    cratesNbToMove
  );

  if (isFirstPartRearrangement === true) cratesToMove = cratesToMove.reverse();
  stacksArrays[stackIndexArrival].push(...cratesToMove);
};

const getCratesThatEndsUpOnTopOfEachStack = (
  startingStacksWithProcedure: string
) => {
  const stacks = startingStacksWithProcedure
    .split('\n\n')[0]
    .split('\n')
    .filter((line) => line.length !== 0)
    .filter((line) => !line.includes('1'));

  const stacksArraysFirstPart = reformatStacksAsArrays(stacks);
  const stacksArraysSecondPart = reformatStacksAsArrays(stacks);

  const procedures = startingStacksWithProcedure
    .split('\n\n')[1]
    .split('\n')
    .map((instruction) => instruction.replaceAll(/[^\d]/g, ''));

  procedures.map((procedure) => {
    doInstruction(stacksArraysFirstPart, procedure, true);
    doInstruction(stacksArraysSecondPart, procedure, false);
  });

  const twoPartsResult: string[] = [];
  twoPartsResult.push(
    stacksArraysFirstPart.map((stack) => stack[stack.length - 1]).join(''),
    stacksArraysSecondPart.map((stack) => stack[stack.length - 1]).join('')
  );
  return twoPartsResult.join(', ');
};
