import { Context as ContextBase } from 'app-shared/server/Context.js'

export class Context extends ContextBase {
  getAgent() {
    return this._agent ??= this.queries.agents._getAgent()
  }
}