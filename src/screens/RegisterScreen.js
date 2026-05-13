import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { auth } from '../api/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (email === '' || password === '') {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Thành công", "Tài khoản đã được tạo!", [
        { text: "Đăng nhập ngay", onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      let errorMessage = "Không thể đăng ký";
      if (error.code === 'auth/email-already-in-use') errorMessage = "Email này đã được sử dụng";
      if (error.code === 'auth/weak-password') errorMessage = "Mật khẩu phải ít nhất 6 ký tự";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Tạo Tài Khoản</Text>
        <Text style={styles.subtitle}>Đăng ký để trải nghiệm đặt vé xem phim</Text>

        <TextInput 
          placeholder="Email" placeholderTextColor="#aaa"
          style={styles.input} onChangeText={setEmail} value={email}
          keyboardType="email-address" autoCapitalize="none"
        />
        <TextInput 
          placeholder="Mật khẩu" placeholderTextColor="#aaa"
          style={styles.input} secureTextEntry onChangeText={setPassword} value={password}
        />
        <TextInput 
          placeholder="Xác nhận mật khẩu" placeholderTextColor="#aaa"
          style={styles.input} secureTextEntry onChangeText={setConfirmPassword} value={confirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={{color: '#aaa'}}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  backBtn: { padding: 20, marginTop: 10 },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  title: { color: COLORS.white, fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#aaa', marginBottom: 30 },
  input: { backgroundColor: '#1A1A1A', color: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  button: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', fontSize: 18, color: COLORS.black },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 }
});

export default RegisterScreen;