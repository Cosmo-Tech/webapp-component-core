// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import * as XLSX from 'xlsx';

const _castCellValueToStr = (cellValue) => {
  if (cellValue === null || cellValue === undefined) {
    return '';
  }
  return '' + cellValue;
};

const read = async (fileBlob, forceStr, emptyCols) => {
  let data;
  try {
    const buffer = await fileBlob.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    data = XLSX.utils.sheet_to_json(worksheet, emptyCols ? { header: 1, defval: '' } : { header: 1 });
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
