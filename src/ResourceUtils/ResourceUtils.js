// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import rfdc from 'rfdc';

const clone = rfdc();

const sortResourceListByName = (resourceList) => {
  if (!Array.isArray(resourceList)) return [];
  return clone(resourceList).sort((resourceA, resourceB) =>
    resourceA.name.toUpperCase() < resourceB.name.toUpperCase() ? -1 : 1
  );
};

const getResourceTree = (resourceList) => {
  const sortedList = [];
  let resourceListCopy = sortResourceListByName(resourceList);

  const buildResourceTree = (idParent, depth) => {
    const resourceListToFilter = [];
    for (const resource of resourceListCopy) {
      const parentNotFound = !resourceList.some((parentScenario) => parentScenario.id === resource.parentId);
      if (resource.parentId === idParent || (idParent === null && parentNotFound)) {
        resource.depth = depth;
        sortedList.push(resource);
        resourceListToFilter.push(resource);
        buildResourceTree(resource.id, depth + 1);
      }
    }
    resourceListCopy = resourceListCopy.filter((resource) => !resourceListToFilter.includes(resource));
  };

  buildResourceTree(null, 0);

  return sortedList;
};

export const getFirstRootResource = (resourceList) => {
  if (resourceList.length > 0) {
    const resourceMasterList = resourceList.filter((resource) => resource.parentId === null);
    if (resourceMasterList.length === 0) {
      // The list has not root resources: they may not be shared with the current user, or the list may be
      // corrupted.
      return sortResourceListByName(resourceList)[0];
    }
    return sortResourceListByName(resourceMasterList)[0];
  } else {
    return null;
  }
};
const ResourceUtils = {
  sortResourceListByName,
  getResourceTree,
  getFirstRootResource,
};

export default ResourceUtils;
