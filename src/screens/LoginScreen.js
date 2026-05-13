import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../api/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { COLORS } from '../constants/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert("Lỗi", "Email hoặc mật khẩu không đúng");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Thành công", "Đã tạo tài khoản!");
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Ticket App</Text>
      <TextInput 
        placeholder="Email" placeholderTextColor="#aaa"
        style={styles.input} onChangeText={setEmail} value={email}
      />
      <TextInput 
        placeholder="Mật khẩu" placeholderTextColor="#aaa"
        style={styles.input} secureTextEntry onChangeText={setPassword} value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
  <Text style={{color: COLORS.primary, marginTop: 20, textAlign: 'center'}}>
    Chưa có tài khoản? Đăng ký ngay
  </Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, justifyContent: 'center', padding: 20 },
  title: { color: COLORS.white, fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#333', color: 'white', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontWeight: 'bold', fontSize: 18 }
});

export default LoginScreen;