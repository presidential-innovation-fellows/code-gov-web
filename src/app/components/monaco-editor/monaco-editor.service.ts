import { Injectable } from '@angular/core';
const map = require('lodash/map');

@Injectable()

export class MonacoEditorService {
  private schemas = {};

  public addSchema(uri, fileMatch, schema) {
    this.schemas[fileMatch] = {
      uri,
      fileMatch,
      schema
    };
  }

  public getSchemas() {
    return map(this.schemas, ({ uri, fileMatch, schema }) => ({
      uri,
      fileMatch,
      schema
    }));
  }
}
