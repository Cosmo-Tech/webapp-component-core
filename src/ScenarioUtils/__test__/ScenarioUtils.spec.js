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
    ${'   new scenario'}        | ${'forbiddenCharsInScenarioName'}
    ${'existing scenario'}      | ${'existingScenarioName'}
    ${'existing scenario '}     | ${'existingScenarioName'}
    ${'existing scenario  '}    | ${'existingScenarioName'}
    ${'existing scenario   '}   | ${'existingScenarioName'}
    ${' existing scenario '}    | ${'forbiddenCharsInScenarioName'}
    ${'  existing scenario  '}  | ${'forbiddenCharsInScenarioName'}
    ${'   existing scenario  '} | ${'forbiddenCharsInScenarioName'}
    ${'new scenario *****'}     | ${'forbiddenCharsInScenarioName'}
    ${'new +scenario'}          | ${'forbiddenCharsInScenarioName'}
    ${'new ,scenario'}          | ${'forbiddenCharsInScenarioName'}
    ${'existing scenario 2'}    | ${'existingScenarioName'}
    ${'new.scenario'}           | ${null}
    ${'new_scenario'}           | ${null}
    ${'new & scenario'}         | ${'forbiddenCharsInScenarioName'}
    ${'new % scenario *****'}   | ${'forbiddenCharsInScenarioName'}
    ${'new §scenario *****'}    | ${'forbiddenCharsInScenarioName'}
    ${'new scenario'}           | ${null}
    ${'new-scenario'}           | ${null}
    ${'new---scenario'}         | ${null}
    ${'existing scenario 3'}    | ${'existingScenarioName'}
    ${'---new scenario'}        | ${'forbiddenCharsInScenarioName'}
    ${'_new scenario'}          | ${'forbiddenCharsInScenarioName'}
    ${'.new scenario'}          | ${'forbiddenCharsInScenarioName'}
    ${'new*scenario'}           | ${'forbiddenCharsInScenarioName'}
    ${'new=scenario'}           | ${'forbiddenCharsInScenarioName'}
    ${'new+scenario'}           | ${'forbiddenCharsInScenarioName'}
    ${'new scenario---'}        | ${null}
    ${'existing scenario 4'}    | ${'existingScenarioName'}
    ${'123 scenario'}           | ${null}
    ${'   new scenario   '}     | ${'forbiddenCharsInScenarioName'}
    ${'new scenario 132'}       | ${null}
  `('for $dataStr must be $expectedRes', ({ dataStr, expectedRes }) => {
    const res = ScenarioUtils.scenarioNameIsValid(dataStr, scenarioList);
    expect(res).toStrictEqual(expectedRes);
  });
});
