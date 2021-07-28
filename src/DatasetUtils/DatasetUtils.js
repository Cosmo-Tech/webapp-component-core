// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const getDatasetNames = (datasets, scenarioDatasets) => {
  if (!scenarioDatasets || !datasets) {
    return '';
  }
  const names = [];
  for (const datasetId of scenarioDatasets) {
    const dataset = datasets.find(el => el.id === datasetId);
    if (dataset) {
      names.push(dataset.name);
    }
  }
  return names.join(', ');
};

const DatasetUtils = {
  getDatasetNames
};

export default DatasetUtils;
