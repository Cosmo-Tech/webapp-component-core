// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { Error } from '../../models';

export const FLAT_ATHLETE_COLS = [
  { field: 'athlete', params: ['params1', 'params2', 'params3'] },
  { field: 'age' },
  { field: 'country' },
  { field: 'sport' },
  { field: 'total', columnGroupShow: 'closed' },
  { field: 'gold', columnGroupShow: 'open' },
  { field: 'silver', columnGroupShow: 'open' },
  { field: 'bronze', columnGroupShow: 'open' },
];

export const ATHLETE_COLS_DEPTH_1 = [
  {
    headerName: 'Athlete Details',
    children: [{ field: 'athlete', params: ['params1', 'params2', 'params3'] }, { field: 'age' }, { field: 'country' }],
  },
  {
    headerName: 'Sports Results',
    children: [
      { field: 'sport' },
      { field: 'total', columnGroupShow: 'closed' },
      { field: 'gold', columnGroupShow: 'open' },
      { field: 'silver', columnGroupShow: 'open' },
      { field: 'bronze', columnGroupShow: 'open' },
    ],
  },
];

export const ATHLETE_COLS_WITH_NULL_COLUMN_AND_DEPTH_3 = [
  {
    headerName: 'Athlete Details',
    children: [{ field: 'athlete', params: ['params1', 'params2', 'params3'] }, { field: 'age' }, { field: 'country' }],
  },
  {
    headerName: 'Sports Results',
    children: [
      {
        headerName: 'Result',
        children: [
          {
            headerName: 'Sport',
            children: [{ field: 'sport' }, undefined],
          },
        ],
      },
      {
        headerName: 'Void Group',
        children: [],
      },
      { field: 'total', columnGroupShow: 'closed' },
      { field: 'gold', columnGroupShow: 'open' },
      { field: 'silver', columnGroupShow: 'open' },
      { field: 'bronze', columnGroupShow: 'open' },
      null,
    ],
  },
];

export const CUSTOMERS_COLS = [
  {
    headerName: 'identity',
    children: [
      { field: 'name', type: [] },
      { field: 'age', type: ['int'], minValue: 0, maxValue: 120 },
    ],
  },
  { field: 'canDrinkAlcohol', type: ['bool'] },
  { field: 'favoriteDrink', type: ['enum'], enumValues: ['AppleJuice', 'Beer', 'OrangeJuice', 'Wine'] },
  {
    headerName: 'identity',
    children: [
      { field: 'birthday', type: ['date'], minValue: '1900-01-01', maxValue: new Date().toISOString() },
      { field: 'height', type: ['number'], minValue: 0, maxValue: 2.5 },
    ],
  },
];

