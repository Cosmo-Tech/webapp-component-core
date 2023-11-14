// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import fileDownload from 'js-file-download';

function downloadFileFromData(fileData, fileName) {
  fileDownload(fileData, fileName);
}

function readFileBlobAsync(fileBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(fileBlob);
  });
}

const FileBlobUtils = {
  downloadFileFromData,
  readFileBlobAsync,
};

export default FileBlobUtils;
