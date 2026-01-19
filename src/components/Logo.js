import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function Logo({ size = 100 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Static Outer Ring (Replacing the pulse) */}
      <View style={[styles.outerRing, { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderColor: Colors.accent + '33' // 33 adds transparency
      }]} />

      {/* Main Logo Circle */}
      <View style={[styles.innerCircle, {
        width: size * 0.8,
        height: size * 0.8,
        borderRadius: size * 0.4,
      }]}>
        <Ionicons name="leaf" size={size * 0.4} color={Colors.accent} />
        
        {/* Decorative horizontal line for government look */}
        <View style={[styles.line, { width: size * 0.4 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    borderWidth: 2,
  },
  innerCircle: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // Professional Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  line: {
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.1,
    marginTop: 5,
  }
});