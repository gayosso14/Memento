import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  Modal, FlatList, Alert,
} from 'react-native';
import { SectionCard } from './SharedComponents';
import { styles }      from '../styles/styles';
import { AVATAR_OPTIONS } from '../constants/appConstants';

export function PerfilesScreen({
  perfiles,
  perfilActivo,
  historial,
  onSeleccionarPerfil,
  onCrearPerfil,
  onEliminarPerfil,
  onRestaurarMemento,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre]             = useState('');
  const [avatarElegido, setAvatarElegido] = useState('🧑');

  const confirmarCrear = () => {
    if (!nombre.trim()) {
      Alert.alert('⚠️ Error', 'El nombre no puede estar vacío.');
      return;
    }
    onCrearPerfil(nombre.trim(), avatarElegido);
    setNombre('');
    setAvatarElegido('🧑');
    setModalVisible(false);
  };

  const mementosDelPerfil = perfilActivo
    ? historial.filter(m => m.getProfileId() === perfilActivo.id)
    : [];

  return (
    <>
      <SectionCard title="Perfiles de Conductor">
        {perfiles.length === 0 ? (
          <Text style={styles.emptyText}>No hay perfiles. Crea uno para empezar.</Text>
        ) : (
          perfiles.map((perfil) => {
            const esActivo = perfilActivo?.id === perfil.id;
            return (
              <TouchableOpacity
                key={perfil.id}
                style={[styles.perfilItem, esActivo && styles.perfilItemActivo]}
                onPress={() => onSeleccionarPerfil(perfil)}
                onLongPress={() =>
                  Alert.alert(
                    'Eliminar perfil',
                    `¿Eliminar a "${perfil.nombre}"?`,
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Eliminar', style: 'destructive', onPress: () => onEliminarPerfil(perfil.id) },
                    ]
                  )
                }
              >
                <Text style={styles.perfilAvatar}>{perfil.avatar}</Text>
                <View style={styles.perfilInfo}>
                  <Text style={[styles.perfilNombre, esActivo && styles.perfilNombreActivo]}>
                    {perfil.nombre}
                  </Text>
                  <Text style={styles.perfilSub}>
                    {historial.filter(m => m.getProfileId() === perfil.id).length} configuraciones guardadas
                  </Text>
                </View>
                {esActivo && <Text style={styles.perfilBadge}>ACTIVO</Text>}
              </TouchableOpacity>
            );
          })
        )}

        <TouchableOpacity style={styles.addPerfilBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addPerfilBtnText}>＋  Nuevo Perfil</Text>
        </TouchableOpacity>
      </SectionCard>

      {perfilActivo && (
        <SectionCard title={`Historial de ${perfilActivo.nombre} (${mementosDelPerfil.length})`}>
          {mementosDelPerfil.length === 0 ? (
            <Text style={styles.emptyText}>
              Sin configuraciones guardadas para este perfil.{'\n'}
              Ve a ⚙️ Configuración y pulsa 💾 Guardar.
            </Text>
          ) : (
            [...mementosDelPerfil].reverse().map((memento, idx) => {
              const s = memento.getState();
              return (
                <View key={idx} style={styles.histItem}>
                  <View style={styles.histInfo}>
                    <Text style={styles.histLabel}>{memento.getLabel()}</Text>
                    <Text style={styles.histTime}>{memento.getTimestamp()}</Text>
                    <Text style={styles.histDetail}>
                      Carril: {s.sensorCarril ? '✅' : '❌'}  •  Freno: {s.frenadoAutomatico}m  •  Ciego: {s.alertaPuntoCiego ? '✅' : '❌'}  •  Clima: {s.modoClima}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.restoreBtn} onPress={() => onRestaurarMemento(memento)}>
                    <Text style={styles.restoreBtnText}>🔄</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </SectionCard>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Nuevo Perfil</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Nombre del conductor"
              placeholderTextColor="#555"
              value={nombre}
              onChangeText={setNombre}
              maxLength={20}
            />

            <Text style={styles.modalSubtitle}>Elige un avatar</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_OPTIONS.map((av) => (
                <TouchableOpacity
                  key={av}
                  style={[styles.avatarBtn, avatarElegido === av && styles.avatarBtnActive]}
                  onPress={() => setAvatarElegido(av)}
                >
                  <Text style={styles.avatarEmoji}>{av}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={confirmarCrear}>
                <Text style={styles.modalConfirmText}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}