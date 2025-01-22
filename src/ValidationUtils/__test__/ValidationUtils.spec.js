// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { ValidationUtils } from '..';
import { DateUtils } from '../../DateUtils';
import { Error } from '../../models';

describe('isBool', () => {
  test.each`
    dataStr    | expectedRes
    ${'0'}     | ${true}
    ${'1'}     | ${true}
    ${'true'}  | ${true}
    ${'True'}  | ${true}
    ${'TRUE'}  | ${true}
    ${'tRue'}  | ${true}
    ${'false'} | ${true}
    ${'False'} | ${true}
    ${'FALSE'} | ${true}
    ${'falsE'} | ${true}
    ${'yes'}   | ${true}
    ${'no'}    | ${true}
    ${''}      | ${false}
    ${'00'}    | ${false}
    ${'01'}    | ${false}
    ${'10'}    | ${false}
    ${'foo'}   | ${false}
  `('for $dataStr must be $expectedRes', ({ dataStr, expectedRes }) => {
    const res = ValidationUtils.isBool(dataStr);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('isEnum', () => {
  const emptyEnumValues = [];
  const dummyEnumValues = ['A', 'B', 'C'];
  test.each`
    dataStr | enumValues         | expectedRes
    ${''}   | ${emptyEnumValues} | ${false}
    ${'A'}  | ${emptyEnumValues} | ${false}
    ${'F'}  | ${emptyEnumValues} | ${false}
    ${''}   | ${dummyEnumValues} | ${false}
    ${'A'}  | ${dummyEnumValues} | ${true}
    ${'B'}  | ${dummyEnumValues} | ${true}
    ${'C'}  | ${dummyEnumValues} | ${true}
    ${'a'}  | ${dummyEnumValues} | ${false}
    ${'F'}  | ${dummyEnumValues} | ${false}
  `('for $dataStr must be $expectedRes', ({ dataStr, enumValues, expectedRes }) => {
    const res = ValidationUtils.isEnum(dataStr, enumValues);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('isInt', () => {
  test.each`
    dataStr         | expectedRes
    ${'0'}          | ${true}
    ${'1'}          | ${true}
    ${'01'}         | ${true}
    ${'000001'}     | ${true}
    ${'9999999'}    | ${true}
    ${'1234567890'} | ${true}
    ${''}           | ${false}
    ${'a'}          | ${false}
    ${'e'}          | ${false}
    ${'123z'}       | ${false}
    ${' '}          | ${false}
    ${'1 2'}        | ${false}
    ${'1e5'}        | ${false}
    ${'1.5'}        | ${false}
    ${'1,5'}        | ${false}
  `('for $dataStr must be $expectedRes', ({ dataStr, expectedRes }) => {
    const res = ValidationUtils.isInt(dataStr);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('isNumber', () => {
  test.each`
    dataStr         | expectedRes
    ${'0'}          | ${true}
    ${'1'}          | ${true}
    ${'01'}         | ${true}
    ${'000001'}     | ${true}
    ${'9999999'}    | ${true}
    ${'1234567890'} | ${true}
    ${''}           | ${false}
    ${'a'}          | ${false}
    ${'e'}          | ${false}
    ${'123z'}       | ${false}
    ${' '}          | ${false}
    ${'1 2'}        | ${false}
    ${'1e5'}        | ${false}
    ${'1.5'}        | ${true}
    ${'001.500'}    | ${true}
    ${'1,5'}        | ${false}
  `('for $dataStr must be $expectedRes', ({ dataStr, expectedRes }) => {
    const res = ValidationUtils.isNumber(dataStr);
    expect(res).toStrictEqual(expectedRes);
  });
});

describe('isValid detects values with wrong types', () => {
  const options = { dateFormat: 'dd/MM/yyyy', enumValues: ['A', 'B', 'C'] };
  test.each`
    dataStr         | type        | expectedRes
    ${''}           | ${'string'} | ${true}
    ${''}           | ${'int'}    | ${false}
    ${''}           | ${'number'} | ${false}
    ${''}           | ${'date'}   | ${false}
    ${''}           | ${'enum'}   | ${false}
    ${''}           | ${'bool'}   | ${false}
    ${'1'}          | ${'string'} | ${true}
    ${'1'}          | ${'int'}    | ${true}
    ${'1'}          | ${'number'} | ${true}
    ${'1'}          | ${'date'}   | ${false}
    ${'1'}          | ${'enum'}   | ${false}
    ${'1'}          | ${'bool'}   | ${true}
    ${'1.3'}        | ${'string'} | ${true}
    ${'1.3'}        | ${'int'}    | ${false}
    ${'1.3'}        | ${'number'} | ${true}
    ${'1.3'}        | ${'date'}   | ${false}
    ${'1.3'}        | ${'enum'}   | ${false}
    ${'1.3'}        | ${'bool'}   | ${false}
    ${'01/01/2000'} | ${'string'} | ${true}
    ${'01/01/2000'} | ${'int'}    | ${false}
    ${'01/01/2000'} | ${'number'} | ${false}
    ${'01/01/2000'} | ${'date'}   | ${true}
    ${'01/01/2000'} | ${'enum'}   | ${false}
    ${'01/01/2000'} | ${'bool'}   | ${false}
    ${'A'}          | ${'string'} | ${true}
    ${'A'}          | ${'int'}    | ${false}
    ${'A'}          | ${'number'} | ${false}
    ${'A'}          | ${'date'}   | ${false}
    ${'A'}          | ${'enum'}   | ${true}
    ${'A'}          | ${'bool'}   | ${false}
    ${'False'}      | ${'string'} | ${true}
    ${'False'}      | ${'int'}    | ${false}
    ${'False'}      | ${'number'} | ${false}
    ${'False'}      | ${'date'}   | ${false}
    ${'False'}      | ${'enum'}   | ${false}
    ${'False'}      | ${'bool'}   | ${true}
  `('$dataStr is of type $type must be $expectedRes', ({ dataStr, type, expectedRes }) => {
    let additionalContext;
    if (type === 'date') additionalContext = `Expected format: ${options.dateFormat}`;
    else if (type === 'enum') additionalContext = `Expected values: [${options.enumValues.join()}]`;

    const expectedError = new Error(`Incorrect ${type} value`, null, `Incorrect value: "${dataStr}" for type ${type}`);
    if (additionalContext) expectedError.context += '\n' + additionalContext;

    const res = ValidationUtils.isValid(dataStr, type, options);
    expect(res).toStrictEqual(expectedRes || expectedError);
  });
});

describe('isValid accepts values that are not out of range', () => {
  const options = { dateFormat: 'dd/MM/yyyy', enumValues: ['A', 'B', 'C'] };
  const minDateStr = '01/01/2000';
  const maxDateStr = '31/12/2000';
  const minDate = new Date(minDateStr);
  const maxDate = new Date(maxDateStr);
  test.each`
    dataStr         | type        | minValue      | maxValue
    ${'10'}         | ${'int'}    | ${-4}         | ${10}
    ${'1'}          | ${'int'}    | ${-4}         | ${10}
    ${'-1'}         | ${'int'}    | ${-4}         | ${10}
    ${'-4'}         | ${'int'}    | ${-4}         | ${10}
    ${'-999'}       | ${'int'}    | ${undefined}  | ${10}
    ${'999'}        | ${'int'}    | ${-4}         | ${undefined}
    ${'1.5'}        | ${'number'} | ${-1.5}       | ${1.5}
    ${'1.2'}        | ${'number'} | ${-1.5}       | ${1.5}
    ${'-1.2'}       | ${'number'} | ${-1.5}       | ${1.5}
    ${'-1.5'}       | ${'number'} | ${-1.5}       | ${1.5}
    ${'-999.9'}     | ${'number'} | ${undefined}  | ${1.5}
    ${'999.9'}      | ${'number'} | ${-1.5}       | ${undefined}
    ${'01/01/2000'} | ${'date'}   | ${minDate}    | ${maxDate}
    ${'31/12/2000'} | ${'date'}   | ${minDate}    | ${maxDate}
    ${'01/01/2000'} | ${'date'}   | ${minDateStr} | ${maxDateStr}
    ${'31/12/2000'} | ${'date'}   | ${minDateStr} | ${maxDateStr}
    ${'01/01/1800'} | ${'date'}   | ${undefined}  | ${maxDate}
    ${'31/12/2999'} | ${'date'}   | ${minDate}    | ${undefined}
  `(
    '"out of range" error for $dataStr must be "$expectedError"',
    ({ dataStr, type, minValue, maxValue, expectedError }) => {
      const res = ValidationUtils.isValid(dataStr, type, { ...options, minValue, maxValue });
      expect(res).toStrictEqual(true);
    }
  );
});

describe('isValid rejects values out of range', () => {
  const options = { dateFormat: 'dd/MM/yyyy', enumValues: ['A', 'B', 'C'] };
  const minStr = '01/01/2000';
  const maxStr = '31/12/2000';
  const min = DateUtils.parse(minStr, options.dateFormat);
  const max = DateUtils.parse(maxStr, options.dateFormat);
  test.each`
    dataStr         | type        | minValue  | maxValue  | expectedError
    ${'-6'}         | ${'int'}    | ${-4}     | ${10}     | ${'Value "-6" should be greater than -4'}
    ${'11'}         | ${'int'}    | ${-4}     | ${10}     | ${'Value "11" should be less than 10'}
    ${'-1.6'}       | ${'number'} | ${-1.5}   | ${1.5}    | ${'Value "-1.6" should be greater than -1.5'}
    ${'1.6'}        | ${'number'} | ${-1.5}   | ${1.5}    | ${'Value "1.6" should be less than 1.5'}
    ${'31/12/1999'} | ${'date'}   | ${min}    | ${max}    | ${'Value "31/12/1999" should be greater than 01/01/2000'}
    ${'01/01/2001'} | ${'date'}   | ${min}    | ${max}    | ${'Value "01/01/2001" should be less than 31/12/2000'}
    ${'31/12/1999'} | ${'date'}   | ${minStr} | ${maxStr} | ${'Value "31/12/1999" should be greater than 01/01/2000'}
    ${'01/01/2001'} | ${'date'}   | ${minStr} | ${maxStr} | ${'Value "01/01/2001" should be less than 31/12/2000'}
  `(
    '"out of range" error for $dataStr must be "$expectedError"',
    ({ dataStr, type, minValue, maxValue, expectedError }) => {
      const res = ValidationUtils.isValid(dataStr, type, { ...options, minValue, maxValue });
      expect(res).not.toEqual(true);
      expect(res.summary).toStrictEqual('Value out of range');
      expect(res.context).toStrictEqual(expectedError);
    }
  );
});
