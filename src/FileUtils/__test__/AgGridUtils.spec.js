// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { AgGridUtils } from '..';
import { Error } from '../../models';
import {
  FLAT_ATHLETE_COLS,
  ATHLETE_COLS_DEPTH_1,
  ATHLETE_COLS_WITH_NULL_COLUMN_AND_DEPTH_3,
  CUSTOMERS_COLS,
  CUSTOMERS_COLS_DEPRECATED,
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
  EXPECTED_CSV_OUTPUT_WITH_DELIMITERS,
  SIMPLE_AGGRID_FORMATTED_ROWS_WITH_DELIMITERS,
} from './CustomersData';

const buildCSVStr = (csvData) => csvData.map((csvRow) => csvRow.join()).join('\n');

describe('flatten arrays of columns & columns groups', () => {
  test.each`
    description                     | columns                                      | expected             | warningCount
    ${'null'}                       | ${null}                                      | ${[]}                | ${1}
    ${'undefined'}                  | ${undefined}                                 | ${[]}                | ${1}
    ${'flat array of columns'}      | ${FLAT_ATHLETE_COLS}                         | ${FLAT_ATHLETE_COLS} | ${0}
    ${'nested arrays of columns'}   | ${ATHLETE_COLS_DEPTH_1}                      | ${FLAT_ATHLETE_COLS} | ${0}
    ${'nested array with warnings'} | ${ATHLETE_COLS_WITH_NULL_COLUMN_AND_DEPTH_3} | ${FLAT_ATHLETE_COLS} | ${2}
  `('$description flattened with $warningCount warnings', ({ columns, expected, warningCount }) => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(AgGridUtils.getFlattenColumnsWithoutGroups(columns)).toStrictEqual(expected);
    expect(warn).toHaveBeenCalledTimes(warningCount);
    warn.mockReset();
  });
});

describe('parse valid CSV strings', () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const options = { dateFormat: 'dd/MM/yyyy' };
  test.each`
    hasHeader | cols
    ${true}   | ${undefined}
    ${true}   | ${[]}
    ${true}   | ${CUSTOMERS_COLS}
    ${true}   | ${CUSTOMERS_COLS_DEPRECATED}
    ${false}  | ${[]}
    ${false}  | ${CUSTOMERS_COLS}
    ${false}  | ${CUSTOMERS_COLS_DEPRECATED}
  `('empty CSV string with hasHeader="$hasHeader" and cols="$cols"', ({ hasHeader, cols }) => {
    const res = AgGridUtils.fromCSV('', hasHeader, cols, options);
    expect(res.error).toStrictEqual(undefined);
    expect(res.cols).toStrictEqual([]);
    expect(res.rows).toStrictEqual([]);
    warn.mockReset();
  });

  const flattenCols = AgGridUtils.getFlattenColumnsWithoutGroups(CUSTOMERS_COLS);
  const headerCols = flattenCols.map((col) => col.field);
  const csvData = [headerCols].concat(COMPLEX_CUSTOMERS_ROWS);
  const headerOnlyStr = headerCols.join();
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(COMPLEX_CUSTOMERS_ROWS);
  const generatedCols = flattenCols.map((col) => ({ field: col.field }));

  test.each`
    dataStr                | hasHeader | cols              | expectedRows                        | expectedCols
    ${headerOnlyStr}       | ${true}   | ${undefined}      | ${[]}                               | ${generatedCols}
    ${headerOnlyStr}       | ${true}   | ${CUSTOMERS_COLS} | ${[]}                               | ${flattenCols}
    ${csvWithHeaderStr}    | ${true}   | ${undefined}      | ${UNCHANGED_AGGRID_FORMATTED_ROWS2} | ${generatedCols}
    ${csvWithHeaderStr}    | ${true}   | ${CUSTOMERS_COLS} | ${COMPLEX_AGGRID_FORMATTED_ROWS}    | ${flattenCols}
    ${csvWithoutHeaderStr} | ${false}  | ${CUSTOMERS_COLS} | ${COMPLEX_AGGRID_FORMATTED_ROWS}    | ${flattenCols}
  `('$#: with hasHeader="$hasHeader" and cols="$cols"', ({ dataStr, hasHeader, cols, expectedRows, expectedCols }) => {
    const res = AgGridUtils.fromCSV(dataStr, hasHeader, cols, options);
    expect(res.error).toStrictEqual(undefined);
    expect(res.cols).toStrictEqual(expectedCols);
    expect(res.rows).toStrictEqual(expectedRows);
  });
});

describe('parse with invalid parameters', () => {
  test('missing fields definition', () => {
    const res = AgGridUtils.fromCSV('', false, undefined);
    expect(res.error).toStrictEqual([new Error('cols must be defined if hasHeader=false', null, null)]);
  });
});

