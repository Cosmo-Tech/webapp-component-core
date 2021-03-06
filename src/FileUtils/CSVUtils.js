// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import * as CSV from 'csv-string';

const read = (dataStr) => {
  return CSV.parse(dataStr).map((row) => {
    return row.map((cell) => cell.trim());
  });
};

const write = (dataArray) => {
  return CSV.stringify(dataArray);
};

const CSVUtils = {
  read,
  write,
};

export default CSVUtils;
