import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const RANKINGS = [
  { id: '1', name: 'Zayed A.', emirate: 'Abu Dhabi', points: 15400, rank: 1 },
  { id: '2', name: 'Fatima M.', emirate: 'Dubai', points: 12100, rank: 2 },
  { id: '3', name: 'Sarah J.', emirate: 'Sharjah', points: 9800, rank: 3 },
  { id: '4', name: 'Citizen (You)', emirate: 'Dubai', points: 8500, rank: 4 },
];

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>National Ranking</Text></View>
      <FlatList
        data={RANKINGS}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.rankItem}>
            <Text style={styles.rankNum}>#{item.rank}</Text>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.emirate}>{item.emirate}</Text>
            </View>
            <Text style={styles.pts}>{item.points.toLocaleString()} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A' },
  rankItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', margin: 10, padding: 15, borderRadius: 10, elevation: 1 },
  rankNum: { fontWeight: 'bold', color: '#1E3A8A', fontSize: 18 },
  name: { fontWeight: 'bold' },
  emirate: { fontSize: 12, color: '#999' },
  pts: { fontWeight: 'bold', color: '#10B981' }
});