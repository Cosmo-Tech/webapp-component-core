// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { NAME_VALIDATOR } from './constants';

const scenarioExistsInList = (scenarioName, scenarioList) => {
  scenarioName = scenarioName.trim();
  return scenarioList.find((scenario) => scenario.name.trim() === scenarioName) !== undefined;
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

const scenarioNameIsValid = (scenarioName, scenarioList) => {
  scenarioName = scenarioName.trimEnd();
  if (scenarioName.length === 0) {
    return 'emptyScenarioName';
  } else {
    if (scenarioName.match(NAME_VALIDATOR) === null) {
      return 'forbiddenCharsInScenarioName';
    } else if (scenarioExistsInList(scenarioName, scenarioList)) {
      return 'existingScenarioName';
    }
  }
  return null;
};

const getScenarioTree = (scenarioList, compareFn) => {
  const scenarioTree = [];
  // Sort scenario list based on optional user-defined function
  scenarioList.sort(compareFn);
  // Set master & orphan scenarios as root scenarios, and add all their children
  for (const parentScenario of scenarioList) {
    if (
      !parentScenario.parentId ||
      scenarioList.find((grandParent) => grandParent.id === parentScenario.parentId) === undefined
    ) {
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

function countScenariosInTree(treeData) {
  if (!treeData) {
    return 0;
  }
  let count = treeData.length;
  for (const node of treeData) {
    count += countScenariosInTree(node.children);
  }
  return count;
}

const ScenarioUtils = {
  scenarioExistsInList,
  scenarioExistsInTree,
  scenarioNameIsValid,
  getScenarioTree,
  countScenariosInTree,
};

export default ScenarioUtils;
