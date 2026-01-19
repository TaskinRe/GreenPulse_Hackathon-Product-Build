import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function ScanScreen({ navigation }) {
  const { addTransaction } = useContext(UserContext);

  const simulateScan = () => {
    // Add 50 points when button is clicked
    addTransaction("Recycled Item", 50, 0.5);
    alert("Success! 50 Points Added.");
    navigation.goBack(); // Return to dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, marginBottom: 20}}>Scanner Ready</Text>
      <Button title="TAP TO SCAN (SIMULATOR)" onPress={simulateScan} />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' } 
});