// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import {
  resourceList,
  expectedResourceTree,
  expectedSortedByNameList,
  resourceListWithMissingParent,
  expectedResourceTreeWithMissingParent,
  listOfOneResource,
  expectedResourceTreeOfOneResource,
} from './ResourceListData';
import ResourceUtils from '../ResourceUtils';

describe('sort resourceList alphabetically', () => {
  test('sort resource list in alphabetical order', () => {
    const sortedResourceList = ResourceUtils.sortResourceListByName(resourceList);
    expect(sortedResourceList).toStrictEqual(expectedSortedByNameList);
  });
});

describe('sort Resource List hierarchically', () => {
  test('sort resource list with right depth with an unsorted list', () => {
    const sortedResourceList = ResourceUtils.getResourceTree(resourceList);
    expect(sortedResourceList).toStrictEqual(expectedResourceTree);
  });

  test('sort resource list function with empty list', () => {
    const sortedResourceList = ResourceUtils.getResourceTree([]);
    expect(sortedResourceList).toStrictEqual([]);
  });

  test('sort resource list function with null list', () => {
    const sortedResourceList = ResourceUtils.getResourceTree(null);
    expect(sortedResourceList).toStrictEqual([]);
  });

  test('sort resource list function with undefined list', () => {
    const sortedResourceList = ResourceUtils.getResourceTree(undefined);
    expect(sortedResourceList).toStrictEqual([]);
  });

  test('sort resource list with a missing parent scenario', () => {
    const sortedResourceList = ResourceUtils.getResourceTree(resourceListWithMissingParent);
    expect(sortedResourceList).toStrictEqual(expectedResourceTreeWithMissingParent);
  });

  test('sort resource list with only one scenario', () => {
    const sortedResourceList = ResourceUtils.getResourceTree(listOfOneResource);
    expect(sortedResourceList).toStrictEqual(expectedResourceTreeOfOneResource);
  });
});

describe('get first root resource', () => {
  test('get first master resource in alphabetic order with unsorted list', () => {
    const firstMasterResource = ResourceUtils.getFirstRootResource(resourceList);
    expect(firstMasterResource.parentId).toBeNull();
    expect(firstMasterResource.name).toStrictEqual(expectedResourceTree[0].name);
  });

  test('get first root resource in alphabetic order with empty list', () => {
    const firstMasterResource = ResourceUtils.getFirstRootResource([]);
    expect(firstMasterResource).toBeNull();
  });
});
