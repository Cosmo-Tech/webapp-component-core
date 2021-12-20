// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import * as XLSX from 'xlsx';

const _castCellValueToStr = (cellValue) => {
  if (cellValue === null || cellValue === undefined) {
    return '';
  }
  return '' + cellValue;
};

const read = async (fileBlob, forceStr) => {
  let data;
  try {
    const buffer = await fileBlob.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
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
