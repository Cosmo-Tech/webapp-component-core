// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import ScenarioUtils from '..';

const scenarioList = [
  { name: 'existing scenario' },
  { name: 'existing scenario 2' },
  { name: 'existing scenario 3' },
  { name: 'existing scenario 4' },
];

describe('scenarioNameIsValid', () => {
  test.each`
    dataStr                     | expectedRes
    ${'new scenario'}           | ${null}
    ${' new scenario '}         | ${null}
    ${'123 scenario'}           | ${null}
    ${'new scenario 132'}       | ${null}
    ${'new scenario *+,_&%§-.'} | ${null}
    ${'new scenario 🚀'}        | ${null}
    ${'existing scenario'}      | ${'existingScenarioName'}
    ${'existing scenario '}     | ${'existingScenarioName'}
    ${' existing scenario '}    | ${'existingScenarioName'}
    ${'existing scenario 2'}    | ${'existingScenarioName'}
    ${'existing scenario 3'}    | ${'existingScenarioName'}
    ${'existing scenario 4'}    | ${'existingScenarioName'}
  `('for "$dataStr" must be $expectedRes', ({ dataStr, expectedRes }) => {
    const res = ScenarioUtils.scenarioNameIsValid(dataStr, scenarioList);
    expect(res).toStrictEqual(expectedRes);
  });
});
