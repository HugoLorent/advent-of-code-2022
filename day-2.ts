const getRoundScoreFirstPart = (
  opponentChoose: string,
  myChoose: string
): number => {
  let score: number = 0;
  if (myChoose === 'X') {
    score += 1;
    if (opponentChoose === 'B') return score;
    score += opponentChoose === 'C' ? 6 : 3;
    return score;
  } else if (myChoose === 'Y') {
    score += 2;
    if (opponentChoose === 'C') return score;
    score += opponentChoose === 'A' ? 6 : 3;
    return score;
  } else if (myChoose === 'Z') {
    score += 3;
    if (opponentChoose === 'A') return score;
    score += opponentChoose === 'B' ? 6 : 3;
    return score;
  }
  return score;
};

const getRoundScoreSecondPart = (
  opponentChoose: string,
  myChoose: string
): number => {
  let score: number = 0;
  if (myChoose === 'X') {
    if (opponentChoose === 'A') return (score += 3);
    if (opponentChoose === 'B') return (score += 1);
    if (opponentChoose === 'C') return (score += 2);
  } else if (myChoose === 'Y') {
    if (opponentChoose === 'A') return (score += 4);
    if (opponentChoose === 'B') return (score += 5);
    if (opponentChoose === 'C') return (score += 6);
  } else if (myChoose === 'Z') {
    if (opponentChoose === 'A') return (score += 8);
    if (opponentChoose === 'B') return (score += 9);
    if (opponentChoose === 'C') return (score += 7);
  }
  return score;
};

const getRockPaperScissorsScoreForAllRounds = (rounds: string) => {
  const scores: number[] = [];
  let scoreFirstPart = 0;
  let scoreSecondPart = 0;
  rounds.split('\n').forEach((round) => {
    round = round.replaceAll(' ', '');
    scoreFirstPart += getRoundScoreFirstPart(round[0], round[1]);
    scoreSecondPart += getRoundScoreSecondPart(round[0], round[1]);
  });
  scores.push(scoreFirstPart, scoreSecondPart);
  return scores;
};
