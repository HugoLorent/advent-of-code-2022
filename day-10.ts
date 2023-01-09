const verifyCycleAndAddSignalStrenghts = (
  cycle: number,
  signalStrenghts: number[],
  X: number
) => {
  if (
    cycle === 20 ||
    cycle === 60 ||
    cycle === 100 ||
    cycle === 140 ||
    cycle === 180 ||
    cycle === 220
  ) {
    signalStrenghts.push(cycle * X);
  }
};

const getSumOfSignalStrengths = (instructions: string) => {
  let X = 1;
  let cycle = 0;
  const signalStrenghts: number[] = [];
  instructions.split('\n').forEach((instruction) => {
    if (instruction === 'noop') {
      cycle += 1;
      verifyCycleAndAddSignalStrenghts(cycle, signalStrenghts, X);
    } else {
      const V = parseInt(instruction.slice(instruction.indexOf(' ')));
      cycle += 1;
      verifyCycleAndAddSignalStrenghts(cycle, signalStrenghts, X);
      cycle += 1;
      verifyCycleAndAddSignalStrenghts(cycle, signalStrenghts, X);
      X += V;
    }
  });
  return signalStrenghts.reduce((acc, curr) => acc + curr, 0);
};

const initializeCRT = () => {
  const CRT: string[][] = [];
  for (let i = 0; i < 6; i++) {
    const row = new Array(40).fill('.');
    CRT.push(row);
  }
  return CRT;
};

const getSpritePosition = (spriteRow: string[]) => {
  const spritePositon: string[] = [];
  spriteRow.forEach((str, i) => {
    if (str === '#') spritePositon.push(i.toString());
  });
  return spritePositon;
};

const updateSpriteRow = (X: number) => {
  const spriteRow = new Array(40).fill('.');
  spriteRow[X] = '#';
  spriteRow[X - 1] = '#';
  spriteRow[X + 1] = '#';
  return spriteRow;
};

const updateCRTPosition = (CRTPosition: number, cycle: number) => {
  if (
    cycle === 40 ||
    cycle === 80 ||
    cycle === 120 ||
    cycle === 160 ||
    cycle === 200
  ) {
    CRTPosition = 0;
    return CRTPosition;
  }
  CRTPosition += 1;
  return CRTPosition;
};

const updateCRT = (
  CRT: string[][],
  CRTPosition: number,
  cycle: number,
  spritePositon: string[]
) => {
  if (cycle >= 0 && cycle <= 39) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[0][CRTPosition] = '#';
      return;
    }
  } else if (cycle >= 40 && cycle <= 79) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[1][CRTPosition] = '#';
      return;
    }
  } else if (cycle >= 80 && cycle <= 119) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[2][CRTPosition] = '#';
      return;
    }
  } else if (cycle >= 120 && cycle <= 159) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[3][CRTPosition] = '#';
      return;
    }
  } else if (cycle >= 160 && cycle <= 199) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[4][CRTPosition] = '#';
      return;
    }
  } else if (cycle >= 200 && cycle <= 239) {
    if (
      CRTPosition === parseInt(spritePositon[0]) ||
      CRTPosition === parseInt(spritePositon[1]) ||
      CRTPosition === parseInt(spritePositon[2])
    ) {
      CRT[5][CRTPosition] = '#';
      return;
    }
  }
};

const getLetterThatAppearsOnCRT = (instructions: string) => {
  const CRT: string[][] = initializeCRT();
  let spriteRow: string[] = new Array(40).fill('#', 0, 3).fill('.', 3);
  let spritePositon: string[] = getSpritePosition(spriteRow);
  let X = 1;
  let cycle = 0;
  let CRTPosition = 0;
  instructions.split('\n').forEach((instruction) => {
    if (instruction === 'noop') {
      updateCRT(CRT, CRTPosition, cycle, spritePositon);
      cycle += 1;
      CRTPosition = updateCRTPosition(CRTPosition, cycle);
    } else {
      const V = parseInt(instruction.slice(instruction.indexOf(' ')));
      updateCRT(CRT, CRTPosition, cycle, spritePositon);
      cycle += 1;
      CRTPosition = updateCRTPosition(CRTPosition, cycle);
      updateCRT(CRT, CRTPosition, cycle, spritePositon);
      cycle += 1;
      CRTPosition = updateCRTPosition(CRTPosition, cycle);
      X += V;
      spriteRow = updateSpriteRow(X);
      spritePositon = getSpritePosition(spriteRow);
    }
  });
  return CRT.map((strArr) => strArr.join(''));
};
