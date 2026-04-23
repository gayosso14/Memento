import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export function SectionCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function Row({ label, right }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {right}
    </View>
  );
}

export function StatusBadge({ active, on, off, color = '#4CAF50' }) {
  return (
    <View style={[styles.badge, {
      backgroundColor: active ? color + '22' : '#33333355',
      borderColor:     active ? color : '#444',
    }]}>
      <Text style={[styles.badgeText, { color: active ? color : '#888' }]}>
        {active ? `● ${on}` : `○ ${off}`}
      </Text>
    </View>
  );
}