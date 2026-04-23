import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StatusBar, SafeAreaView } from 'react-native';

import { VehicleConfig }   from './patterns/VehicleConfig';
import { ConfigCaretaker } from './patterns/ConfigCaretaker';
import { ConfigScreen }    from './components/ConfigScreen';
import { HistorialScreen } from './components/HistorialScreen';
import { PerfilesScreen }  from './components/PerfilesScreen';
import { styles }          from './styles/styles';
import { PRESET_MODES }    from './constants/appConstants';

const vehicleConfig = new VehicleConfig();
const caretaker     = new ConfigCaretaker();

const TABS = [
  { key: 'config',   label: '⚙️ Config' },
  { key: 'perfiles', label: '👤 Perfiles' },
  { key: 'historial',label: '📋 Historial' },
];

export default function App() {
  const [config,       setConfig]       = useState(vehicleConfig.getState());
  const [history,      setHistory]      = useState(caretaker.getAll());
  const [activeTab,    setActiveTab]    = useState('config');
  const [perfiles,     setPerfiles]     = useState([]);
  const [perfilActivo, setPerfilActivo] = useState(null);

  const updateConfig = (partial) => {
    vehicleConfig.setState(partial);
    setConfig(vehicleConfig.getState());
  };

  const saveSnapshot = (label) => {
    const profileId = perfilActivo?.id ?? null;
    caretaker.push(vehicleConfig.save(label, profileId));
    setHistory(caretaker.getAll());
    Alert.alert('✅ Guardado', `"${label}" guardado${perfilActivo ? ` en perfil ${perfilActivo.nombre}` : ''}.`);
  };

  const restoreSnapshot = (memento) => {
    vehicleConfig.restore(memento);
    setConfig(vehicleConfig.getState());
    Alert.alert('🔄 Restaurado', `Configuración "${memento.getLabel()}" aplicada.`);
  };

  const applyPreset = (key) => {
    vehicleConfig.setState(PRESET_MODES[key].state);
    setConfig(vehicleConfig.getState());
    saveSnapshot(PRESET_MODES[key].label);
  };

  const crearPerfil = (nombre, avatar) => {
    const nuevo = { id: Date.now().toString(), nombre, avatar };
    setPerfiles(prev => [...prev, nuevo]);
    setPerfilActivo(nuevo);
    Alert.alert('👤 Perfil creado', `Bienvenido, ${nombre}! Perfil activo.`);
  };

  const seleccionarPerfil = (perfil) => {
    setPerfilActivo(perfil);
    Alert.alert('👤 Perfil activo', `${perfil.avatar} ${perfil.nombre} seleccionado.`);
  };

  const eliminarPerfil = (id) => {
    setPerfiles(prev => prev.filter(p => p.id !== id));
    if (perfilActivo?.id === id) setPerfilActivo(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      <View style={styles.header}>
        <Text style={styles.headerIcon}>🚗</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Asistente Vehicular</Text>
        </View>
        {perfilActivo && (
          <View style={styles.headerPerfilBadge}>
            <Text style={styles.headerPerfilText}>{perfilActivo.avatar} {perfilActivo.nombre}</Text>
          </View>
        )}
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'config' && (
          <ConfigScreen
            config={config}
            updateConfig={updateConfig}
            applyPreset={applyPreset}
            perfilActivo={perfilActivo}
            onSave={() => saveSnapshot(`Config ${new Date().toLocaleTimeString()}`)}
          />
        )}
        {activeTab === 'perfiles' && (
          <PerfilesScreen
            perfiles={perfiles}
            perfilActivo={perfilActivo}
            historial={history}
            onSeleccionarPerfil={seleccionarPerfil}
            onCrearPerfil={crearPerfil}
            onEliminarPerfil={eliminarPerfil}
            onRestaurarMemento={(memento) => {
              restoreSnapshot(memento);
              setActiveTab('config');
            }}
          />
        )}
        {activeTab === 'historial' && (
          <HistorialScreen history={history} onRestore={restoreSnapshot} />
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}