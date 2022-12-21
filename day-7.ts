type Directory = {
  path: string;
  files: string[];
  directories: Directory[];
  size: number;
};

const buildPath = (bashCommand: string, actualPath: string) => {
  let newPath: string;
  const pathArgument = bashCommand.slice(bashCommand.lastIndexOf(' ') + 1);

  if (pathArgument === '..') {
    newPath = actualPath.slice(0, actualPath.lastIndexOf('/'));
    if (newPath === '') newPath = '/';
  } else if (pathArgument === '/') {
    newPath = '/';
  } else {
    if (actualPath === '/') {
      newPath = '/' + pathArgument;
    } else {
      newPath = `${actualPath}/${pathArgument}`;
    }
  }
  return newPath;
};

const addChildDirectoriesToParentDirectories = (
  terminalCommands: string,
  dirs: Directory[]
) => {
  const instructions = terminalCommands.split('\n');
  let actualPath = '';
  let actualDirectory: Directory;

  instructions.forEach((instruction) => {
    if (instruction.startsWith('$ cd')) {
      actualPath = buildPath(instruction, actualPath);
      actualDirectory = dirs.find((dir) => dir.path === actualPath);
    } else if (instruction.startsWith('dir')) {
      const dirName = instruction.slice(instruction.indexOf(' ') + 1);
      let childDir: Directory;
      if (actualDirectory.path === '/') {
        childDir = dirs.find((dir) => dir.path === `/${dirName}`);
      } else {
        childDir = dirs.find(
          (dir) => dir.path === `${actualDirectory.path}/${dirName}`
        );
      }
      actualDirectory.directories.push(childDir);
    }
  });
  return dirs;
};

const findSmallestDirectoryToDeleteToFreeEnoughSpace = (
  directories: Directory[],
  totalDiskSize: number,
  spaceNeeded: number
) => {
  let spaceAvailable = totalDiskSize - directories[0].size;
  const possiblesDirectoryToDelete: number[] = [];

  directories.forEach((dir) => {
    if (
      dir.size + spaceAvailable >= spaceNeeded &&
      dir.size + spaceAvailable <= totalDiskSize
    ) {
      possiblesDirectoryToDelete.push(dir.size);
    }
  });

  return Math.min(...possiblesDirectoryToDelete);
};

const getTotalSizeDirectories = (terminalCommands: string) => {
  const instructions = terminalCommands.split('\n');
  let actualPath = '';
  let directories: Directory[] = [];
  let actualDirectory: Directory;

  instructions.forEach((instruction) => {
    if (instruction.startsWith('$ cd')) {
      actualPath = buildPath(instruction, actualPath);

      const isDirAlreadyExisting = directories.findIndex(
        (dir) => dir.path === actualPath
      );

      if (isDirAlreadyExisting === -1) {
        actualDirectory = {
          path: actualPath,
          files: [],
          directories: [],
          size: 0,
        };
        directories.push(actualDirectory);
      } else {
        actualDirectory = directories.find((dir) => dir.path === actualPath);
      }
    } else if (/^\d/.test(instruction)) {
      actualDirectory.files.push(instruction);
      const sizeFile = parseInt(instruction.slice(0, instruction.indexOf(' ')));
      actualDirectory.size += sizeFile;
    }
  });
  directories = addChildDirectoriesToParentDirectories(
    terminalCommands,
    directories
  );

  for (let i = directories.length - 1; i >= 0; i--) {
    if (directories[i].directories.length > 0) {
      const childSize = directories[i].directories
        .map((childDir) => childDir.size)
        .reduce((prev, curr) => prev + curr, 0);
      directories[i].size += childSize;
    }
  }

  const answers: number[] = [];
  const answerPartOne = directories
    .filter((dir) => dir.size < 100000)
    .map((dir) => dir.size)
    .reduce((prev, curr) => prev + curr, 0);
  answers.push(answerPartOne);

  const answerPartTwo = findSmallestDirectoryToDeleteToFreeEnoughSpace(
    directories,
    70000000,
    30000000
  );

  answers.push(answerPartTwo);

  return answers;
};
