const findPriorityItemsSum = (allRucksacksWithItems: string) => {
  return allRucksacksWithItems
    .split('\n')
    .map((rucksackItem) => {
      const rucksackCompartment: string[] = [];
      const halfString = Math.floor(rucksackItem.length / 2);
      const firstPartString = rucksackItem.substring(0, halfString);
      const secondPartString = rucksackItem.substring(halfString);
      rucksackCompartment.push(firstPartString, secondPartString);
      return rucksackCompartment;
    })
    .map((rucksack) => {
      return new Set(
        Array.from(rucksack[0]).filter((commonChar) =>
          rucksack[1].includes(commonChar)
        )
      );
    })
    .flatMap((commonItem) => Array.from(commonItem))
    .map((char) => {
      const codeAscii = char.charCodeAt(0);
      if (codeAscii >= 65 && codeAscii <= 90) {
        return codeAscii - 38;
      } else {
        return codeAscii - 96;
      }
    })
    .reduce((total, currentNumber) => total + currentNumber, 0);
};

const findPriorityBadgeItemSum = (rucksacksItems: string) => {
  const ruckSacksItemByGroupOfThree: string[][] = [];
  let groupOfThreeRucksacks: string[] = [];
  rucksacksItems.split('\n').map((rucksack, rucksackIndex) => {
    groupOfThreeRucksacks.push(rucksack);
    if ((rucksackIndex + 1) % 3 === 0) {
      ruckSacksItemByGroupOfThree.push(groupOfThreeRucksacks);
      groupOfThreeRucksacks = [];
    }
  });
  return ruckSacksItemByGroupOfThree
    .map((groupOfThreeRucksacks) => {
      return new Set(
        Array.from(groupOfThreeRucksacks[0]).filter(
          (commonChar) =>
            groupOfThreeRucksacks[1].includes(commonChar) &&
            groupOfThreeRucksacks[2].includes(commonChar)
        )
      );
    })
    .flatMap((commonItem) => Array.from(commonItem))
    .map((char) => {
      const codeAscii = char.charCodeAt(0);
      if (codeAscii >= 65 && codeAscii <= 90) {
        return codeAscii - 38;
      } else {
        return codeAscii - 96;
      }
    })
    .reduce((total, currentNumber) => total + currentNumber, 0);
};
