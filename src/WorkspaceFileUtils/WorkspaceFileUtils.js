// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import fileDownload from 'js-file-download';

async function fetchWorkspaceFile (defaultBasePath, accessToken, organizationId, workspaceId, filePath) {

    const fetchParams = {
        method: 'GET',
        headers: new Headers({
            Authorization: `Bearer ${accessToken}`
        })
    };

    fetch(defaultBasePath + '/organizations/' + organizationId + '/workspaces/' + workspaceId + '/files/download?file_name=' + filePath,
        fetchParams
    )
        .then(response => {
            if (response.status !== 200) {
                throw new Error(`Error when fetching ${filePath}`);
            }
            return response.blob();
        })
        .then(blob => {
            fileDownload(blob, filePath.split('/').pop());
        })
        .catch((error) => console.error(error));
}

const WorkspaceFileUtils = {
    fetchWorkspaceFile
};

export default WorkspaceFileUtils;
