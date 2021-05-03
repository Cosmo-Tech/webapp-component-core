// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const scenarioExists = (scenarioName, scenarioTree) => {
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

const getScenarioTree = (scenarioList) => {
  scenarioList.sort()
  const scenarioTree = [];
  for (const parentScenario of scenarioList) {
    if (parentScenario.parentId === undefined) {
      scenarioTree.push(parentScenario);
    }
    parentScenario.children = []
    for (const childScenario of scenarioList) {
      if (childScenario.parentId === parentScenario.id) {
        parentScenario.children.push(childScenario);
      }
    }
  }
  return scenarioTree;
};

const ScenarioUtils = {
  getScenarioTree,
  scenarioExists
};

export default ScenarioUtils
