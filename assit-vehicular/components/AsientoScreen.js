import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SectionCard } from './SharedComponents';
import { styles } from '../styles/styles';
import {
  ASIENTO_ALTURA_MIN,
  ASIENTO_ALTURA_MAX,
  ASIENTO_INCLINACION_MIN,
  ASIENTO_INCLINACION_MAX,
} from '../constants/appConstants';

const PASO_ALTURA      = 5;
const PASO_INCLINACION = 1;

export function AsientoScreen({ asiento, onUpdate }) {
  const { altura, inclinacion } = asiento;

  const ajustarAltura = (delta) => {
    const nuevo = Math.min(ASIENTO_ALTURA_MAX, Math.max(ASIENTO_ALTURA_MIN, altura + delta));
    onUpdate({ altura: nuevo });
  };

  const ajustarInclinacion = (delta) => {
    const nuevo = Math.min(ASIENTO_INCLINACION_MAX, Math.max(ASIENTO_INCLINACION_MIN, inclinacion + delta));
    onUpdate({ inclinacion: nuevo });
  };

  const pctAltura = ((altura - ASIENTO_ALTURA_MIN) / (ASIENTO_ALTURA_MAX - ASIENTO_ALTURA_MIN)) * 100;

  const etiquetaInclinacion = () => {
    if (inclinacion < -10) return 'Muy reclinado';
    if (inclinacion < 0)   return 'Reclinado';
    if (inclinacion === 0) return 'Neutro';
    if (inclinacion <= 10) return 'Erguido';
    return 'Muy erguido';
  };

  const etiquetaAltura = () => {
    if (altura <= 25)  return 'Muy bajo';
    if (altura <= 45)  return 'Bajo';
    if (altura <= 60)  return 'Medio';
    if (altura <= 80)  return 'Alto';
    return 'Muy alto';
  };

  return (
    <>
      <SectionCard title="5. Altura del Asiento del Conductor">
        <View style={styles.asientoValorRow}>
          <Text style={styles.asientoValorGrande}>{altura}</Text>
          <Text style={styles.asientoUnidad}>/ 100</Text>
          <View style={[styles.asientoBadge, { backgroundColor: '#1F6FEB22', borderColor: '#58A6FF' }]}>
            <Text style={[styles.asientoBadgeText, { color: '#58A6FF' }]}>{etiquetaAltura()}</Text>
          </View>
        </View>

        <View style={styles.barraFondo}>
          <View style={[styles.barraRelleno, { width: `${pctAltura}%`, backgroundColor: '#58A6FF' }]} />
        </View>

        <View style={styles.asientoControles}>
          <TouchableOpacity
            style={[styles.asientoBtn, altura <= ASIENTO_ALTURA_MIN && styles.asientoBtnDisabled]}
            onPress={() => ajustarAltura(-PASO_ALTURA)}
            disabled={altura <= ASIENTO_ALTURA_MIN}
          >
            <Text style={styles.asientoBtnText}>▼  −{PASO_ALTURA}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.asientoBtnReset} onPress={() => onUpdate({ altura: 50 })}>
            <Text style={styles.asientoBtnResetText}>Centro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.asientoBtn, altura >= ASIENTO_ALTURA_MAX && styles.asientoBtnDisabled]}
            onPress={() => ajustarAltura(+PASO_ALTURA)}
            disabled={altura >= ASIENTO_ALTURA_MAX}
          >
            <Text style={styles.asientoBtnText}>▲  +{PASO_ALTURA}</Text>
          </TouchableOpacity>
        </View>
      </SectionCard>

      <SectionCard title="6. Inclinación del Respaldo">
        <View style={styles.asientoValorRow}>
          <Text style={styles.asientoValorGrande}>{inclinacion > 0 ? `+${inclinacion}` : inclinacion}°</Text>
          <View style={[styles.asientoBadge, {
            backgroundColor: inclinacion < 0 ? '#FF980022' : '#4CAF5022',
            borderColor:     inclinacion < 0 ? '#FF9800'   : '#4CAF50',
          }]}>
            <Text style={[styles.asientoBadgeText, {
              color: inclinacion < 0 ? '#FF9800' : '#4CAF50',
            }]}>
              {etiquetaInclinacion()}
            </Text>
          </View>
        </View>

        <View style={styles.inclinacionVisual}>
          <View style={styles.inclinacionBase} />
          <View style={[
            styles.inclinacionBarra,
            { transform: [{ rotate: `${-inclinacion}deg` }] },
          ]} />
          <View style={styles.inclinacionPivot} />
          <Text style={styles.inclinacionAngulo}>
            {inclinacion > 0 ? `+${inclinacion}°` : `${inclinacion}°`}
          </Text>
        </View>

        <View style={styles.asientoControles}>
          <TouchableOpacity
            style={[styles.asientoBtn, { borderColor: '#FF9800' }, inclinacion <= ASIENTO_INCLINACION_MIN && styles.asientoBtnDisabled]}
            onPress={() => ajustarInclinacion(-PASO_INCLINACION)}
            disabled={inclinacion <= ASIENTO_INCLINACION_MIN}
          >
            <Text style={[styles.asientoBtnText, { color: '#FF9800' }]}>◀  Reclinar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.asientoBtnReset} onPress={() => onUpdate({ inclinacion: 0 })}>
            <Text style={styles.asientoBtnResetText}>Neutro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.asientoBtn, { borderColor: '#4CAF50' }, inclinacion >= ASIENTO_INCLINACION_MAX && styles.asientoBtnDisabled]}
            onPress={() => ajustarInclinacion(+PASO_INCLINACION)}
            disabled={inclinacion >= ASIENTO_INCLINACION_MAX}
          >
            <Text style={[styles.asientoBtnText, { color: '#4CAF50' }]}>Erguir  ▶</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.escalaRow}>
          <Text style={styles.escalaLabel}>−20° reclinado</Text>
          <Text style={styles.escalaLabel}>0°</Text>
          <Text style={styles.escalaLabel}>+20° erguido</Text>
        </View>
      </SectionCard>
    </>
  );
}