// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const CUSTOMERS_COLS = [
  { field: 'name', type: [] },
  { field: 'age', type: ['int'], minValue: 0, maxValue: 120 },
  { field: 'canDrinkAlcohol', type: ['bool'] },
  {
    field: 'favoriteDrink',
    type: ['enum'],
    cellEditorParams: { enumValues: ['AppleJuice', 'Beer', 'OrangeJuice', 'Wine'] },
  },
  { field: 'birthday', type: ['date'], minValue: '1900-01-01', maxValue: new Date().toISOString() },
  { field: 'height', type: ['number'], minValue: 0, maxValue: 2.5 },
];

export const CUSTOMERS_ROWS = [
  ['Bob', '10', 'false', 'AppleJuice', '01/04/2011', '1.40'],
  ['Lily', '8', 'false', 'AppleJuice', '09/05/2013', '1.41'],
  ['Maria', '34', 'true', 'Wine', '19/03/1987', '1.90'],
  ['Howard', '34', 'true', 'Beer', '12/05/1987', '1.83'],
];

export const EXPECTED_ROWS = [
  {
    name: 'Bob',
    age: '10',
    canDrinkAlcohol: 'false',
    favoriteDrink: 'AppleJuice',
    birthday: '01/04/2011',
    height: '1.40',
  },
  {
    name: 'Lily',
    age: '8',
    canDrinkAlcohol: 'false',
    favoriteDrink: 'AppleJuice',
    birthday: '09/05/2013',
    height: '1.41',
  },
  { name: 'Maria', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Wine', birthday: '19/03/1987', height: '1.90' },
  { name: 'Howard', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Beer', birthday: '12/05/1987', height: '1.83' },
];

export const INVALID_CUSTOMERS_ROWS = [
  ['MissingColumns'],
  ['Bob', 'bad_int', 'false', 'AppleJuice', '01/01/2000', '1.70'],
  ['Bob', '15', 'bad_bool', 'AppleJuice', '01/01/2000', '1.70'],
  ['Bob', '15', 'false', 'bad_enum', '01/01/2000', '1.70'],
  ['Bob', '15', 'false', 'AppleJuice', 'bad_date', '1.70'],
  ['Bob', '15', 'false', 'AppleJuice', '01/01/2000', 'bad_number'],
  ['Bob', 'bad_int', 'bad_bool', 'bad_enum', 'bad_date', 'bad_number'],
  ['Bob', '15', 'false', 'AppleJuice', '01/01/2000', '1.70'],
];

export const EXPECTED_ERRORS_WITH_HEADER = [
  'Missing columns on line 1: 6 columns expected, but only 1 column found',
  'Incorrect int value on line 2: "bad_int"',
  'Incorrect bool value on line 3: "bad_bool"',
  'Incorrect enum value on line 4: "bad_enum" (expected values are [AppleJuice,Beer,OrangeJuice,Wine])',
  'Incorrect date value on line 5: "bad_date" (expected format is dd/MM/yyyy)',
  'Incorrect number value on line 6: "bad_number"',
  'Incorrect int value on line 7: "bad_int"',
  'Incorrect bool value on line 7: "bad_bool"',
  'Incorrect enum value on line 7: "bad_enum" (expected values are [AppleJuice,Beer,OrangeJuice,Wine])',
  'Incorrect date value on line 7: "bad_date" (expected format is dd/MM/yyyy)',
  'Incorrect number value on line 7: "bad_number"',
];

export const EXPECTED_ERRORS_WITHOUT_COLS = ['Missing columns on line 1: 6 columns expected, but only 1 column found'];

export const EXPECTED_ERRORS_WITHOUT_HEADER = [
  'Missing columns on line 0: 6 columns expected, but only 1 column found',
  'Incorrect int value on line 1: "bad_int"',
  'Incorrect bool value on line 2: "bad_bool"',
  'Incorrect enum value on line 3: "bad_enum" (expected values are [AppleJuice,Beer,OrangeJuice,Wine])',
  'Incorrect date value on line 4: "bad_date" (expected format is dd/MM/yyyy)',
  'Incorrect number value on line 5: "bad_number"',
  'Incorrect int value on line 6: "bad_int"',
  'Incorrect bool value on line 6: "bad_bool"',
  'Incorrect enum value on line 6: "bad_enum" (expected values are [AppleJuice,Beer,OrangeJuice,Wine])',
  'Incorrect date value on line 6: "bad_date" (expected format is dd/MM/yyyy)',
  'Incorrect number value on line 6: "bad_number"',
];
