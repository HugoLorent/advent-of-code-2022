const isVisible = (rows: string[], i: number, j: number) => {
  let visible = true;

  for (let right = j + 1; right < rows[i].length; right++) {
    if (rows[i][j] <= rows[i][right]) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;

  visible = true;
  for (let left = j - 1; left >= 0; left--) {
    if (rows[i][j] <= rows[i][left]) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;

  visible = true;
  for (let top = i - 1; top >= 0; top--) {
    if (rows[i][j] <= rows[top][j]) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;

  visible = true;
  for (let bottom = i + 1; bottom < rows[i].length; bottom++) {
    if (rows[i][j] <= rows[bottom][j]) {
      visible = false;
      break;
    }
  }
  if (visible) return visible;
};

const getVisibleTrees = (trees: string) => {
  const rows = trees.split('\n');
  const visibleTrees: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (i === 0 || i === rows.length - 1) {
        visibleTrees.push(rows[i][j]);
      } else {
        if (j === 0 || j === rows[i].length - 1) {
          visibleTrees.push(rows[i][j]);
        } else {
          if (isVisible(rows, i, j)) {
            visibleTrees.push(rows[i][j]);
          }
        }
      }
    }
  }

  return visibleTrees.length;
};

const getScenicScore = (rows: string[], i: number, j: number) => {
  let counter = 0;
  const viewingDistance: number[] = [];

  for (let right = j + 1; right < rows[i].length; right++) {
    if (rows[i][j] <= rows[i][right]) {
      counter++;
      break;
    } else {
      counter++;
    }
  }
  viewingDistance.push(counter);
  counter = 0;

  for (let left = j - 1; left >= 0; left--) {
    if (rows[i][j] <= rows[i][left]) {
      counter++;
      break;
    } else {
      counter++;
    }
  }
  viewingDistance.push(counter);
  counter = 0;

  for (let top = i - 1; top >= 0; top--) {
    if (rows[i][j] <= rows[top][j]) {
      counter++;
      break;
    } else {
      counter++;
    }
  }
  viewingDistance.push(counter);
  counter = 0;

  for (let bottom = i + 1; bottom < rows[i].length; bottom++) {
    if (rows[i][j] <= rows[bottom][j]) {
      counter++;
      break;
    } else {
      counter++;
    }
  }
  viewingDistance.push(counter);

  return viewingDistance.reduce((prev, curr) => prev * curr, 1);
};

const getHighestScenicScore = (trees: string) => {
  const rows = trees.split('\n');
  const scenicScore: number[] = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      scenicScore.push(getScenicScore(rows, i, j));
    }
  }
  return Math.max(...scenicScore);
};
