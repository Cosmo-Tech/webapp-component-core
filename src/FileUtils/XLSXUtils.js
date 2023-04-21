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
    data = data.map((row) => {
      return row.map((cell) => _castCellValueToStr(cell));
    });
    cols.forEach((column, i) => {
      if (column.type.includes('date'))
        for (let j = 0 + hasHeader; j < data.length; j++)
          if (data[j][i])
            data[j][i] =
              DateUtils.format(new Date(data[j][i]), options.dateFormat) !== ''
                ? DateUtils.format(new Date(data[j][i]), options.dateFormat)
                : data[j][i];
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
