const getAssigmentPairsNumberWhereOneRangeFullyContainTheOther = (
  pairs: string
) => {
  return pairs
    .split('\n')
    .map((assigmentPairs) =>
      assigmentPairs
        .split(',')
        .map((pairs) => pairs.split('-').map((pair) => parseInt(pair)))
    )
    .filter((assigmentPairs) => {
      const pair0 = assigmentPairs[0];
      const pair1 = assigmentPairs[1];
      if (pair0[0] >= pair1[0] && pair0[1] <= pair1[1]) return true;
      if (pair1[0] >= pair0[0] && pair1[1] <= pair0[1]) return true;
      return false;
    }).length;
};

const getAssigmentPairsNumberWhereRangeOverlap = (pairs: string) => {
  return pairs
    .split('\n')
    .map((assigmentPairs) =>
      assigmentPairs
        .split(',')
        .map((pairs) => pairs.split('-').map((pair) => parseInt(pair)))
    )
    .filter((assigmentPairs) => {
      const pair0 = assigmentPairs[0];
      const pair1 = assigmentPairs[1];
      if (
        pair0[0] < pair1[0] &&
        pair0[0] < pair1[1] &&
        pair0[1] < pair1[0] &&
        pair0[1] < pair1[1]
      ) {
        return false;
      }
      if (
        pair0[0] > pair1[0] &&
        pair0[0] > pair1[1] &&
        pair0[1] > pair1[0] &&
        pair0[1] > pair1[1]
      ) {
        return false;
      }
      return true;
    }).length;
};
