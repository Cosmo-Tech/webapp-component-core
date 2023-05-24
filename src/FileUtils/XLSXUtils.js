// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import * as XLSX from 'xlsx';
import { DateUtils } from '../DateUtils';

const _castCellValueToStr = (cellValue) => {
  if (cellValue === null || cellValue === undefined) {
    return '';
  }
  return '' + cellValue;
};

const _dateCellsToString = (cols, data, hasHeader, dateFormat) => {
  cols.forEach((column, i) => {
    if (column.type.includes('date')) {
      for (let j = 0 + hasHeader; j < data.length; j++) {
        const dateCell = data[j][i];
        if (dateCell instanceof Date) {
          const maybeDateFormat = DateUtils.format(new Date(dateCell), dateFormat);
          data[j][i] = maybeDateFormat !== '' ? maybeDateFormat : dateCell;
        }
      }
    }
  });

  return data;
};

const read = async (fileBlob, forceStr, emptyCols, cols, options, hasHeader) => {
  let data;
  try {
    const buffer = await fileBlob.arrayBuffer();
    const workbook = XLSX.read(buffer, { cellDates: true });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    data = XLSX.utils.sheet_to_json(worksheet, emptyCols ? { header: 1, defval: '' } : { header: 1 });
  } catch (err) {
    throw new Error("Can't parse file. Please provide a valid XLSX file.");
  }
  if (forceStr) {
    data = _dateCellsToString(cols, data, hasHeader, options.dateFormat);
    data = data.map((row) => {
      return row.map((cell) => _castCellValueToStr(cell));
    });
  }
  return data;
};

const write = (data, cols) => {
  const worksheet = XLSX.utils.json_to_sheet(data, { header: cols });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  return XLSX.write(workbook, { type: 'array' });
};

const XLSXUtils = {
  read,
  write,
};

export default XLSXUtils;
