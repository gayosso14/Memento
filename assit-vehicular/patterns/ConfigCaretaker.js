export class ConfigCaretaker {
  constructor() { this._history = []; }
 
  push(memento)            { this._history.push(memento); }
  pop()                    { return this._history.pop(); }
  getAll()                 { return [...this._history]; }
  getByProfile(profileId)  { return this._history.filter(m => m.getProfileId() === profileId); }
  clear()                  { this._history = []; }
}