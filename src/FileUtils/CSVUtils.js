// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import * as CSV from 'csv-string';

const read = (dataStr) => {
  return CSV.parse(dataStr).map((row) => {
    return row.map((cell) => cell.trim());
  });
};

const write = (dataArray, separator) => {
  return CSV.stringify(dataArray, separator);
};

const CSVUtils = {
  read,
  write,
};

export default CSVUtils;
