// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export class Error {
  constructor(summary, loc, context) {
    this.summary = summary;
    this.loc = loc;
    this.context = context;
  }

  toString() {
    return `Summary: ${this.summary}\n` + `Loc: ${this.loc}\n` + `Context: ${this.context}`;
  }
}
