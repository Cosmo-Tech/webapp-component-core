// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export class ScenarioDTO {
    constructor (id,
                 name,
                 state,
                 csmSimulationRun,
                 masterId,
                 parentId,
                 ownerId,
                 solutionId) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.csmSimulationRun = csmSimulationRun;
        this.masterId = masterId;
        this.parentId = parentId;
        this.ownerId = ownerId;
        this.solutionId = solutionId;
    }
}
