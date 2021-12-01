// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import {
  CUSTOMERS_COLS,
  SIMPLE_CUSTOMERS_ROWS,
  COMPLEX_CUSTOMERS_ROWS,
  SIMPLE_AGGRID_FORMATTED_ROWS,
  COMPLEX_AGGRID_FORMATTED_ROWS,
  UNCHANGED_AGGRID_FORMATTED_ROWS2,
  INVALID_CUSTOMERS_ROWS,
  EXPECTED_ERRORS_WITHOUT_COLS,
  EXPECTED_ERRORS_WITH_HEADER,
  EXPECTED_ERRORS_WITHOUT_HEADER,
  EXPECTED_CUSTOM_CSV_OUTPUT,
} from './CustomersData';
import { AgGridUtils } from '..';
import { Error } from '../../models';

const buildCSVStr = (csvData) => csvData.map((csvRow) => csvRow.join()).join('\n');

describe('parse valid CSV strings', () => {
  const options = { dateFormat: 'dd/MM/yyyy' };
  test.each`
    hasHeader | cols
    ${true}   | ${undefined}
    ${true}   | ${[]}
    ${true}   | ${CUSTOMERS_COLS}
    ${false}  | ${[]}
    ${false}  | ${CUSTOMERS_COLS}
  `('empty CSV string with hasHeader="$hasHeader" and cols="$cols"', ({ hasHeader, cols }) => {
    const res = AgGridUtils.fromCSV('', hasHeader, cols, options);
    expect(res.error).toStrictEqual(undefined);
    expect(res.cols).toStrictEqual([]);
    expect(res.rows).toStrictEqual([]);
  });

  const headerCols = CUSTOMERS_COLS.map((col) => col.field);
  const csvData = [headerCols].concat(COMPLEX_CUSTOMERS_ROWS);
  const headerOnlyStr = headerCols.join();
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(COMPLEX_CUSTOMERS_ROWS);
  const generatedCols = CUSTOMERS_COLS.map((col) => {
    return { field: col.field };
  });

  test.each`
    dataStr                | hasHeader | cols              | expectedRows                        | expectedCols
    ${headerOnlyStr}       | ${true}   | ${undefined}      | ${[]}                               | ${generatedCols}
    ${headerOnlyStr}       | ${true}   | ${CUSTOMERS_COLS} | ${[]}                               | ${CUSTOMERS_COLS}
    ${csvWithHeaderStr}    | ${true}   | ${undefined}      | ${UNCHANGED_AGGRID_FORMATTED_ROWS2} | ${generatedCols}
    ${csvWithHeaderStr}    | ${true}   | ${CUSTOMERS_COLS} | ${COMPLEX_AGGRID_FORMATTED_ROWS}    | ${CUSTOMERS_COLS}
    ${csvWithoutHeaderStr} | ${false}  | ${CUSTOMERS_COLS} | ${COMPLEX_AGGRID_FORMATTED_ROWS}    | ${CUSTOMERS_COLS}
  `('with hasHeader="$hasHeader" and cols="$cols"', ({ dataStr, hasHeader, cols, expectedRows, expectedCols }) => {
    const res = AgGridUtils.fromCSV(dataStr, hasHeader, cols, options);
    expect(res.error).toStrictEqual(undefined);
    expect(res.cols).toStrictEqual(expectedCols);
    expect(res.rows).toStrictEqual(expectedRows);
  });
});

describe('parse with invalid parameters', () => {
  test('missing columns definition', () => {
    const res = AgGridUtils.fromCSV('', false, undefined);
    expect(res.error).toStrictEqual([new Error('cols must be defined if hasHeader=false', null, null)]);
  });
});

describe('parse invalid CSV strings', () => {
  const options = { dateFormat: 'dd/MM/yyyy' };
  const headerCols = CUSTOMERS_COLS.map((col) => col.field);
  const csvData = [headerCols].concat(INVALID_CUSTOMERS_ROWS);
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(INVALID_CUSTOMERS_ROWS);

  test.each`
    dataStr                | hasHeader | cols              | expectedErrors
    ${csvWithHeaderStr}    | ${true}   | ${undefined}      | ${EXPECTED_ERRORS_WITHOUT_COLS}
    ${csvWithHeaderStr}    | ${true}   | ${CUSTOMERS_COLS} | ${EXPECTED_ERRORS_WITH_HEADER}
    ${csvWithoutHeaderStr} | ${false}  | ${CUSTOMERS_COLS} | ${EXPECTED_ERRORS_WITHOUT_HEADER}
  `('with hasHeader="$hasHeader" and cols="$cols"', ({ dataStr, hasHeader, cols, expectedErrors }) => {
    const res = AgGridUtils.fromCSV(dataStr, hasHeader, cols, options);
    expect(res.error).toStrictEqual(expectedErrors);
    expect(res.cols).toStrictEqual(undefined);
    expect(res.rows).toStrictEqual(undefined);
  });
});

describe('export CSV string', () => {
  const defaultOptions = { desc: 'default options' };
  const defaultOptionsNoHeader = { desc: 'default options without header', writeHeader: false };
  const customOptions = {
    desc: 'custom options',
    colSep: ';',
    dateFormat: 'dd/MM/yyyy',
    rowSep: '\n\n',
  };

  const headerCols = CUSTOMERS_COLS.map((col) => col.field);
  const csvHeaderStr = headerCols.join();
  const csvData = [headerCols].concat(SIMPLE_CUSTOMERS_ROWS);
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(SIMPLE_CUSTOMERS_ROWS);

  test.each`
    options                   | rows                            | cols              | expectedOutput
    ${defaultOptions}         | ${[]}                           | ${CUSTOMERS_COLS} | ${csvHeaderStr}
    ${defaultOptions}         | ${SIMPLE_AGGRID_FORMATTED_ROWS} | ${CUSTOMERS_COLS} | ${csvWithHeaderStr}
    ${defaultOptionsNoHeader} | ${[]}                           | ${CUSTOMERS_COLS} | ${''}
    ${defaultOptionsNoHeader} | ${SIMPLE_AGGRID_FORMATTED_ROWS} | ${CUSTOMERS_COLS} | ${csvWithoutHeaderStr}
    ${customOptions}          | ${SIMPLE_AGGRID_FORMATTED_ROWS} | ${CUSTOMERS_COLS} | ${EXPECTED_CUSTOM_CSV_OUTPUT}
  `('Test $#: with $options.desc, rows="$rows" and cols="$cols"', ({ options, rows, cols, expectedOutput }) => {
    const res = AgGridUtils.toCSV(rows, cols, options);
    expect(res).toStrictEqual(expectedOutput);
  });
});
