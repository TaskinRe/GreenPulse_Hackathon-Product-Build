import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import GovCard from '../components/GovCard';
import Colors from '../constants/Colors';

export default function WalletScreen() {
  const { points, redeemPoints } = useContext(UserContext);

  const handleRedeem = async (cost, item) => {
    if(await redeemPoints(cost)) Alert.alert("Success", `Redeemed: ${item}`);
    else Alert.alert("Error", "Insufficient points");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.points}>{points}</Text>
        <Text style={{color:'#FFF'}}>Credits Available</Text>
      </View>
      <View style={{padding:16}}>
        <GovCard title="Rewards">
           <TouchableOpacity onPress={() => handleRedeem(100, "Coffee")} style={{padding:10}}>
             <Text>Coffee Voucher (100 pts)</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handleRedeem(500, "Metro Card")} style={{padding:10}}>
             <Text>Metro Top-up (500 pts)</Text>
           </TouchableOpacity>
        </GovCard>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, padding: 40, alignItems: 'center' },
  points: { fontSize: 40, fontWeight: 'bold', color: Colors.accent }
});