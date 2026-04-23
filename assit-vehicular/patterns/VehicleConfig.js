// ORIGINATOR – crea y restaura Mementos
import { ConfigMemento } from './ConfigMemento';

export class VehicleConfig {
  constructor() {
    this.state = {
      sensorCarril:      false,
      volumenSensor:     50,
      frenadoAutomatico: 30,
      alertaPuntoCiego:  false,
      volumenPuntoCiego: 50,
      sensorReversa:     true,
      volumenReversa:    50,
      modoClima:         'ninguno',
      asiento: {
        altura:      50,
        inclinacion:  0,
      },
    };
  }

  setState(partial) {
    if (partial.asiento) {
      this.state = {
        ...this.state,
        ...partial,
        asiento: { ...this.state.asiento, ...partial.asiento },
      };
    } else {
      this.state = { ...this.state, ...partial };
    }
  }

  getState()                    { return JSON.parse(JSON.stringify(this.state)); }
  save(label, profileId = null) { return new ConfigMemento(this.state, label, profileId); }
  restore(memento)              { this.state = memento.getState(); }
}