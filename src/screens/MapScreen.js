import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

// --- CONFIGURATION ---
const USER_LOC = { latitude: 25.1972, longitude: 55.2744 };

// --- GENERATE DATA (CORRECTED LOGIC) ---
const generateLocations = () => {
  const locations = [];
  const hubs = [
    { lat: 25.2048, lng: 55.2708, city: "Dubai" },
    { lat: 25.0805, lng: 55.1403, city: "Marina" },
    { lat: 24.4672, lng: 54.3667, city: "Abu Dhabi" },
  ];
  let idCounter = 1;
  hubs.forEach(hub => {
    for (let i = 0; i < 20; i++) {
      // FIX: Roll the dice ONCE
      const isOpen = Math.random() > 0.3; // 70% chance open, 30% closed

      locations.push({
        id: idCounter++,
        title: `${hub.city} Bin #${idCounter}`,
        latitude: hub.lat + (Math.random() - 0.5) * 0.1,
        longitude: hub.lng + (Math.random() - 0.5) * 0.1,
        status: isOpen ? "Operational" : "Closed (Bin Full)", // Synced Status
        color: isOpen ? "green" : "red",                     // Synced Color
        isOpen: isOpen // Helper for UI logic
      });
    }
  });
  return locations;
};
const ALL_KIOSKS = generateLocations();

export default function MapScreen() {
  const [selectedKiosk, setSelectedKiosk] = useState(null);
  const [estimates, setEstimates] = useState(null);

  const handleSelectKiosk = (kiosk) => {
    // Calculate Distance & Time
    const R = 6371; 
    const dLat = (kiosk.latitude - USER_LOC.latitude) * (Math.PI / 180);
    const dLon = (kiosk.longitude - USER_LOC.longitude) * (Math.PI / 180);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(USER_LOC.latitude * (Math.PI/180)) * Math.cos(kiosk.latitude * (Math.PI/180)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = R * c; 

    setEstimates({
      dist: dist.toFixed(1),
      car: Math.round((dist / 40) * 60),
      bus: Math.round((dist / 20) * 60) + 15,
      walk: Math.round((dist / 5) * 60)
    });
    setSelectedKiosk(kiosk);
  };

  const openRealMaps = () => {
    if (!selectedKiosk) return;
    const url = Platform.select({
      ios: `maps:?daddr=${selectedKiosk.latitude},${selectedKiosk.longitude}&dirflg=d`,
      android: `google.navigation:q=${selectedKiosk.latitude},${selectedKiosk.longitude}`
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: USER_LOC.latitude,
          longitude: USER_LOC.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={USER_LOC} title="You"><View style={styles.userDot} /></Marker>

        {ALL_KIOSKS.map(kiosk => (
          <Marker
            key={kiosk.id}
            coordinate={{ latitude: kiosk.latitude, longitude: kiosk.longitude }}
            pinColor={kiosk.color}
            onPress={() => handleSelectKiosk(kiosk)}
          />
        ))}

        {selectedKiosk && (
          <Polyline
            coordinates={[USER_LOC, { latitude: selectedKiosk.latitude, longitude: selectedKiosk.longitude }]}
            strokeColor={selectedKiosk.isOpen ? Colors.accent : 'red'} // Line is red if closed
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        )}
      </MapView>

      {selectedKiosk && estimates && (
        <View style={styles.bottomSheet}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.kioskTitle}>{selectedKiosk.title}</Text>
              <Text style={{color: selectedKiosk.color, fontWeight: 'bold'}}>
                ● {selectedKiosk.status} ({estimates.dist} km)
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedKiosk(null)}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Warning Banner if Closed */}
          {!selectedKiosk.isOpen && (
            <View style={styles.warningBox}>
              <Ionicons name="warning" size={16} color="#721c24" />
              <Text style={styles.warningText}>This bin is currently full. Please choose another.</Text>
            </View>
          )}

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="car" size={24} color={Colors.primary} />
              <Text style={styles.statTime}>{estimates.car} min</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="bus" size={24} color="#E67E22" />
              <Text style={styles.statTime}>{estimates.bus} min</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="walk" size={24} color="green" />
              <Text style={styles.statTime}>{estimates.walk} min</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.navButton, !selectedKiosk.isOpen && styles.disabledBtn]} 
            onPress={openRealMaps}
            disabled={!selectedKiosk.isOpen} // Prevent navigation if closed
          >
            <Text style={styles.navText}>
              {selectedKiosk.isOpen ? "START NAVIGATION" : "LOCATION CLOSED"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  userDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#2196F3', borderWidth: 2, borderColor: 'white' },
  
  bottomSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'white', padding: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    elevation: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  kioskTitle: { fontWeight: 'bold', fontSize: 16, color: Colors.textPrimary },
  
  warningBox: { flexDirection: 'row', backgroundColor: '#f8d7da', padding: 10, borderRadius: 5, marginBottom: 15, alignItems: 'center' },
  warningText: { color: '#721c24', marginLeft: 8, fontSize: 12 },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10 },
  statBox: { alignItems: 'center' },
  statTime: { fontWeight: 'bold', marginTop: 4 },

  navButton: { backgroundColor: Colors.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#ccc' }, // Grey out button if closed
  navText: { color: 'white', fontWeight: 'bold', letterSpacing: 1 }
});