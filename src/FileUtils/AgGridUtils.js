// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import CSV from './CSVUtils';
import { ValidationUtils } from '../ValidationUtils';

const DEFAULT_CSV_EXPORT_OPTIONS = {
  colSep: ',',
  dateFormat: 'yyyy-MM-dd',
  rowSep: '\n',
  writeHeader: true,
};

const _forgeColumnsCountError = (row, rowIndex, expectedCols) => {
  const colsCount = row.length;
  const expectedColsCount = expectedCols.length;
  const missingColsCount = expectedColsCount - colsCount;
  return (
    `Missing column${missingColsCount > 1 ? 's' : ''} on line ${rowIndex}: ${expectedColsCount} columns expected, ` +
    `but only ${colsCount} column${colsCount > 1 ? 's' : ''} found`
  );
};

const _forgeTypeError = (value, rowIndex, type, options) => {
  let expected = '';
  if (type === 'enum') {
    expected = ` (expected values are [${options.enumValues.join()}])`;
  } else if (type === 'date') {
    expected = ` (expected format is ${options.dateFormat})`;
  }
  return `Incorrect ${type} value on line ${rowIndex}: "${value}"${expected}`;
};

const _getColTypeFromTypeArray = (typeArray) => {
  if (!typeArray || typeArray.length === 0) {
    return 'string'; // Fall back to default type
  }
  const knownTypes = ['bool', 'date', 'enum', 'int', 'number'];
  for (const type of knownTypes) {
    if (typeArray.indexOf(type) !== -1) {
      return type;
    }
  }
  return 'string'; // Fall back to default type
};

const _validateFormat = (rows, hasHeader, cols, options) => {
  const colsData = cols.map((col) => ({ ...col, type: _getColTypeFromTypeArray(col.type) }));
  const errors = [];
  const knownColsCount = colsData.length;
  const startIndex = hasHeader ? 1 : 0;
  for (let rowIndex = startIndex; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (row.length < knownColsCount) {
      errors.push(_forgeColumnsCountError(rows[rowIndex], rowIndex, colsData));
    }
    row.forEach((rowCell, colIndex) => {
      if (colIndex < knownColsCount) {
        const colType = colsData[colIndex].type;
        if (colType) {
          const enumValues = colsData[colIndex]?.enumValues || colsData[colIndex]?.cellEditorParams?.enumValues;
          const colOptions = { ...options, enumValues: enumValues };
          if (!ValidationUtils.isValid(rowCell, colType, colOptions)) {
            errors.push(_forgeTypeError(rowCell, rowIndex, colType, colOptions));
          }
        }
      }
    });
  }

  return errors;
};

const _reformatBoolValue = (csvCellValue) => {
  csvCellValue = csvCellValue.toLowerCase();
  if (['0', 'false', 'no'].includes(csvCellValue)) {
    return 'false';
  } else if (['1', 'true', 'yes'].includes(csvCellValue)) {
    return 'true';
  }
  return null;
};

const _reformatValue = (csvCellValue, colTypes) => {
  if (colTypes && colTypes.includes('bool')) {
    return _reformatBoolValue(csvCellValue);
  }
  return csvCellValue;
};

const _buildCols = (header) => header.map((col) => ({ field: col }));

const _buildRows = (rows, hasHeader, cols) => {
  const formattedData = [];
  const startIndex = hasHeader ? 1 : 0;
  for (let rowIndex = startIndex; rowIndex < rows.length; rowIndex++) {
    const row = {};
    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      const csvCellValue = rows[rowIndex][colIndex];
      row[cols[colIndex].field] = _reformatValue(csvCellValue, cols[colIndex].type);
    }
    formattedData.push(row);
  }
  return formattedData;
};

const fromCSV = (dataStr, hasHeader = true, cols, options) => {
  if (!hasHeader && !cols) {
    return { error: ['cols must be defined if hasHeader=false'] };
  }
  if (!dataStr || dataStr.length === 0) {
    return { cols: [], rows: [] };
  }

  let rows = [];
  let csvLines;
  try {
    csvLines = CSV.read(dataStr);
  } catch (err) {
    return { error: [err] };
  }

  if (!cols) {
    cols = _buildCols(csvLines[0]);
  }

  const errors = _validateFormat(csvLines, hasHeader, cols, options);
  if (errors.length > 0) return { error: errors };
  rows = _buildRows(csvLines, hasHeader, cols);
  return { cols: cols, rows: rows };
};

const _generateHeader = (cols, separator = ',') => {
  return cols.map((col) => col.field).join(separator);
};

const _generateRow = (row, cols, separator = ',') => {
  return cols.map((col) => row[col.field]).join(separator);
};

const _generateRows = (rows, cols, colSep = ',', rowSep = '\n') => {
  return rows.map((row) => _generateRow(row, cols, colSep)).join(rowSep);
};

const toCSV = (rows, cols, options) => {
  if (cols == null || cols.length === 0) {
    return { error: [`Cols must be defined`] };
  }
  if (!rows) {
    rows = [];
  }

  options = {
    ...DEFAULT_CSV_EXPORT_OPTIONS,
    ...options,
  };

  const rowsStr = _generateRows(rows, cols, options.colSep, options.rowSep);
  let header = '';
  if (options.writeHeader) {
    header = _generateHeader(cols);
    if (rowsStr.length > 0) {
      header = header.concat(options.rowSep);
    }
  }
  return header.concat(rowsStr);
};

const AgGridUtils = {
  fromCSV,
  toCSV,
};

export default AgGridUtils;
