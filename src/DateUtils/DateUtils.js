// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import {
  format as fnsFormat,
  isMatch as fnsIsMatch,
  isValid as fnsIsValid,
  parse as fnsParse,
  parseISO as fnsParseISO,
} from 'date-fns';

const decreaseDateByOffset = (date, offset) => {
  if (date instanceof Date === false) throw new TypeError('"date" parameter must be a Date object');
  return new Date(date - offset * 60 * 1000);
};

const increaseDateByOffset = (date, offset) => {
  return decreaseDateByOffset(date, -offset);
};

const addLocalDateToUTCOffset = (date) => {
  if (date instanceof Date === false) throw new TypeError('"date" parameter must be a Date object');
  // Example: if local time is 15:00, UTC time is 13:00, timezoneOffset is -120, then we need to "increase" the local
  // datetime by -120 to find UTC time
  return increaseDateByOffset(date, date.getTimezoneOffset());
};

const addUTCToLocalDateOffset = (date) => {
  if (date instanceof Date === false) throw new TypeError('"date" parameter must be a Date object');
  return decreaseDateByOffset(date, date.getTimezoneOffset());
};

const getDateAtMidnightUTC = (date) => {
  if (date instanceof Date === false) throw new TypeError('"date" parameter must be a Date object');
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
};

const parse = (dateStr, dateFormat) => {
  try {
    return fnsParse(dateStr, dateFormat, new Date());
  } catch (error) {
    console.error(error);
  }
};

const parseISO = (dateStr) => fnsParseISO(dateStr);

const format = (date, dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX") => {
  if (date) {
    try {
      return fnsFormat(date, dateFormat);
    } catch (error) {
      console.error(error);
    }
  }
  return '';
};

const formatUTCDateAsLocal = (date, dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX") => {
  try {
    const dateWithReverseOffset = addLocalDateToUTCOffset(date);
    return format(dateWithReverseOffset, dateFormat);
  } catch (error) {
    console.error(error);
  }
  return '';
};

// TODO: (breaking change) rename to something like "isFormatValid" to prevent confusion with the check of invalid dates
const isValid = (dateStr, dateFormat) => {
  return fnsIsMatch(dateStr, dateFormat);
};

const isValidDate = (date) => {
  return fnsIsValid(date);
};

const min = (dateA, dateB) => {
  if (dateA && dateB) {
    return dateA < dateB ? dateA : dateB;
  }
};

const max = (dateA, dateB) => {
  if (dateA && dateB) {
    return dateA > dateB ? dateA : dateB;
  }
};

// Same as min, but accepts string parameters and returns a string value
const strMin = (dateStrA, dateStrB, dateFormat) => {
  const dateA = parse(dateStrA, dateFormat);
  const dateB = parse(dateStrB, dateFormat);
  if (dateA && dateB) {
    return dateA < dateB ? dateStrA : dateStrB;
  }
};

// Same as max, but accepts string parameters and returns a string value
const strMax = (dateStrA, dateStrB, dateFormat) => {
  const dateA = parse(dateStrA, dateFormat);
  const dateB = parse(dateStrB, dateFormat);
  if (dateA && dateB) {
    return dateA > dateB ? dateStrA : dateStrB;
  }
};

const DateUtils = {
  decreaseDateByOffset,
  increaseDateByOffset,
  addLocalDateToUTCOffset,
  addUTCToLocalDateOffset,
  getDateAtMidnightUTC,
  parse,
  parseISO,
  format,
  formatUTCDateAsLocal,
  isValid,
  isValidDate,
  min,
  max,
  strMin,
  strMax,
};

export default DateUtils;
