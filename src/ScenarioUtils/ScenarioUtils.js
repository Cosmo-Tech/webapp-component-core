// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import rfdc from 'rfdc';

const clone = rfdc();
export const DATASET_PARAM_VARTYPE = '%DATASETID%';
export const SCENARIO_NAME_REGEX_VALIDATOR = /^\w[\w\d\s-]*$/;

const scenarioExistsInList = (scenarioName, scenarioList) => {
  scenarioName = scenarioName.trim();
  return scenarioList.find(scenario => scenario.name.trim() === scenarioName) !== undefined;
};

const scenarioExistsInTree = (scenarioName, scenarioTree) => {
  const treeSearch = (node) => {
    for (const scenario of node) {
      if (scenarioName.trim() === scenario.name.trim() || treeSearch(scenario.children)) {
        return true;
      }
    }
    return false;
  };
  return treeSearch(scenarioTree);
};

const getScenarioTree = (scenarioList, compareFn) => {
  const scenarioTree = [];
  // Sort scenario list based on optional user-defined function
  scenarioList.sort(compareFn);
  // Set master & orphan scenarios as root scenarios, and add all their children
  for (const parentScenario of scenarioList) {
    if (!parentScenario.parentId || scenarioList.find(
      grandParent => grandParent.id === parentScenario.parentId) === undefined) {
      scenarioTree.push(parentScenario);
    }
    parentScenario.children = [];
    for (const childScenario of scenarioList) {
      if (childScenario.parentId === parentScenario.id) {
        parentScenario.children.push(childScenario);
      }
    }
  }
  return scenarioTree;
};

const constructParameterData = (param, value) => {
  return {
    parameterId: param.id,
    varType: param.varType,
    value: value != null ? value : param.defaultValue
  };
};

const getValueFromParameters = (parameters, parameterToSelect) => {
  if (!parameters) {
    return parameterToSelect.defaultValue;
  }
  const param = parameters.find(element => element.parameterId === parameterToSelect.id);
  if (param !== undefined) {
    return param.value;
  }
  return parameterToSelect.defaultValue;
};

const sortScenarioList = (scenarioList) => {
  const sortedList = [];
  let hasMovedScenarios = true;
  while (hasMovedScenarios && scenarioList.length !== 0) {
    const scenarioListCopy = clone(scenarioList);
    hasMovedScenarios = false;
    for (let i = 0; i < scenarioListCopy.length; ++i) {
      const scenario = scenarioListCopy[i];
      if (scenario.parentId === null) {
        sortedList.push(scenario);
        scenario.depth = 0;
        const scenarioId = scenarioList.findIndex((current) => current.id === scenario.id);
        scenarioList.splice(scenarioId, 1);
      } else {
        const parentScenarioId = scenario.parentId;
        const parentPosInSortedList = sortedList.findIndex((current) => current.id === parentScenarioId);
        if (parentPosInSortedList !== -1) {
          scenario.depth = sortedList[parentPosInSortedList].depth + 1;
          sortedList.splice(parentPosInSortedList + 1, 0, scenario);
          const scenarioId = scenarioList.findIndex((current) => current.id === scenario.id);
          scenarioList.splice(scenarioId, 1);
          hasMovedScenarios = true;
        }
      }
    }
  }
  return sortedList;
};

const ScenarioUtils = {
  constructParameterData,
  sortScenarioList,
  getValueFromParameters,
  scenarioExistsInList,
  scenarioExistsInTree,
  getScenarioTree
};

export default ScenarioUtils;
