// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { TableErrorData } from '../../models';

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

export const AGGRID_FORMATTED_ROWS = [
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
  new TableErrorData(
    'Missing columns',
    'Line 1',
    'Missing columns (Line 1) : 6 columns expected, but only 1 column found\n' +
      'Expected data format : "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\n' +
      'Incorrect Row : "MissingColumns"'
  ),
  new TableErrorData(
    'Incorrect int value',
    'Line 2 , Column 1 ("age")',
    'Incorrect int value (Line 2 , Column 1 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new TableErrorData(
    'Incorrect bool value',
    'Line 3 , Column 2 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 3 , Column 2 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new TableErrorData(
    'Incorrect enum value',
    'Line 4 , Column 3 ("favoriteDrink")',
    'Incorrect enum value (Line 4 , Column 3 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new TableErrorData(
    'Incorrect date value',
    'Line 5 , Column 4 ("birthday")',
    'Incorrect date value (Line 5 , Column 4 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new TableErrorData(
    'Incorrect number value',
    'Line 6 , Column 5 ("height")',
    'Incorrect number value (Line 6 , Column 5 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
  new TableErrorData(
    'Incorrect int value',
    'Line 7 , Column 1 ("age")',
    'Incorrect int value (Line 7 , Column 1 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new TableErrorData(
    'Incorrect bool value',
    'Line 7 , Column 2 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 7 , Column 2 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new TableErrorData(
    'Incorrect enum value',
    'Line 7 , Column 3 ("favoriteDrink")',
    'Incorrect enum value (Line 7 , Column 3 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new TableErrorData(
    'Incorrect date value',
    'Line 7 , Column 4 ("birthday")',
    'Incorrect date value (Line 7 , Column 4 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new TableErrorData(
    'Incorrect number value',
    'Line 7 , Column 5 ("height")',
    'Incorrect number value (Line 7 , Column 5 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
];

export const EXPECTED_ERRORS_WITHOUT_COLS = [
  new TableErrorData(
    'Missing columns',
    'Line 1',
    'Missing columns (Line 1) : 6 columns expected, but only 1 column found\nExpected data format ' +
      ': "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\nIncorrect Row : "MissingColumns"'
  ),
];

export const EXPECTED_ERRORS_WITHOUT_HEADER = [
  new TableErrorData(
    'Missing columns',
    'Line 0',
    'Missing columns (Line 0) : 6 columns expected, but only 1 column found\n' +
      'Expected data format : "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\n' +
      'Incorrect Row : "MissingColumns"'
  ),
  new TableErrorData(
    'Incorrect int value',
    'Line 1 , Column 1 ("age")',
    'Incorrect int value (Line 1 , Column 1 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new TableErrorData(
    'Incorrect bool value',
    'Line 2 , Column 2 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 2 , Column 2 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new TableErrorData(
    'Incorrect enum value',
    'Line 3 , Column 3 ("favoriteDrink")',
    'Incorrect enum value (Line 3 , Column 3 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new TableErrorData(
    'Incorrect date value',
    'Line 4 , Column 4 ("birthday")',
    'Incorrect date value (Line 4 , Column 4 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new TableErrorData(
    'Incorrect number value',
    'Line 5 , Column 5 ("height")',
    'Incorrect number value (Line 5 , Column 5 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
  new TableErrorData(
    'Incorrect int value',
    'Line 6 , Column 1 ("age")',
    'Incorrect int value (Line 6 , Column 1 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new TableErrorData(
    'Incorrect bool value',
    'Line 6 , Column 2 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 6 , Column 2 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new TableErrorData(
    'Incorrect enum value',
    'Line 6 , Column 3 ("favoriteDrink")',
    'Incorrect enum value (Line 6 , Column 3 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new TableErrorData(
    'Incorrect date value',
    'Line 6 , Column 4 ("birthday")',
    'Incorrect date value (Line 6 , Column 4 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new TableErrorData(
    'Incorrect number value',
    'Line 6 , Column 5 ("height")',
    'Incorrect number value (Line 6 , Column 5 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
];

export const EXPECTED_CUSTOM_CSV_OUTPUT =
  'name,age,canDrinkAlcohol,favoriteDrink,birthday,height\n\n' +
  'Bob;10;false;AppleJuice;01/04/2011;1.40\n\n' +
  'Lily;8;false;AppleJuice;09/05/2013;1.41\n\n' +
  'Maria;34;true;Wine;19/03/1987;1.90\n\n' +
  'Howard;34;true;Beer;12/05/1987;1.83';
