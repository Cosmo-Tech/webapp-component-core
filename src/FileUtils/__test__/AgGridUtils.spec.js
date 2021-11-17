// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import {
  CUSTOMERS_COLS,
  CUSTOMERS_ROWS,
  EXPECTED_ROWS,
  INVALID_CUSTOMERS_ROWS,
  EXPECTED_ERRORS_WITHOUT_COLS,
  EXPECTED_ERRORS_WITH_HEADER,
  EXPECTED_ERRORS_WITHOUT_HEADER,
} from './CustomersData';
import { AgGridUtils } from '..';

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
  const csvData = [headerCols].concat(CUSTOMERS_ROWS);
  const headerOnlyStr = headerCols.join();
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(CUSTOMERS_ROWS);
  const generatedCols = CUSTOMERS_COLS.map((col) => {
    return { field: col.field };
  });

  test.each`
    dataStr                | hasHeader | cols              | expectedRows     | expectedCols
    ${headerOnlyStr}       | ${true}   | ${undefined}      | ${[]}            | ${generatedCols}
    ${headerOnlyStr}       | ${true}   | ${CUSTOMERS_COLS} | ${[]}            | ${CUSTOMERS_COLS}
    ${csvWithHeaderStr}    | ${true}   | ${undefined}      | ${EXPECTED_ROWS} | ${generatedCols}
    ${csvWithHeaderStr}    | ${true}   | ${CUSTOMERS_COLS} | ${EXPECTED_ROWS} | ${CUSTOMERS_COLS}
    ${csvWithoutHeaderStr} | ${false}  | ${CUSTOMERS_COLS} | ${EXPECTED_ROWS} | ${CUSTOMERS_COLS}
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
    expect(res.error).toStrictEqual(['cols must be defined if hasHeader=false']);
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
