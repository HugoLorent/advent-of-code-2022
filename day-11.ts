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

const getMonkeyBusinnessLevel = (monkeysInput: string) => {
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

console.log(
  getMonkeyBusinnessLevel(
    `Monkey 0:
  Starting items: 91, 54, 70, 61, 64, 64, 60, 85
  Operation: new = old * 13
  Test: divisible by 2
    If true: throw to monkey 5
    If false: throw to monkey 2

Monkey 1:
  Starting items: 82
  Operation: new = old + 7
  Test: divisible by 13
    If true: throw to monkey 4
    If false: throw to monkey 3

Monkey 2:
  Starting items: 84, 93, 70
  Operation: new = old + 2
  Test: divisible by 5
    If true: throw to monkey 5
    If false: throw to monkey 1

Monkey 3:
  Starting items: 78, 56, 85, 93
  Operation: new = old * 2
  Test: divisible by 3
    If true: throw to monkey 6
    If false: throw to monkey 7

Monkey 4:
  Starting items: 64, 57, 81, 95, 52, 71, 58
  Operation: new = old * old
  Test: divisible by 11
    If true: throw to monkey 7
    If false: throw to monkey 3

Monkey 5:
  Starting items: 58, 71, 96, 58, 68, 90
  Operation: new = old + 6
  Test: divisible by 17
    If true: throw to monkey 4
    If false: throw to monkey 1

Monkey 6:
  Starting items: 56, 99, 89, 97, 81
  Operation: new = old + 1
  Test: divisible by 7
    If true: throw to monkey 0
    If false: throw to monkey 2

Monkey 7:
  Starting items: 68, 72
  Operation: new = old + 8
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 0`
  )
);
