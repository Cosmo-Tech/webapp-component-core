// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { ValidationUtils } from '..';
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

describe('isValid', () => {
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
