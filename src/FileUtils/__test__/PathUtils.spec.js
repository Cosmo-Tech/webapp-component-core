// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { PathUtils } from '..';

describe('getBaseNameFromFileName', () => {
  test.each`
    fileName         | expectedResult
    ${''}            | ${''}
    ${'.htaccess'}   | ${'.htaccess'}
    ${'.'}           | ${'.'}
    ${'foo'}         | ${'foo'}
    ${'foo.'}        | ${'foo.'}
    ${'foo.csv'}     | ${'foo'}
    ${'foo.bar.csv'} | ${'foo.bar'}
    ${'foo.bar.'}    | ${'foo.bar.'}
    ${'.foo.bar'}    | ${'.foo'}
  `('base name of "$fileName" is "$expectedResult"', ({ fileName, expectedResult }) => {
    const res = PathUtils.getBaseNameFromFileName(fileName);
    expect(res).toStrictEqual(expectedResult);
  });
});

describe('getExtensionFromFileName', () => {
  test.each`
    fileName         | expectedResult
    ${''}            | ${''}
    ${'.htaccess'}   | ${''}
    ${'.'}           | ${''}
    ${'foo'}         | ${''}
    ${'foo.'}        | ${''}
    ${'foo.csv'}     | ${'csv'}
    ${'foo.bar.csv'} | ${'csv'}
    ${'foo.bar.'}    | ${''}
    ${'.foo.bar'}    | ${'bar'}
  `('extension of "$fileName" is "$expectedResult"', ({ fileName, expectedResult }) => {
    const res = PathUtils.getExtensionFromFileName(fileName);
    expect(res).toStrictEqual(expectedResult);
  });
});
