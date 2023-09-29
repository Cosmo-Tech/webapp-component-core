// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import CSV from './CSVUtils';
import XLSXUtils from './XLSXUtils';
import { ValidationUtils } from '../ValidationUtils';
import { Error as PanelError } from '../models';

const getFlattenColumnsWithoutGroups = (columns) => {
  if (columns == null) {
    console.warn("Columns list shouldn't be null or undefined");
    return [];
  }

  return columns
    .flatMap((columnOrGroup) => {
      if (columnOrGroup == null) {
        console.warn('Null or undefined values found in columns list');
      }
      return columnOrGroup?.children ? getFlattenColumnsWithoutGroups(columnOrGroup.children) : columnOrGroup;
    })
    .filter((column) => column != null);
};

const getColumnsWithHeaderName = (columns) => {
  if (!Array.isArray(columns)) {
    console.warn('Columns list must be an array');
    return [];
  }
  columns.forEach((columnOrGroup) => {
    if (columnOrGroup?.children) getColumnsWithHeaderName(columnOrGroup.children);
    else {
      if (columnOrGroup.headerName === undefined) columnOrGroup.headerName = columnOrGroup.field;
    }
  });
  return columns;
};

const _buildEmptyFieldError = (rowLineNumber, expectedCols, colIndex) => {
  const errorSummary = `Empty field`;
  const errorLoc = `Line ${rowLineNumber}, Column ${colIndex + 1} ("${expectedCols[colIndex].field}")`;
  const errorContext = `${errorSummary}: ${errorLoc} is required`;
  return new PanelError(errorSummary, errorLoc, errorContext);
};

const _buildNumberColumnsError = (rowLineNumber, expectedCols, row) => {
  const expectedColsCount = expectedCols.length;
  const expectedColsName = expectedCols.map((col) => col.field).join();
  const errorSummary = row.length > expectedColsCount ? 'Too many fields' : 'Too few fields';
  const errorLoc = `Line ${rowLineNumber}`;
  const errorContext =
    `${errorSummary} (${errorLoc}) : Expected ${expectedColsCount} fields, found ${row.length}\n` +
    `Expected data format : "${expectedColsName}"\n` +
    `Incorrect Row : "${row}"`;
  return new PanelError(errorSummary, errorLoc, errorContext);
};

const _buildTypeError = (type, rowLineNumber, colIndex, colsData, value, expected) => {
  const errorSummary = `Incorrect ${type} value`;
  const errorLoc = `Line ${rowLineNumber} , Column ${colIndex + 1} ("${colsData[colIndex].field}")`;
  const errorContext = `${errorSummary} (${errorLoc})\n` + `Incorrect value : "${value}" for type ${type}`;
  if (!expected || expected.length === 0) {
    return new PanelError(errorSummary, errorLoc, errorContext);
  }
  return new PanelError(errorSummary, errorLoc, errorContext + '\n' + expected);
};

const DEFAULT_CSV_EXPORT_OPTIONS = {
  colSep: ',',
  dateFormat: 'yyyy-MM-dd',
  rowSep: '\n',
  writeHeader: true,
};
const DEFAULT_XLSX_EXPORT_OPTIONS = {
  writeHeader: true,
};

const _forgeColumnsCountError = (row, rowLineNumber, expectedCols, errors) => {
  const valuesInRange = row.slice(0, expectedCols.length);
  valuesInRange.forEach((column, i) => {
    if (column === undefined) errors.push(_buildEmptyFieldError(rowLineNumber, expectedCols, i));
  });
  if (row.length !== expectedCols.length) errors.push(_buildNumberColumnsError(rowLineNumber, expectedCols, row));
};

