import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function GovCard({ title, children, style }) {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.header}>{title.toUpperCase()}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  header: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary, marginBottom: 12, letterSpacing: 1 },
});