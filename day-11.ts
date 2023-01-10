type Monkey = {
  monkeyId: number;
  itemsHolding: number[];
  monkeyOperation: string[];
  monkeyTest: number;
  monkeysIdTargets: number[];
  inspectedItems: number;
};

const parseMonkeysInput = (monkeysInput: string) => {
  return monkeysInput
    .split('\n\n')
    .map((monkeyString) => monkeyString.split('\n'))
    .map((monkeyStringArr) => {
      const monkey: Monkey = {
        monkeyId: parseInt(monkeyStringArr[0][monkeyStringArr[0].length - 2]),
        itemsHolding: monkeyStringArr[1]
          .slice(18)
          .split(',')
          .map((item) => parseInt(item)),
        monkeyOperation: monkeyStringArr[2].slice(23).split(' '),
        monkeyTest: parseInt(
          monkeyStringArr[3].slice(monkeyStringArr[3].lastIndexOf(' ')).trim()
        ),
        monkeysIdTargets: [
          parseInt(monkeyStringArr[4][monkeyStringArr[4].length - 1]),
          parseInt(monkeyStringArr[5][monkeyStringArr[5].length - 1]),
        ],
        inspectedItems: 0,
      };
      return monkey;
    });
};

const doOperation = (monkey: Monkey, itemHold: number) => {
  let worryLevel: number;
  if (monkey.monkeyOperation[0] === '*') {
    if (monkey.monkeyOperation[1] === 'old') {
      worryLevel = Math.floor((itemHold * itemHold) / 3);
    } else {
      worryLevel = Math.floor(
        (itemHold * parseInt(monkey.monkeyOperation[1])) / 3
      );
    }
  } else {
    if (monkey.monkeyOperation[1] === 'old') {
      worryLevel = Math.floor((itemHold + itemHold) / 3);
    } else {
      worryLevel = Math.floor(
        (itemHold + parseInt(monkey.monkeyOperation[1])) / 3
      );
    }
  }
  return worryLevel;
};

const monkeyTurn = (monkey: Monkey, monkeyArray: Monkey[]) => {
  return monkey.itemsHolding.filter((itemHold) => {
    let worryLevel = doOperation(monkey, itemHold);
    if (worryLevel % monkey.monkeyTest === 0) {
      const monkeyReceiver = monkeyArray.find(
        (monkeyReceiver) =>
          monkeyReceiver.monkeyId === monkey.monkeysIdTargets[0]
      );
      monkeyReceiver?.itemsHolding.push(worryLevel);
    } else {
      const monkeyReceiver = monkeyArray.find(
        (monkeyReceiver) =>
          monkeyReceiver.monkeyId === monkey.monkeysIdTargets[1]
      );
      monkeyReceiver?.itemsHolding.push(worryLevel);
    }
    monkey.inspectedItems += 1;
    return false;
  });
};

const monkeysRound = (monkeyArray: Monkey[]) => {
  monkeyArray.forEach((monkey) => {
    if (monkey.itemsHolding.length > 0) {
      monkey.itemsHolding = monkeyTurn(monkey, monkeyArray);
    }
  });
};

const getMonkeyBusinnessLevelPartOne = (monkeysInput: string) => {
  const monkeyArray = parseMonkeysInput(monkeysInput);
  let rounds = 1;

  while (rounds <= 20) {
    monkeysRound(monkeyArray);
    rounds += 1;
  }

  const inspectedItemsValues = monkeyArray
    .map((monkey) => monkey.inspectedItems)
    .sort((a, b) => b - a);
  return inspectedItemsValues[0] * inspectedItemsValues[1];
};

const doOperationPartTwo = (monkey: Monkey, itemHold: number) => {
  let worryLevel: number;
  if (monkey.monkeyOperation[0] === '*') {
    if (monkey.monkeyOperation[1] === 'old') {
      worryLevel = Math.floor(itemHold * itemHold);
    } else {
      worryLevel = Math.floor(itemHold * parseInt(monkey.monkeyOperation[1]));
    }
  } else {
    if (monkey.monkeyOperation[1] === 'old') {
      worryLevel = Math.floor(itemHold + itemHold);
    } else {
      worryLevel = Math.floor(itemHold + parseInt(monkey.monkeyOperation[1]));
    }
  }
  return worryLevel;
};

const monkeyTurnPartTwo = (
  monkey: Monkey,
  monkeyArray: Monkey[],
  divider: number
) => {
  return monkey.itemsHolding.filter((itemHold) => {
    let worryLevel = doOperationPartTwo(monkey, itemHold);
    worryLevel = worryLevel % divider;
    if (worryLevel % monkey.monkeyTest === 0) {
      const monkeyReceiver = monkeyArray.find(
        (monkeyReceiver) =>
          monkeyReceiver.monkeyId === monkey.monkeysIdTargets[0]
      );
      monkeyReceiver?.itemsHolding.push(worryLevel);
    } else {
      const monkeyReceiver = monkeyArray.find(
        (monkeyReceiver) =>
          monkeyReceiver.monkeyId === monkey.monkeysIdTargets[1]
      );
      monkeyReceiver?.itemsHolding.push(worryLevel);
    }
    monkey.inspectedItems += 1;
    return false;
  });
};

const monkeysRoundPartTwo = (monkeyArray: Monkey[], divider: number) => {
  monkeyArray.forEach((monkey) => {
    if (monkey.itemsHolding.length > 0) {
      monkey.itemsHolding = monkeyTurnPartTwo(monkey, monkeyArray, divider);
    }
  });
};

const getMonkeyBusinnessLevelPartTwo = (monkeysInput: string) => {
  const monkeyArray = parseMonkeysInput(monkeysInput);
  const divider = monkeyArray
    .map((monkey) => monkey.monkeyTest)
    .reduce((acc, curr) => acc * curr, 1);
  let rounds = 1;

  while (rounds <= 10000) {
    monkeysRoundPartTwo(monkeyArray, divider);
    rounds += 1;
  }
  const inspectedItemsValues = monkeyArray
    .map((monkey) => monkey.inspectedItems)
    .sort((a, b) => b - a);
  return inspectedItemsValues[0] * inspectedItemsValues[1];
};
