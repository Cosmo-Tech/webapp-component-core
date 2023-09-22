// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { DateUtils } from '..';
const timezoneMock = require('timezone-mock');

// Note: jest has been configured to use GMT timezone (cf jest.config.js in the project root folder)
// The module timezone-mock lets us mock Date objects to apply different timezones in the tests below

describe('decreaseDateByOffset', () => {
  test.each`
    parameter
    ${null}
    ${undefined}
    ${''}
    ${'foo'}
    ${0}
    ${1}
    ${{}}
    ${[]}
    ${'06/32/2022'}
  `('should throw exception if input is "$parameter"', ({ parameter }) => {
    expect(() => DateUtils.decreaseDateByOffset(parameter, 0)).toThrow('"date" parameter must be a Date object');
  });

  test.each`
    timezone                | dateStr                       | offset | expectedUTCString
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'US/Eastern'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'Brazil/East'}        | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'UTC'}                | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'Europe/London'}      | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'Australia/Adelaide'} | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Tue, 31 Dec 2024 23:00:00 GMT'}
  `('supports date from $timezone', ({ timezone, dateStr, offset, expectedUTCString }) => {
    timezoneMock.register(timezone);
    let date = new Date(dateStr);
    date = DateUtils.decreaseDateByOffset(date, offset);
    expect(date.toUTCString()).toEqual(expectedUTCString);
  });
});

describe('increaseDateByOffset', () => {
  test.each`
    parameter
    ${null}
    ${undefined}
    ${''}
    ${'foo'}
    ${0}
    ${1}
    ${{}}
    ${[]}
    ${'06/32/2022'}
  `('should throw exception if input is "$parameter"', ({ parameter }) => {
    expect(() => DateUtils.increaseDateByOffset(parameter, 0)).toThrow('"date" parameter must be a Date object');
  });

  test.each`
    timezone                | dateStr                       | offset | expectedUTCString
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'US/Eastern'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'Brazil/East'}        | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'UTC'}                | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'Europe/London'}      | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'Australia/Adelaide'} | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00.000Z'} | ${60}  | ${'Wed, 01 Jan 2025 01:00:00 GMT'}
  `('supports date from $timezone', ({ timezone, dateStr, offset, expectedUTCString }) => {
    timezoneMock.register(timezone);
    let date = new Date(dateStr);
    date = DateUtils.increaseDateByOffset(date, offset);
    expect(date.toUTCString()).toEqual(expectedUTCString);
  });
});

describe('addLocalDateToUTCOffset', () => {
  test.each`
    parameter
    ${null}
    ${undefined}
    ${''}
    ${'foo'}
    ${0}
    ${1}
    ${{}}
    ${[]}
    ${'06/32/2022'}
  `('should throw exception if input is "$parameter"', ({ parameter }) => {
    expect(() => DateUtils.addLocalDateToUTCOffset(parameter, 0)).toThrow('"date" parameter must be a Date object');
  });

  test.each`
    timezone
    ${'US/Pacific'}
    ${'US/Eastern'}
    ${'Brazil/East'}
    ${'UTC'}
    ${'Europe/London'}
    ${'Australia/Adelaide'}
    ${'US/Pacific'}
  `('supports date from $timezone', ({ timezone }) => {
    timezoneMock.register(timezone);
    const winterTimeDate = new Date('2025-01-01 00:00:00');
    const summerTimeDate = new Date('2025-07-01 00:00:00');
    const winterTimeDateFromUTC = new Date('2025-01-01T00:00:00.000Z');
    const summerTimeDateFromUTC = new Date('2025-07-01T00:00:00.000Z');

    const winterTimeLocalDate = DateUtils.addLocalDateToUTCOffset(winterTimeDateFromUTC);
    const summerTimeLocalDate = DateUtils.addLocalDateToUTCOffset(summerTimeDateFromUTC);
    expect(winterTimeDate.toISOString()).toEqual(winterTimeLocalDate.toISOString());
    expect(summerTimeDate.toISOString()).toEqual(summerTimeLocalDate.toISOString());
  });
});

