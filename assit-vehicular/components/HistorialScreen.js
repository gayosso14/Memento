import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SectionCard } from './SharedComponents';
import { styles }      from '../styles/styles';

export function HistorialScreen({ history, onRestore }) {
  return (
    <SectionCard title={`Historial de Configuraciones (${history.length})`}>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No hay configuraciones guardadas aún.</Text>
      ) : (
        [...history].reverse().map((memento, idx) => {
          const s = memento.getState();
          return (
            <View key={idx} style={styles.histItem}>
              <View style={styles.histInfo}>
                <Text style={styles.histLabel}>{memento.getLabel()}</Text>
                <Text style={styles.histTime}>{memento.getTimestamp()}</Text>
                <Text style={styles.histDetail}>
                  Carril: {s.sensorCarril ? '✅' : '❌'}  •  Freno: {s.frenadoAutomatico}m  •  Ciego: {s.alertaPuntoCiego ? '✅' : '❌'}  •  Reversa: {s.sensorReversa ? '✅' : '❌'}  •  Clima: {s.modoClima}   </Text>
                <Text style={styles.histDetail}>
                  🪑 Altura: {s.asiento?.altura ?? '—'}  •  Inclinación: {s.asiento?.inclinacion ?? '—'}°
                </Text>
              </View>
              <TouchableOpacity style={styles.restoreBtn} onPress={() => onRestore(memento)}>
                <Text style={styles.restoreBtnText}>🔄</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </SectionCard>
  );
}