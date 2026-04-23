export const PRESET_MODES = {
  seguro: {
    label: 'Modo Seguro',
    icon:  '🛡️',
    color: '#4CAF50',
    state: {
      sensorCarril: true,  volumenSensor: 80,
      frenadoAutomatico: 50,
      alertaPuntoCiego: true, volumenPuntoCiego: 80,
      sensorReversa: true, volumenReversa: 80, // <-- NUEVO
      modoClima: 'ninguno', asiento: { altura: 50, inclinacion: 0 },
    },
  },
  personalizado: {
    label: 'Modo Personalizado',
    icon:  '⚙️',
    color: '#2196F3',
    state: {
      sensorCarril: true,  volumenSensor: 50,
      frenadoAutomatico: 30,
      alertaPuntoCiego: false, volumenPuntoCiego: 50,
      sensorReversa: true, volumenReversa: 50, // <-- NUEVO
      modoClima: 'lluvia', asiento: { altura: 60, inclinacion: 10 },
    },
  },
  experto: {
    label: 'Modo Experto',
    icon:  '🏎️',
    color: '#FF5722',
    state: {
      sensorCarril: false, volumenSensor: 30,
      frenadoAutomatico: 15,
      alertaPuntoCiego: true, volumenPuntoCiego: 30,
      sensorReversa: false, volumenReversa: 30, // <-- NUEVO
      modoClima: 'nieve', asiento: { altura: 30, inclinacion: -5 },
    },
  },
};

export const CLIMA_OPTIONS = [
  { key: 'ninguno', label: 'Normal', icon: '☀️',  action: '' },
  { key: 'lluvia',  label: 'Lluvia', icon: '🌧️', action: 'Frenado ABS' },
  { key: 'niebla',  label: 'Niebla', icon: '🌫️', action: 'Faros' },
  { key: 'nieve',   label: 'Nieve',  icon: '❄️',  action: 'Cadena + Sport' },
];

export const DISTANCIAS = [10, 20, 30, 40, 50];

export const AVATAR_OPTIONS = ['🧑', '👩', '👨‍💼', '👩‍💼', '🧓', '👦', '👧', '🤠'];

export const ASIENTO_ALTURA_MIN      =   0;
export const ASIENTO_ALTURA_MAX      = 100;
export const ASIENTO_INCLINACION_MIN = -20;
export const ASIENTO_INCLINACION_MAX =  20;