const findElfWithMostCalories = (elfsCalories: string): number => {
  const elfsCaloriesTotal = elfsCalories
    .split('\n\n')
    .map((elf) =>
      elf.split('\n').reduce((prev, acc) => prev + parseInt(acc), 0)
    );
  return Math.max(...elfsCaloriesTotal);
};

const findTopThreeElfsWithMostCalories = (elfsCalories: string) => {
  const topThreeElfsCaloriesTotal: number[] = [];
  const elfsCaloriesTotal = elfsCalories
    .split('\n\n')
    .map((elf) =>
      elf.split('\n').reduce((prev, acc) => prev + parseInt(acc), 0)
    );

  while (topThreeElfsCaloriesTotal.length !== 3) {
    topThreeElfsCaloriesTotal.push(Math.max(...elfsCaloriesTotal));
    elfsCaloriesTotal.splice(
      elfsCaloriesTotal.indexOf(Math.max(...elfsCaloriesTotal)),
      1
    );
  }

  return topThreeElfsCaloriesTotal.reduce((prev, acc) => prev + acc, 0);
};
