// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import readXlsxFile from 'read-excel-file';

const _castCellValueToStr = (cellValue) => {
  if (cellValue === null || cellValue === undefined) {
    return '';
  }
  return '' + cellValue;
};

const read = async (fileBlob, forceStr) => {
  let data;
  try {
    data = await readXlsxFile(fileBlob);
  } catch (err) {
    throw new Error("Can't parse file. Please provide a valid XLSX file.");
  }

  if (forceStr) {
    data = data.map((row) => {
      return row.map((cell) => _castCellValueToStr(cell));
    });
  }
  return data;
};

const XLSXUtils = {
  read,
};

export default XLSXUtils;
