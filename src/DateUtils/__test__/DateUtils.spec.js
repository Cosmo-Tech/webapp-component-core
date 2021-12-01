// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { DateUtils } from '..';

// Note: jest has been configured to use GMT timezone (cf jest.config.js in the project root folder)

describe('parse', () => {
  const expectedRes = new Date('2000-01-31T00:00:00.000+00:00');
  test.each`
    dateStr                       | dateFormat
    ${'31/01/2000'}               | ${'dd/MM/yyyy'}
    ${'01-31-2000'}               | ${'MM-dd-yyyy'}
    ${'2000-01-31T00:00:00.000'}  | ${"yyyy-MM-dd'T'HH:mm:ss.SSS"}
    ${'2000-01-31T00:00:00.000Z'} | ${"yyyy-MM-dd'T'HH:mm:ss.SSSX"}
  `('$dateStr with format $dateFormat', ({ dateStr, dateFormat }) => {
    const res = DateUtils.parse(dateStr, dateFormat);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('format', () => {
  const refDate = new Date('2000-01-31T00:00:00.000Z');
  test.each`
    expectedRes                   | dateFormat
    ${'31/01/2000'}               | ${'dd/MM/yyyy'}
    ${'01-31-2000'}               | ${'MM-dd-yyyy'}
    ${'2000-01-31T00:00:00.000'}  | ${"yyyy-MM-dd'T'HH:mm:ss.SSS"}
    ${'2000-01-31T00:00:00.000Z'} | ${"yyyy-MM-dd'T'HH:mm:ss.SSSX"}
    ${'2000-01-31T00:00:00.000Z'} | ${undefined}
  `('$dateStr to format "$dateFormat"', ({ expectedRes, dateFormat }) => {
    const res = DateUtils.format(refDate, dateFormat);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('isValid', () => {
  test.each`
    dateStr                       | dateFormat                      | expectedRes
    ${'31/01/2000'}               | ${'dd/MM/yyyy'}                 | ${true}
    ${'31/1/2000'}                | ${'dd/MM/yyyy'}                 | ${true}
    ${'1/1/2000'}                 | ${'dd/MM/yyyy'}                 | ${true}
    ${'1/1/1'}                    | ${'dd/MM/yyyy'}                 | ${true}
    ${'31/01/9999'}               | ${'dd/MM/yyyy'}                 | ${true}
    ${'32/01/2000'}               | ${'dd/MM/yyyy'}                 | ${false}
    ${'31/13/2000'}               | ${'dd/MM/yyyy'}                 | ${false}
    ${'31/01/00'}                 | ${'dd/MM/yyyy'}                 | ${false}
    ${'01-31-2000'}               | ${'MM-dd-yyyy'}                 | ${true}
    ${'01-32-2000'}               | ${'MM-dd-yyyy'}                 | ${false}
    ${'13-31-2000'}               | ${'MM-dd-yyyy'}                 | ${false}
    ${'01-31-00'}                 | ${'MM-dd-yyyy'}                 | ${false}
    ${'2000-01-31T00:00:00.000'}  | ${"yyyy-MM-dd'T'HH:mm:ss.SSS"}  | ${true}
    ${'2000-01-31T00:00:00.000Z'} | ${"yyyy-MM-dd'T'HH:mm:ss.SSSX"} | ${true}
    ${'2000-01-31T00:00:00.000'}  | ${"yyyy-MM-dd'T'HH:mm:ss.SSSX"} | ${false}
  `('$dateStr vs. format "$dateFormat"', ({ dateStr, dateFormat, expectedRes }) => {
    const res = DateUtils.isValid(dateStr, dateFormat);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('min', () => {
  const date1 = new Date('1999-01-31T00:00:00.000');
  const date2 = new Date('2000-01-31T00:00:00.000');
  const date3 = new Date('2000-02-01T00:00:00.000');
  const date4 = new Date('2000-02-02T00:00:00.000');
  test.each`
    dateA    | dateB    | expectedRes
    ${date1} | ${date2} | ${date1}
    ${date1} | ${date3} | ${date1}
    ${date1} | ${date4} | ${date1}
    ${date2} | ${date3} | ${date2}
    ${date2} | ${date4} | ${date2}
    ${date3} | ${date4} | ${date3}
    ${date4} | ${date1} | ${date1}
  `('$dateA vs. $dateB', ({ dateA, dateB, expectedRes }) => {
    const res = DateUtils.min(dateA, dateB);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('max', () => {
  const date1 = new Date('1999-01-31T00:00:00.000');
  const date2 = new Date('2000-01-31T00:00:00.000');
  const date3 = new Date('2000-02-01T00:00:00.000');
  const date4 = new Date('2000-02-02T00:00:00.000');
  test.each`
    dateA    | dateB    | expectedRes
    ${date1} | ${date2} | ${date2}
    ${date1} | ${date3} | ${date3}
    ${date1} | ${date4} | ${date4}
    ${date2} | ${date3} | ${date3}
    ${date2} | ${date4} | ${date4}
    ${date3} | ${date4} | ${date4}
    ${date4} | ${date1} | ${date4}
  `('$dateA vs. $dateB', ({ dateA, dateB, expectedRes }) => {
    const res = DateUtils.max(dateA, dateB);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('strMin', () => {
  const date1 = '31/01/1999';
  const date2 = '31/01/2000';
  const date3 = '01/02/2000';
  const date4 = '02/02/2000';
  test.each`
    dateA    | dateB    | expectedRes
    ${date1} | ${date2} | ${date1}
    ${date1} | ${date3} | ${date1}
    ${date1} | ${date4} | ${date1}
    ${date2} | ${date3} | ${date2}
    ${date2} | ${date4} | ${date2}
    ${date3} | ${date4} | ${date3}
    ${date4} | ${date1} | ${date1}
  `('$dateA vs. $dateB', ({ dateA, dateB, expectedRes }) => {
    const res = DateUtils.strMin(dateA, dateB, 'dd/MM/yyyy');
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('strMax', () => {
  const date1 = '31/01/1999';
  const date2 = '31/01/2000';
  const date3 = '01/02/2000';
  const date4 = '02/02/2000';
  test.each`
    dateA    | dateB    | expectedRes
    ${date1} | ${date2} | ${date1}
    ${date1} | ${date3} | ${date1}
    ${date1} | ${date4} | ${date1}
    ${date2} | ${date3} | ${date2}
    ${date2} | ${date4} | ${date2}
    ${date3} | ${date4} | ${date3}
    ${date4} | ${date1} | ${date1}
  `('$dateA vs. $dateB', ({ dateA, dateB, expectedRes }) => {
    const res = DateUtils.strMin(dateA, dateB, 'dd/MM/yyyy');
    expect(res).toStrictEqual(expectedRes);
  });
});