describe('parse invalid CSV strings', () => {
  const options = { dateFormat: 'dd/MM/yyyy' };
  const headerCols = AgGridUtils.getFlattenColumnsWithoutGroups(CUSTOMERS_COLS).map((col) => col.field);
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

describe('export to CSV string', () => {
  const options = { desc: 'default options' };
  const optionsNoHeader = { desc: 'default options without header', writeHeader: false };
  const customOptions = {
    desc: 'custom options',
    colSep: ';',
    dateFormat: 'dd/MM/yyyy',
    rowSep: '\n\n',
  };

  const headerCols = AgGridUtils.getFlattenColumnsWithoutGroups(CUSTOMERS_COLS).map((col) => col.field);
  const csvHeaderStr = headerCols.join();
  const csvData = [headerCols].concat(SIMPLE_CUSTOMERS_ROWS);
  const csvWithHeaderStr = buildCSVStr(csvData);
  const csvWithoutHeaderStr = buildCSVStr(SIMPLE_CUSTOMERS_ROWS);

  test.each`
    options            | rows                                            | expectedOutput
    ${options}         | ${[]}                                           | ${csvHeaderStr}
    ${options}         | ${SIMPLE_AGGRID_FORMATTED_ROWS}                 | ${csvWithHeaderStr}
    ${optionsNoHeader} | ${[]}                                           | ${''}
    ${optionsNoHeader} | ${SIMPLE_AGGRID_FORMATTED_ROWS}                 | ${csvWithoutHeaderStr}
    ${customOptions}   | ${SIMPLE_AGGRID_FORMATTED_ROWS}                 | ${EXPECTED_CUSTOM_CSV_OUTPUT}
    ${options}         | ${SIMPLE_AGGRID_FORMATTED_ROWS_WITH_DELIMITERS} | ${EXPECTED_CSV_OUTPUT_WITH_DELIMITERS}
  `('$#: with $options.desc, rows="$rows"', ({ options, rows, expectedOutput }) => {
    const res = AgGridUtils.toCSV(rows, CUSTOMERS_COLS, options);
    expect(res).toStrictEqual(expectedOutput);
  });
});

describe('force all columns to have a headerName', () => {
  const columns = [{ field: 'field' }];
  const columnsWithSomeHeaderNames = [
    { field: 'firstField' },
    { field: 'secondField' },
    { field: 'thirdField', headerName: 'Third field ' },
  ];
  const columnsWithGroups = [
    { field: 'firstField' },
    { headerName: 'firstGroup', children: [{ field: 'secondField' }, { field: 'thirdField' }] },
    {
      headerName: 'firstGroup',
      children: [
        { field: 'secondField' },
        { headerName: 'secondGroup', children: [{ field: 'fourthField' }, { field: 'fifthField' }] },
      ],
    },
    { field: 'sixthField', headerName: 'sixthField' },
  ];
  const columnsWithGroupsWithHeaders = [
    { field: 'firstField', headerName: 'firstField' },
    {
      headerName: 'firstGroup',
      children: [
        { field: 'secondField', headerName: 'secondField' },
        { field: 'thirdField', headerName: 'thirdField' },
      ],
    },
    {
      headerName: 'firstGroup',
      children: [
        { field: 'secondField', headerName: 'secondField' },
        {
          headerName: 'secondGroup',
          children: [
            { field: 'fourthField', headerName: 'fourthField' },
            { field: 'fifthField', headerName: 'fifthField' },
          ],
        },
      ],
    },
    { field: 'sixthField', headerName: 'sixthField' },
  ];

  const columnsWithHeaderNames = [
    { field: 'field', headerName: 'First field' },
    { field: 'secondField', headerName: 'Second field' },
  ];
  test.each`
    columns      | result
    ${[]}        | ${[]}
    ${{}}        | ${[]}
    ${null}      | ${[]}
    ${undefined} | ${[]}
    ${''}        | ${[]}
  `('empty array is returned if columns list is invalid', ({ columns, result }) => {
    expect(AgGridUtils.getColumnsWithHeaderName(columns)).toStrictEqual(result);
  });
  test('every column has a headerName', () => {
    AgGridUtils.getColumnsWithHeaderName(columns).forEach((col) => expect(col.headerName).toStrictEqual(col.field));
    AgGridUtils.getColumnsWithHeaderName(columnsWithSomeHeaderNames).forEach((col) =>
      expect(col).toHaveProperty('headerName')
    );
  });
  test('every column has a header name with columnGroups', () => {
    expect(AgGridUtils.getColumnsWithHeaderName(columnsWithGroups)).toStrictEqual(columnsWithGroupsWithHeaders);
  });
  test('headerNames not overridden if provided', () => {
    AgGridUtils.getColumnsWithHeaderName(columnsWithHeaderNames).forEach((col) =>
      expect(col.headerName).not.toStrictEqual(col.field)
    );
  });
});
