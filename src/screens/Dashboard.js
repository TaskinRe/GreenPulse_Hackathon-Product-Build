import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import GovCard from '../components/GovCard';
import Colors from '../constants/Colors';

export default function Dashboard({ navigation }) {
  // Pulling real data from your UserContext
  const { points, co2, history, user } = useContext(UserContext);

  return (
    <ScrollView style={styles.container}>
      {/* 1. Official Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.govTitle}>MINISTRY OF SUSTAINABILITY</Text>
        <Text style={styles.greeting}>Marhaba, {user?.name || 'Citizen'}</Text>
        <Text style={styles.idSubtext}>ID: {user?.id || '784-XXXX-XXXX-X'}</Text>
      </View>

      <View style={styles.content}>
        
        {/* 2. Stats Row (Credits & CO2) */}
        <View style={styles.statsRow}>
          <GovCard style={styles.halfCard}>
            <Text style={styles.statNumber}>{points.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Green Credits</Text>
          </GovCard>
          
          <GovCard style={styles.halfCard}>
            <Text style={styles.statNumber}>{co2.toFixed(1)}kg</Text>
            <Text style={styles.statLabel}>CO2 Offset</Text>
          </GovCard>
        </View>

        {/* 3. Primary Action Button */}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('Scan')}
        >
          <Ionicons name="qr-code-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>SCAN SMART BIN</Text>
        </TouchableOpacity>

        {/* 4. Recent Activity Feed */}
        <GovCard title="Recent Activity">
          {history.length === 0 ? (
            <Text style={styles.emptyText}>No transactions yet. Start recycling to earn credits.</Text>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.iconCircle}>
                   <Ionicons name="leaf" size={18} color={Colors.accent} />
                </View>
                <View style={styles.listText}>
                  <Text style={styles.itemTitle}>{item.type}</Text>
                  <Text style={styles.itemDate}>{item.date} • {item.location}</Text>
                </View>
                <Text style={styles.pointsText}>+{item.points}</Text>
              </View>
            ))
          )}
        </GovCard>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  headerBlock: { 
    backgroundColor: Colors.primary, 
    padding: 30, 
    paddingTop: 60, 
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  govTitle: { 
    color: Colors.accent, 
    fontSize: 10, 
    fontWeight: 'bold', 
    letterSpacing: 2,
    marginBottom: 8
  },
  greeting: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },
  idSubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    marginTop: 4
  },
  content: { 
    padding: 20 
  },
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: -20, // Overlaps the header slightly for a modern look
  },
  halfCard: { 
    width: '48%', 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  statNumber: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: Colors.primary 
  },
  statLabel: { 
    fontSize: 12, 
    color: Colors.textSecondary,
    marginTop: 4
  },
  actionButton: { 
    backgroundColor: Colors.accent, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 12, 
    marginVertical: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  actionText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    marginLeft: 12,
    fontSize: 16,
    letterSpacing: 1
  },
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderColor: '#F1F5F9' 
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listText: { 
    flex: 1, 
    marginLeft: 15 
  },
  itemTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: Colors.textPrimary 
  },
  itemDate: { 
    fontSize: 12, 
    color: Colors.textSecondary 
  },
  pointsText: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#059669' 
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
    fontSize: 14
  }
});