import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';

export default function FeedbackScreen() {
  const [msg, setMsg] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Citizen Voice</Text>
      <View style={styles.card}>
        <TextInput 
          style={styles.input}
          multiline
          placeholder="How can we improve our services?"
          value={msg}
          onChangeText={setMsg}
        />
        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert("Sent", "Feedback submitted to Ministry.")}>
          <Text style={{color:'#FFF', fontWeight:'bold'}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12 },
  input: { height: 150, textAlignVertical: 'top', marginBottom: 20 },
  btn: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, alignItems: 'center' }
});