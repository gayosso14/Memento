export class ConfigMemento {
  #state;
  #label;
  #timestamp;
  #profileId;
 
  constructor(state, label, profileId = null) {
    this.#state     = JSON.parse(JSON.stringify(state));
    this.#label     = label;
    this.#timestamp = new Date().toLocaleTimeString();
    this.#profileId = profileId;
  }
 
  getState()     { return JSON.parse(JSON.stringify(this.#state)); }
  getLabel()     { return this.#label; }
  getTimestamp() { return this.#timestamp; }
  getProfileId() { return this.#profileId; }
}
 