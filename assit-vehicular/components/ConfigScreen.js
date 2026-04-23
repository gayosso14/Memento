import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av'; // <-- 1. Importamos Audio de expo-av
import { SectionCard, Row, StatusBadge } from './SharedComponents';
import { AsientoScreen }                  from './AsientoScreen';
import { styles }                         from '../styles/styles';
import { PRESET_MODES, CLIMA_OPTIONS, DISTANCIAS } from '../constants/appConstants';

const PASO_VOLUMEN = 10;
const VOLUMEN_MINIMO = 20; // <-- 2. Definimos el volumen mínimo en 20%

function iconoVolumen(v) {
  if (v <= 30)  return '🔈';
  if (v <= 70)  return '🔉';
  return '🔊';
}

function colorVolumen(v) {
  if (v <= 30) return '#4CAF50'; // Verde
  if (v <= 70) return '#FF9800'; // Naranja
  return '#F44336';              // Rojo
}

// 3. Modificamos el componente para que reciba una URL de sonido
function ControlVolumen({ label, valor, onChange, soundUrl }) {
  const [sound, setSound] = useState();

  // Función para reproducir sonido con el volumen seleccionado
  async function playSoundPreview(currentVolume) {
    if (!soundUrl) return;
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: soundUrl },
        { volume: currentVolume / 100 } // Expo-av usa volumen de 0.0 a 1.0
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.log('Error reproduciendo sonido:', error);
    }
  }

  // Limpieza de memoria para los sonidos
  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  },[sound]);

  // Lógica para ajustar volumen asegurando el MÍNIMO de 20%
  const ajustar = (delta) => {
    const nuevo = Math.min(100, Math.max(VOLUMEN_MINIMO, valor + delta));
    onChange(nuevo);
    playSoundPreview(nuevo); // Reproducimos preview al cambiar
  };

  // Cuando el usuario presiona un segmento (cuadrito) directamente
  const setDirecto = (v) => {
    const nuevo = Math.max(VOLUMEN_MINIMO, v); // Si presiona 10%, lo fuerza a 20%
    onChange(nuevo);
    playSoundPreview(nuevo);
  };

  return (
    <View style={styles.volumenContainer}>
      <View style={styles.volumenHeader}>
        <Text style={styles.volumenIcono}>{iconoVolumen(valor)}</Text>
        <Text style={styles.volumenLabel}>{label}</Text>
        <Text style={styles.volumenValor}>{valor}%</Text>
      </View>

      <View style={styles.barraFondo}>
        <View style={[styles.barraRelleno, { width: `${valor}%`, backgroundColor: colorVolumen(valor) }]} />
      </View>

      <View style={styles.volumenControles}>
        <TouchableOpacity
          style={[styles.volumenBtn, valor <= VOLUMEN_MINIMO && styles.asientoBtnDisabled]}
          onPress={() => ajustar(-PASO_VOLUMEN)}
          disabled={valor <= VOLUMEN_MINIMO} // Se deshabilita si es 20 o menos
        >
          <Text style={styles.volumenBtnText}>−</Text>
        </TouchableOpacity>

        <View style={styles.volumenSegmentos}>
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
            <TouchableOpacity
              key={v}
              style={[
                styles.volumenSegmento, 
                { backgroundColor: valor >= v ? colorVolumen(valor) : '#21262D' }
              ]}
              onPress={() => setDirecto(v)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.volumenBtn, valor >= 100 && styles.asientoBtnDisabled]}
          onPress={() => ajustar(+PASO_VOLUMEN)}
          disabled={valor >= 100}
        >
          <Text style={styles.volumenBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function ConfigScreen({ config, updateConfig, applyPreset, onSave, perfilActivo }) {
  const handleGuardar = () => {
    if (!perfilActivo) {
      Alert.alert('⚠️ Sin perfil', 'Ve a la pestaña 👤 Perfiles y selecciona o crea un perfil primero.');
      return;
    }
    onSave();
  };

  return (
    <>
      {perfilActivo ? (
        <View style={styles.headerPerfilBadge}>
          <Text style={styles.headerPerfilText}>{perfilActivo.avatar}  Guardando en: {perfilActivo.nombre}</Text>
        </View>
      ) : (
        <View style={[styles.headerPerfilBadge, { borderColor: '#FF980055', backgroundColor: '#FF980011' }]}>
          <Text style={[styles.headerPerfilText, { color: '#FF9800' }]}>⚠️  Selecciona un perfil para guardar</Text>
        </View>
      )}

      <SectionCard title="Modos de Conducción (Memento)">
        <View style={styles.presetRow}>
          {Object.entries(PRESET_MODES).map(([key, p]) => (
            <TouchableOpacity
              key={key}
              style={[styles.presetBtn, { borderColor: p.color }]}
              onPress={() => applyPreset(key)}
            >
              <Text style={styles.presetIcon}>{p.icon}</Text>
              <Text style={[styles.presetLabel, { color: p.color }]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard title=" Sensores – Mantenerse en el Carril">
        <Row
          label="Sensor activo"
          right={
            <Switch
              value={config.sensorCarril}
              onValueChange={(v) => updateConfig({ sensorCarril: v })}
              trackColor={{ false: '#333', true: '#4CAF50' }}
              thumbColor={config.sensorCarril ? '#fff' : '#aaa'}
            />
          }
        />
        <StatusBadge active={config.sensorCarril} on="Manteniendo carril" off="Sin asistencia" />
        
        {/* URL del sonido del carril */}
        <ControlVolumen
          label="Volumen de alerta"
          valor={config.volumenSensor}
          onChange={(v) => updateConfig({ volumenSensor: v })}
          soundUrl="https://www.soundjay.com/buttons_c2026/sounds/beep-30b.mp3" 
        />
      </SectionCard>

      {/* NUEVO: Sensor de proximidad de reversa */}
      <SectionCard title=" Sensor de Proximidad en Reversa">
        <Row
          label="Sensor de estacionamiento"
          right={
            <Switch
              value={config.sensorReversa}
              onValueChange={(v) => updateConfig({ sensorReversa: v })}
              trackColor={{ false: '#333', true: '#2196F3' }} // Azul
              thumbColor={config.sensorReversa ? '#fff' : '#aaa'}
            />
          }
        />
        <StatusBadge active={config.sensorReversa} on="Detectando obstáculos " off="Sensor apagado" color="#2196F3" />
        
        <ControlVolumen
          label="Volumen de alerta (Sonar)"
          valor={config.volumenReversa}
          onChange={(v) => updateConfig({ volumenReversa: v })}
          // Un sonido de "doble beep" muy similar al de los autos al retroceder
          soundUrl="https://www.soundjay.com/buttons_c2026/sounds/beep-09.mp3" 
        />
      </SectionCard>

      <SectionCard title=" Distancia de Frenado Automático">
        <Text style={styles.bigValue}>{config.frenadoAutomatico} m</Text>
        <View style={styles.sliderBtns}>
          {DISTANCIAS.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.sliderBtn, config.frenadoAutomatico === v && styles.sliderBtnActive]}
              onPress={() => updateConfig({ frenadoAutomatico: v })}
            >
              <Text style={[styles.sliderBtnText, config.frenadoAutomatico === v && styles.sliderBtnTextActive]}>
                {v}m
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <SectionCard title=" Alerta de Punto Ciego">
        <Row
          label="Alertas activas"
          right={
            <Switch
              value={config.alertaPuntoCiego}
              onValueChange={(v) => updateConfig({ alertaPuntoCiego: v })}
              trackColor={{ false: '#333', true: '#FF9800' }}
              thumbColor={config.alertaPuntoCiego ? '#fff' : '#aaa'}
            />
          }
        />
        <StatusBadge active={config.alertaPuntoCiego} on="Monitoreando flancos" off="Sin monitoreo" color="#FF9800" />
        
        {/*URL de la alerta de punto ciego */}
        <ControlVolumen
          label="Volumen de alerta"
          valor={config.volumenPuntoCiego}
          onChange={(v) => updateConfig({ volumenPuntoCiego: v })}
          soundUrl="https://www.soundjay.com/misc_c2026/sounds/censor-beep-01.mp3"
        />
      </SectionCard>

      <SectionCard title=" Modo Clima">
        <View style={styles.climaGrid}>
          {CLIMA_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.climaBtn, config.modoClima === opt.key && styles.climaBtnActive]}
              onPress={() => updateConfig({ modoClima: opt.key })}
            >
              <Text style={styles.climaIcon}>{opt.icon}</Text>
              <Text style={[styles.climaLabel, config.modoClima === opt.key && styles.climaLabelActive]}>
                {opt.label}
              </Text>
              {opt.action ? <Text style={styles.climaAction}>{opt.action}</Text> : null}
            </TouchableOpacity>
          ))}
        </View>
      </SectionCard>

      <AsientoScreen
        asiento={config.asiento}
        onUpdate={(cambio) => updateConfig({ asiento: cambio })}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleGuardar}>
        <Text style={styles.saveBtnText}>
          💾  Guardar configuración{perfilActivo ? ` (${perfilActivo.nombre})` : ''}
        </Text>
      </TouchableOpacity>
    </>
  );
}