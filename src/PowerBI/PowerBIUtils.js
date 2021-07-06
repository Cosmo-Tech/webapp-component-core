// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { PowerBIReportEmbedSimpleFilter, PowerBIReportEmbedMultipleFilter } from './PowerBIReportEmbedFilter';
import { ScenarioDTO } from "./ScenarioDTO";

function constructDynamicValue (filterValue, obj) {
  if (filterValue === undefined) {
    throw new Error('value path is undefined');
  }
  const res = filterValue.split('.').reduce(function (o, k) {
    return o && o[k];
  }, obj);
  if (res === undefined) {
    console.log(filterValue + ' is not a valid path!!! Please adapt the configuration');
  }
  return res;
}

const constructDynamicFilters = (filtersConfig, obj) => {
  const result = [];
  for (const filterConfig of filtersConfig) {
    const filterValues = filterConfig.values;
    let filter;
    if (Array.isArray(filterValues)) {
      const values = [];
      for (const filterValue of filterValues) {
        const value = constructDynamicValue(filterValue, obj, filterConfig);
        if(value !== undefined){
          values.push(value);
        }
      }
      if(values.length !== 0){
        filter = new PowerBIReportEmbedMultipleFilter(filterConfig.target.table, filterConfig.target.column, values);
        result.push(filter);
      }
    } else if (typeof filterValues === 'string') {
      const filterValue = filterConfig.values;
      const value = constructDynamicValue(filterValue, obj, filterConfig);
      if(value !== undefined){
        filter = new PowerBIReportEmbedSimpleFilter(filterConfig.target.table, filterConfig.target.column, [value]);
        result.push(filter);
      }
    }
  }
  return result;
};

const constructScenarioDTO = (scenario, scenarioList) => {
  let result;
  if (scenario !== undefined) {
    let masterId;
    if (scenarioList != undefined) {
      masterId = getMasterScenarioId(scenario,scenarioList);
    }
    result = new ScenarioDTO(scenario.id,
        scenario.name,
        scenario.state,
        scenario?.lastRun?.csmSimulationRun,
        masterId,
        scenario.parentId,
        scenario.ownerId,
        scenario.solutionId)
  }
  return result;
}

// Return the id of the root scenario associated to the current scenario
// If at some point a scenario ancestor of the current scenario can not be
// found, then null is returned
const getMasterScenarioId = (scenario, scenarioList) => {
  if (scenario === null) {
    return null;
  }
  let parentId = scenario.parentId;
  let lastScenarioId = scenario.id;
  while (parentId !== null) {
    const parentScenario = scenarioList.find(el => el.id === parentId);
    // Return null if the parent can not be found
    if (parentScenario === undefined) {
      return null;
    }
    parentId = parentScenario.parentId;
    lastScenarioId = parentScenario.id;
  }
  return lastScenarioId;
};

export const PowerBIUtils = {
  constructDynamicFilters,
  constructScenarioDTO
};
