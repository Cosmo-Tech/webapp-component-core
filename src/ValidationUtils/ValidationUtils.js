// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import validator from 'validator';
import { DateUtils } from '../DateUtils';

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
      return isBool(dataStr);
    case 'date':
      if (!options.dateFormat) {
        console.error("Missing option dateFormat, can't perform date validation.");
        return false;
      }
      return isDate(dataStr, options.dateFormat);
    case 'enum':
      if (!options.enumValues) {
        console.error("Missing option enumValues, can't perform enum validation.");
        return false;
      }
      return isEnum(dataStr, options.enumValues);
    case 'int':
      return isInt(dataStr);
    case 'number':
      return isNumber(dataStr);
    case 'string':
      return isString(dataStr);
    default:
      console.error(`Unknown type "${type}", can't perform type validation.`);
      return false;
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
