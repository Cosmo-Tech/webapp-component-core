// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

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
  scenarioList.sort(compareFn);
  const scenarioTree = [];
  for (const parentScenario of scenarioList) {
    if (!parentScenario.parentId) {
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

const ScenarioUtils = {
  scenarioExistsInList,
  scenarioExistsInTree,
  getScenarioTree
};

export default ScenarioUtils;
