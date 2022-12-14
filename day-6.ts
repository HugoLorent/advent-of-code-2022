const getCharactersNbBeforeFirstStartOfPacketMarker = (datastream: string) => {
  let charsArray: string[] = [];
  for (let i = 0; i < datastream.length; i++) {
    charsArray.push(datastream[i]);
    if (charsArray.length === 4) {
      const isAllCharsDifferent = charsArray.every(
        (char) => charsArray.indexOf(char) === charsArray.lastIndexOf(char)
      );

      if (isAllCharsDifferent) {
        return i + 1;
      } else {
        charsArray.splice(0, 1);
      }
    }
  }
};

const getCharactersNbBeforeFirstStartOfMessageMarker = (datastream: string) => {
  let charsArray: string[] = [];
  for (let i = 0; i < datastream.length; i++) {
    charsArray.push(datastream[i]);
    if (charsArray.length === 14) {
      const isAllCharsDifferent = charsArray.every(
        (char) => charsArray.indexOf(char) === charsArray.lastIndexOf(char)
      );

      if (isAllCharsDifferent) {
        return i + 1;
      } else {
        charsArray.splice(0, 1);
      }
    }
  }
};
