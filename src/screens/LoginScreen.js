import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';
import Colors from '../constants/Colors';

export default function LoginScreen() {
  const { login } = useContext(UserContext);
  const [id, setId] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <View style={styles.staticLogo}>
            <Ionicons name="leaf" size={60} color={Colors.accent} />
        </View>
        <Text style={styles.title}>GREEN PULSE</Text>
        <Text style={styles.subtitle}>GOVERNMENT OF UAE</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>National ID</Text>
        <TextInput 
          style={styles.input} 
          placeholder="784-XXXX-XXXXXXX-X" 
          keyboardType="number-pad"
          onChangeText={setId}
        />
        <TouchableOpacity style={styles.btn} onPress={() => login("Citizen")}>
          <Text style={styles.btnText}>SECURE ACCESS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary, justifyContent: 'center', padding: 25 },
  logoBox: { alignItems: 'center', marginBottom: 50 },
  staticLogo: { width: 100, height: 100, backgroundColor: '#FFF', borderRadius: 50, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginTop: 20, letterSpacing: 2 },
  subtitle: { color: Colors.accent, letterSpacing: 1, fontSize: 12 },
  form: { backgroundColor: '#FFF', padding: 25, borderRadius: 15 },
  label: { fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#EEE', padding: 15, borderRadius: 8, marginBottom: 20 },
  btn: { backgroundColor: Colors.accent, padding: 18, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});