describe('addUTCToLocalDateOffset', () => {
  test.each`
    parameter
    ${null}
    ${undefined}
    ${''}
    ${'foo'}
    ${0}
    ${1}
    ${{}}
    ${[]}
    ${'06/32/2022'}
  `('should throw exception if input is "$parameter"', ({ parameter }) => {
    expect(() => DateUtils.addUTCToLocalDateOffset(parameter, 0)).toThrow('"date" parameter must be a Date object');
  });

  test.each`
    timezone
    ${'US/Pacific'}
    ${'US/Eastern'}
    ${'Brazil/East'}
    ${'UTC'}
    ${'Europe/London'}
    ${'Australia/Adelaide'}
    ${'US/Pacific'}
  `('supports date from $timezone', ({ timezone }) => {
    timezoneMock.register(timezone);
    const winterTimeDate = DateUtils.addUTCToLocalDateOffset(new Date('2025-01-01 00:00:00'));
    expect(winterTimeDate.toISOString()).toEqual('2025-01-01T00:00:00.000Z');
    const summerTimeDate = DateUtils.addUTCToLocalDateOffset(new Date('2025-07-01 00:00:00'));
    expect(summerTimeDate.toISOString()).toEqual('2025-07-01T00:00:00.000Z');
  });
});

describe('getDateAtMidnightUTC', () => {
  test.each`
    parameter
    ${null}
    ${undefined}
    ${''}
    ${'foo'}
    ${0}
    ${1}
    ${{}}
    ${[]}
    ${'06/32/2022'}
  `('should throw exception if input is "$parameter"', ({ parameter }) => {
    expect(() => DateUtils.getDateAtMidnightUTC(parameter, 0)).toThrow('"date" parameter must be a Date object');
  });

  const dates = [
    { input: '2025-01-01T00:00:00Z', output: '2025-01-01T00:00:00.000Z' },
    { input: '2025-01-01T01:23:45Z', output: '2025-01-01T00:00:00.000Z' },
    { input: '2025-01-01T12:00:00Z', output: '2025-01-01T00:00:00.000Z' },
    { input: '2025-01-01T19:00:00Z', output: '2025-01-01T00:00:00.000Z' },
    { input: '2025-01-01T23:59:59Z', output: '2025-01-01T00:00:00.000Z' },
    { input: '2025-07-01T00:00:00Z', output: '2025-07-01T00:00:00.000Z' },
    { input: '2025-07-01T01:23:45Z', output: '2025-07-01T00:00:00.000Z' },
    { input: '2025-07-01T12:00:00Z', output: '2025-07-01T00:00:00.000Z' },
    { input: '2025-07-01T19:00:00Z', output: '2025-07-01T00:00:00.000Z' },
    { input: '2025-07-01T23:59:59Z', output: '2025-07-01T00:00:00.000Z' },
  ];

  test.each`
    timezone                | dateStr                   | expectedResAsISOString
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'US/Eastern'}         | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Brazil/East'}        | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'UTC'}                | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Europe/London'}      | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Australia/Adelaide'} | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'US/Pacific'}         | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'US/Eastern'}         | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Brazil/East'}        | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'UTC'}                | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Europe/London'}      | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
    ${'Australia/Adelaide'} | ${'2025-01-01T00:00:00Z'} | ${'2025-01-01T00:00:00.000Z'}
  `(
    'can correctly convert dates to midnight UTC in timezone $timezone',
    ({ timezone, dateStr, expectedResAsISOString }) => {
      timezoneMock.register(timezone);
      dates.forEach((date) => {
        expect(DateUtils.getDateAtMidnightUTC(new Date(date.input)).toISOString()).toEqual(date.output);
      });
    }
  );
});
