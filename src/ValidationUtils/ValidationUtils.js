// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import validator from 'validator';
import { DateUtils } from '../DateUtils';
import { Error as PanelError } from '../models';

const forgeTypeError = (value, type, options) => {
  let expected;
  if (type === 'enum') expected = `Expected values: [${options.enumValues.join()}]`;
  else if (type === 'date') expected = `Expected format: ${options?.dateFormat}`;

  const error = new PanelError(`Incorrect ${type} value`, null, `Incorrect value: "${value}" for type ${type}`);
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

const isInRange = (value, minValue, maxValue) => {
  if (value == null) return null;

  let errorMessage;
  if (minValue != null && value < minValue) errorMessage = `Value "${value}" should be greater than ${minValue}`;
  if (maxValue != null && value > maxValue) errorMessage = `Value "${value}" should be less than ${maxValue}`;

  if (errorMessage == null) return true;
  return new PanelError(`Value out of range`, null, errorMessage);
};

const castToDate = (dateOrStrValue, dateFormat) => {
  if (dateOrStrValue == null) return;
  if (dateOrStrValue instanceof Date) return dateOrStrValue;
  if (typeof dateOrStrValue !== 'string') {
    console.warn(`Configuration error: ${dateOrStrValue} is not a string nor a Date.`);
    return;
  }
  if (!isDate(dateOrStrValue, dateFormat)) {
    console.warn(`Configuration error: ${forgeTypeError(dateOrStrValue, 'date', { dateFormat }).context}.`);
    return;
  }

  return DateUtils.parse(dateOrStrValue, dateFormat);
};

const isDateInRange = (value, minDate, maxDate, dateFormat) => {
  const format = DateUtils.format;
  if (value == null) return null;
  if (dateFormat == null) return forgeConfigError("Missing option dateFormat, can't perform date validation.");

  let errorMessage;
  if (minDate != null && value < minDate)
    errorMessage = `Value "${format(value, dateFormat)}" should be greater than ${format(minDate, dateFormat)}`;
  if (maxDate != null && value > maxDate)
    errorMessage = `Value "${format(value, dateFormat)}" should be less than ${format(maxDate, dateFormat)}`;

  if (errorMessage == null) return true;
  return new PanelError(`Value out of range`, null, errorMessage);
};

const isValid = (dataStr, type, options, canBeEmpty = false) => {
  if (canBeEmpty && dataStr === '') {
    return true;
  }
  switch (type) {
    case 'bool':
      return isBool(dataStr) || forgeTypeError(dataStr, type, options);
    case 'date': {
      if (!options?.dateFormat) return forgeConfigError("Missing option dateFormat, can't perform date validation.");

      const valueAsDate = DateUtils.parse(dataStr, options?.dateFormat);
      if (isNaN(valueAsDate.getTime())) return forgeTypeError(dataStr, type, options); // Invalid date

      const minDate = options?.minDate ?? castToDate(options?.minValue, options?.dateFormat);
      const maxDate = options?.maxDate ?? castToDate(options?.maxValue, options?.dateFormat);
      return isDateInRange(valueAsDate, minDate, maxDate, options?.dateFormat);
    }
    case 'enum':
      if (!options.enumValues) return forgeConfigError("Missing option enumValues, can't perform enum validation.");
      return isEnum(dataStr, options.enumValues) || forgeTypeError(dataStr, type, options);
    case 'int':
      if (!isInt(dataStr)) return forgeTypeError(dataStr, type, options);
      return isInRange(Number(dataStr), options?.minValue, options?.maxValue);
    case 'number':
      if (!isNumber(dataStr)) return forgeTypeError(dataStr, type, options);
      return isInRange(Number(dataStr), options?.minValue, options?.maxValue);
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
