// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import validator from 'validator';
import { DateUtils } from '../DateUtils';
import { Error } from '../models';

const forgeTypeError = (value, type, options) => {
  let expected;
  if (type === 'enum') expected = `Expected values: [${options.enumValues.join()}]`;
  else if (type === 'date') expected = `Expected format: ${options.dateFormat}`;

  const error = new Error(`Incorrect ${type} value`, null, `Incorrect value: "${value}" for type ${type}`);
  if (expected) error.context += '\n' + expected;
  return error;
};

const forgeConfigError = (errorContext) => {
  console.warn(`Configuration error: ${errorContext}`);
  return { summary: 'Configuration error', context: errorContext };
};

const isBool = (dataStr) => {
  return validator.isBoolean(dataStr, { loose: true });
};

const isDate = (dataStr, dateFormat) => {
  return DateUtils.isValid(dataStr, dateFormat);
};

const isEnum = (dataStr, enumValues) => {
  return enumValues.indexOf(dataStr) !== -1;
};

const isInt = (dataStr) => {
  return validator.isInt(dataStr);
};

const isNumber = (dataStr) => {
  return validator.isNumeric(dataStr);
};

const isString = (data) => {
  return typeof data === 'string';
};

const isValid = (dataStr, type, options, canBeEmpty = false) => {
  if (canBeEmpty && dataStr === '') {
    return true;
  }
  switch (type) {
    case 'bool':
      return isBool(dataStr) || forgeTypeError(dataStr, type, options);
    case 'date':
      if (!options.dateFormat) return forgeConfigError("Missing option dateFormat, can't perform date validation.");
      return isDate(dataStr, options.dateFormat) || forgeTypeError(dataStr, type, options);
    case 'enum':
      if (!options.enumValues) return forgeConfigError("Missing option enumValues, can't perform enum validation.");
      return isEnum(dataStr, options.enumValues) || forgeTypeError(dataStr, type, options);
    case 'int':
      return isInt(dataStr) || forgeTypeError(dataStr, type, options);
    case 'number':
      return isNumber(dataStr) || forgeTypeError(dataStr, type, options);
    case 'string':
      return isString(dataStr) || forgeTypeError(dataStr, type, options);
    default:
      return forgeConfigError(`Unknown type "${type}", can't perform type validation.`);
  }
};

const ValidationUtils = {
  isBool,
  isDate,
  isEnum,
  isInt,
  isNumber,
  isValid,
};

export default ValidationUtils;
