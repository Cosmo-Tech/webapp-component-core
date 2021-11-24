// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

function readFileBlobAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

const FileBlobUtils = {
  readFileBlobAsync,
};

export default FileBlobUtils;
