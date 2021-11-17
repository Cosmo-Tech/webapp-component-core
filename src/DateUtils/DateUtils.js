// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { format as formatDate, isMatch, parse as parseDate } from 'date-fns';

const parse = (dateStr, dateFormat) => {
  try {
    return parseDate(dateStr, dateFormat, new Date());
  } catch (error) {
    console.error(error);
  }
};

const format = (date, dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX") => {
  if (date) {
    try {
      return formatDate(date, dateFormat);
    } catch (error) {
      console.error(error);
    }
  }
  return '';
};

const isValid = (dateStr, dateFormat) => {
  return isMatch(dateStr, dateFormat);
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
  parse,
  format,
  isValid,
  min,
  max,
  strMin,
  strMax,
};

export default DateUtils;
