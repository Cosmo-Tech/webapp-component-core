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

describe('isExtensionInFileTypeFilter', () => {
  test.each`
    extension | fileTypeFilter                  | expectedResult
    ${'txt'}  | ${null}                         | ${false}
    ${'txt'}  | ${undefined}                    | ${false}
    ${'txt'}  | ${0}                            | ${false}
    ${'txt'}  | ${true}                         | ${false}
    ${'txt'}  | ${{}}                           | ${false}
    ${'txt'}  | ${[]}                           | ${false}
    ${null}   | ${null}                         | ${false}
    ${null}   | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${1}      | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${false}  | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${{}}     | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${[]}     | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${''}     | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${'foo'}  | ${'.zip,.csv,.json,.xls,.xlsx'} | ${false}
    ${'zip'}  | ${'.zip,.csv,.json,.xls,.xlsx'} | ${true}
    ${'json'} | ${'.zip,.csv,.json,.xls,.xlsx'} | ${true}
    ${'xlsx'} | ${'.zip,.csv,.json,.xls,.xlsx'} | ${true}
  `(
    'should return "$expectedResult" when checking if "$extension" is allowed by the list "$fileTypeFilter"',
    ({ extension, fileTypeFilter, expectedResult }) => {
      const res = PathUtils.isExtensionInFileTypeFilter(extension, fileTypeFilter);
      expect(res).toStrictEqual(expectedResult);
    }
  );
});