export const CUSTOMERS_COLS_DEPRECATED = [
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

export const SIMPLE_CUSTOMERS_ROWS = [
  ['Bob', '10', 'false', 'AppleJuice', '01/04/2011', '1.40'],
  ['Lily', '8', 'false', 'AppleJuice', '09/05/2013', '1.41'],
  ['Maria', '34', 'true', 'Wine', '19/03/1987', '1.90'],
  ['Howard', '34', 'true', 'Beer', '12/05/1987', '1.83'],
];

export const COMPLEX_CUSTOMERS_ROWS = [
  ['Bob', '10', 'false', 'AppleJuice', '01/04/2011', '1.40'],
  ['Lily', '8', 'no', 'AppleJuice', '09/05/2013', '1.41'],
  ['Lily', '8', '0', 'AppleJuice', '09/05/2013', '1.41'],
  ['Maria', '34', 'true', 'Wine', '19/03/1987', '1.90'],
  ['Howard', '34', 'yes', 'Beer', '12/05/1987', '1.83'],
  ['Howard', '34', '1', 'Beer', '12/05/1987', '1.83'],
];

export const SIMPLE_AGGRID_FORMATTED_ROWS = [
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
export const SIMPLE_AGGRID_FORMATTED_ROWS_WITH_DELIMITERS = [
  {
    name: '"a,b,c"',
    age: '10',
    canDrinkAlcohol: 'false',
    favoriteDrink: 'AppleJuice',
    birthday: '01/04/2011',
    height: '1.40',
  },
  {
    name: 'a,b,c',
    age: '8',
    canDrinkAlcohol: 'false',
    favoriteDrink: 'AppleJuice',
    birthday: '09/05/2013',
    height: '1.41',
  },
  { name: 'Maria,', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Wine', birthday: '19/03/1987', height: '1.90' },
  { name: 'Howard', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Beer', birthday: '12/05/1987', height: '1.83' },
];

export const COMPLEX_AGGRID_FORMATTED_ROWS = [
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
  { name: 'Howard', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Beer', birthday: '12/05/1987', height: '1.83' },
];

export const UNCHANGED_AGGRID_FORMATTED_ROWS2 = [
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
    canDrinkAlcohol: 'no',
    favoriteDrink: 'AppleJuice',
    birthday: '09/05/2013',
    height: '1.41',
  },
  { name: 'Lily', age: '8', canDrinkAlcohol: '0', favoriteDrink: 'AppleJuice', birthday: '09/05/2013', height: '1.41' },
  { name: 'Maria', age: '34', canDrinkAlcohol: 'true', favoriteDrink: 'Wine', birthday: '19/03/1987', height: '1.90' },
  { name: 'Howard', age: '34', canDrinkAlcohol: 'yes', favoriteDrink: 'Beer', birthday: '12/05/1987', height: '1.83' },
  { name: 'Howard', age: '34', canDrinkAlcohol: '1', favoriteDrink: 'Beer', birthday: '12/05/1987', height: '1.83' },
];

export const INVALID_CUSTOMERS_ROWS = [
  ['MissingColumns'],
  ['Bob', 'bad_int', 'faLSE', 'AppleJuice', '01/01/2000', '1.70'],
  ['Bob', '15', 'bad_bool', 'AppleJuice', '01/01/2000', '1.70'],
  ['Bob', '15', 'TRue', 'bad_enum', '01/01/2000', '1.70'],
  ['Bob', '15', '1', 'AppleJuice', 'bad_date', '1.70'],
  ['Bob', '15', '0', 'AppleJuice', '01/01/2000', 'bad_number'],
  ['Bob', 'bad_int', 'bad_bool', 'bad_enum', 'bad_date', 'bad_number'],
  ['Bob', '15', 'yes', 'AppleJuice', '01/01/2000', '1.70'],
];

export const EXPECTED_ERRORS_WITH_HEADER = [
  new Error(
    'Too few fields',
    'Line 2',
    'Too few fields (Line 2) : Expected 6 fields, found 1\n' +
      'Expected data format : "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\n' +
      'Incorrect Row : "MissingColumns"'
  ),
  new Error(
    'Incorrect int value',
    'Line 3 , Column 2 ("age")',
    'Incorrect int value (Line 3 , Column 2 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new Error(
    'Incorrect bool value',
    'Line 4 , Column 3 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 4 , Column 3 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new Error(
    'Incorrect enum value',
    'Line 5 , Column 4 ("favoriteDrink")',
    'Incorrect enum value (Line 5 , Column 4 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new Error(
    'Incorrect date value',
    'Line 6 , Column 5 ("birthday")',
    'Incorrect date value (Line 6 , Column 5 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new Error(
    'Incorrect number value',
    'Line 7 , Column 6 ("height")',
    'Incorrect number value (Line 7 , Column 6 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
  new Error(
    'Incorrect int value',
    'Line 8 , Column 2 ("age")',
    'Incorrect int value (Line 8 , Column 2 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new Error(
    'Incorrect bool value',
    'Line 8 , Column 3 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 8 , Column 3 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new Error(
    'Incorrect enum value',
    'Line 8 , Column 4 ("favoriteDrink")',
    'Incorrect enum value (Line 8 , Column 4 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new Error(
    'Incorrect date value',
    'Line 8 , Column 5 ("birthday")',
    'Incorrect date value (Line 8 , Column 5 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new Error(
    'Incorrect number value',
    'Line 8 , Column 6 ("height")',
    'Incorrect number value (Line 8 , Column 6 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
];

export const EXPECTED_ERRORS_WITHOUT_COLS = [
  new Error(
    'Too few fields',
    'Line 2',
    'Too few fields (Line 2) : Expected 6 fields, found 1\nExpected data format ' +
      ': "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\nIncorrect Row : "MissingColumns"'
  ),
];

export const EXPECTED_ERRORS_WITHOUT_HEADER = [
  new Error(
    'Too few fields',
    'Line 1',
    'Too few fields (Line 1) : Expected 6 fields, found 1\n' +
      'Expected data format : "name,age,canDrinkAlcohol,favoriteDrink,birthday,height"\n' +
      'Incorrect Row : "MissingColumns"'
  ),
  new Error(
    'Incorrect int value',
    'Line 2 , Column 2 ("age")',
    'Incorrect int value (Line 2 , Column 2 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new Error(
    'Incorrect bool value',
    'Line 3 , Column 3 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 3 , Column 3 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new Error(
    'Incorrect enum value',
    'Line 4 , Column 4 ("favoriteDrink")',
    'Incorrect enum value (Line 4 , Column 4 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new Error(
    'Incorrect date value',
    'Line 5 , Column 5 ("birthday")',
    'Incorrect date value (Line 5 , Column 5 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new Error(
    'Incorrect number value',
    'Line 6 , Column 6 ("height")',
    'Incorrect number value (Line 6 , Column 6 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
  new Error(
    'Incorrect int value',
    'Line 7 , Column 2 ("age")',
    'Incorrect int value (Line 7 , Column 2 ("age"))\nIncorrect value : "bad_int" for type int'
  ),
  new Error(
    'Incorrect bool value',
    'Line 7 , Column 3 ("canDrinkAlcohol")',
    'Incorrect bool value (Line 7 , Column 3 ("canDrinkAlcohol"))\nIncorrect value : "bad_bool" for type bool'
  ),
  new Error(
    'Incorrect enum value',
    'Line 7 , Column 4 ("favoriteDrink")',
    'Incorrect enum value (Line 7 , Column 4 ("favoriteDrink"))\n' +
      'Incorrect value : "bad_enum" for type enum\n' +
      'Expected values: [AppleJuice,Beer,OrangeJuice,Wine]'
  ),
  new Error(
    'Incorrect date value',
    'Line 7 , Column 5 ("birthday")',
    'Incorrect date value (Line 7 , Column 5 ("birthday"))\n' +
      'Incorrect value : "bad_date" for type date\n' +
      'Expected format: dd/MM/yyyy'
  ),
  new Error(
    'Incorrect number value',
    'Line 7 , Column 6 ("height")',
    'Incorrect number value (Line 7 , Column 6 ("height"))\nIncorrect value : "bad_number" for type number'
  ),
];

export const EXPECTED_CUSTOM_CSV_OUTPUT =
  'name,age,canDrinkAlcohol,favoriteDrink,birthday,height\n\n' +
  'Bob;10;false;AppleJuice;01/04/2011;1.40\n\n' +
  'Lily;8;false;AppleJuice;09/05/2013;1.41\n\n' +
  'Maria;34;true;Wine;19/03/1987;1.90\n\n' +
  'Howard;34;true;Beer;12/05/1987;1.83';

export const EXPECTED_CSV_OUTPUT_WITH_DELIMITERS =
  'name,age,canDrinkAlcohol,favoriteDrink,birthday,height\n' +
  '"""a,b,c""",10,false,AppleJuice,01/04/2011,1.40\n' +
  '"a,b,c",8,false,AppleJuice,09/05/2013,1.41\n' +
  '"Maria,",34,true,Wine,19/03/1987,1.90\n' +
  'Howard,34,true,Beer,12/05/1987,1.83';