const _forgeTypeError = (value, rowLineNumber, type, options, colsData, colIndex) => {
  let expected = '';
  if (type === 'enum') {
    expected = `Expected values: [${options.enumValues.join()}]`;
  } else if (type === 'date') {
    expected = `Expected format: ${options.dateFormat}`;
  }
  return _buildTypeError(type, rowLineNumber, colIndex, colsData, value, expected);
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
    while (row[row.length - 1] === undefined && row.length > knownColsCount) row.pop();
    if (row.length !== knownColsCount || row.includes(undefined))
      _forgeColumnsCountError(row, rowIndex + 1, colsData, errors);
    row.forEach((rowCell, colIndex) => {
      if (colIndex < knownColsCount) {
        const colType = colsData[colIndex].type;
        if (colType && rowCell !== undefined) {
          // use of cellEditorParams is deprecated
          const enumValues = colsData[colIndex]?.enumValues ?? colsData[colIndex]?.cellEditorParams?.enumValues;
          const colOptions = { ...options, enumValues };
          const acceptsEmptyFields =
            // use of cellEditorParams is deprecated
            colsData[colIndex].acceptsEmptyFields ?? colsData[colIndex].cellEditorParams?.acceptsEmptyFields ?? false;
          if (!ValidationUtils.isValid(rowCell, colType, colOptions, acceptsEmptyFields)) {
            errors.push(_forgeTypeError(rowCell, rowIndex + 1, colType, colOptions, colsData, colIndex));
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
};

const _reformatValue = (csvCellValue, colTypes) => {
  if (colTypes && colTypes.includes('bool')) {
    return _reformatBoolValue(csvCellValue);
  }
  return csvCellValue;
};

const _buildCols = (header) => header.map((col) => ({ field: col }));

const _calculateEmptyCols = (cols) => {
  if (cols === undefined) {
    return [];
  }
  // use of cellEditorParams is deprecated
  return cols
    .map((_, index) => index)
    .filter((colIndex) => cols[colIndex].acceptsEmptyFields ?? cols[colIndex].cellEditorParams?.acceptsEmptyFields);
};

const _processTableToTransformNonAcceptableEmptyCols = (lines, emptyCols) => {
  return lines.map((line) => line.map((cell, index) => (cell === '' && !emptyCols.includes(index) ? undefined : cell)));
};
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

const fromCSV = (dataStr, hasHeader = true, nestedCols, options) => {
  if (!hasHeader && !nestedCols) {
    return { error: [new PanelError('cols must be defined if hasHeader=false', null, null)] };
  }
  if (!dataStr || dataStr.length === 0) {
    return { cols: [], rows: [] };
  }

  let cols = getFlattenColumnsWithoutGroups(nestedCols);
  let rows = [];
  let csvLines;
  const emptyCols = _calculateEmptyCols(cols);
  try {
    csvLines = _processTableToTransformNonAcceptableEmptyCols(CSV.read(dataStr), emptyCols);
  } catch (err) {
    return { error: [err] };
  }

  if (!cols || cols.length === 0) {
    cols = _buildCols(csvLines[0]);
  }

  const errors = _validateFormat(csvLines, hasHeader, cols, options);
  if (errors.length > 0) return { error: errors };
  rows = _buildRows(csvLines, hasHeader, cols);
  return { cols, rows };
};

const _generateHeader = (cols, separator = ',') => {
  return cols.map((col) => col.field).join(separator);
};

const _generateRow = (row, cols, separator = ',') => {
  const fields = [cols.map((col) => row[col.field])];
  const csvLine = CSV.write(fields, separator);
  // CSV.write(...) adds a newline at the end of the string, we need to remove it before returning the row
  return csvLine.replace(/\r?\n$/, '');
};

const _generateRows = (rows, cols, colSep = ',', rowSep = '\n') => {
  return rows.map((row) => _generateRow(row, cols, colSep)).join(rowSep);
};

const toCSV = (rows, nestedCols, options) => {
  if (nestedCols == null || nestedCols.length === 0) {
    return { error: [`Cols must be defined`] };
  }
  const cols = getFlattenColumnsWithoutGroups(nestedCols);

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

// TODO: some metadata of cols & options ('acceptsEmptyFields', columns types, dates format, ...) are not used right
// now, but they could be used in a future version to improve the format of the exported Excel file
const toXLSX = (rows, nestedCols, options) => {
  if (!rows) {
    rows = [];
  }
  const cols = getFlattenColumnsWithoutGroups(nestedCols);

  options = {
    ...DEFAULT_XLSX_EXPORT_OPTIONS,
    ...options,
  };
  const header = options.writeHeader ? cols.map((col) => col.field) : null;
  return XLSXUtils.write(rows, header);
};

const fromXLSX = async (fileBlob, hasHeader = true, nestedCols, options) => {
  if (!hasHeader && !nestedCols) {
    return { error: [new PanelError('cols must be defined if hasHeader=false', null, null)] };
  }
  if (!fileBlob) {
    return { cols: [], rows: [] };
  }

  let cols = getFlattenColumnsWithoutGroups(nestedCols);
  let rows = [];
  let xlsxLines;
  const emptyCols = _calculateEmptyCols(cols);
  try {
    xlsxLines = await XLSXUtils.read(fileBlob, true, emptyCols.length > 0, cols, options, hasHeader);
    if (emptyCols.length > 0) xlsxLines = _processTableToTransformNonAcceptableEmptyCols(xlsxLines, emptyCols);
  } catch (err) {
    return { error: [new PanelError(err?.message || err, fileBlob.name, err?.stack || null)] };
  }
  if (!cols || cols.length === 0) {
    cols = _buildCols(xlsxLines[0]);
  }
  const errors = _validateFormat(xlsxLines, hasHeader, cols, options);
  if (errors.length > 0) return { error: errors };
  rows = _buildRows(xlsxLines, hasHeader, cols);
  return { cols, rows };
};

const AgGridUtils = {
  fromCSV,
  fromXLSX,
  getFlattenColumnsWithoutGroups,
  getColumnsWithHeaderName,
  toCSV,
  toXLSX,
};

export default AgGridUtils;
