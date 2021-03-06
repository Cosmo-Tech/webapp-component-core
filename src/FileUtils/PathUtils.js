// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const getBaseNameFromFileName = (fileName) => {
  if (fileName.indexOf('.') === -1) {
    return fileName;
  }

  const nameParts = fileName.split('.');
  const extension = nameParts.pop();
  const baseName = nameParts.join('.');
  if (extension.length === 0 || baseName.length === 0) {
    return fileName;
  }
  return baseName;
};

const getExtensionFromFileName = (fileName) => {
  if (fileName.indexOf('.') === -1) {
    return '';
  }

  const nameParts = fileName.split('.');
  const extension = nameParts.pop();
  const baseName = nameParts.join('.');
  if (extension.length === 0 || baseName.length === 0) {
    return '';
  }
  return extension;
};

const PathUtils = {
  getBaseNameFromFileName,
  getExtensionFromFileName,
};

export default PathUtils;
