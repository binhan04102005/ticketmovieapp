import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { db, auth } from '../api/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  // Sử dụng useFocusEffect để tự động làm mới dữ liệu mỗi khi quay lại trang này
  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        if (!user) return;
        try {
          const q = query(
            collection(db, "Orders"),
            where("userId", "==", user.uid),
            orderBy("bookingTime", "desc"),
            limit(5) // Chỉ hiển thị 5 giao dịch gần nhất ở đây
          );
          const querySnapshot = await getDocs(q);
          const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHistory(docs);
        } catch (error) {
          console.error("Lỗi khi tải lịch sử:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }, [user])
  );

  const handleLogout = () => {
    auth.signOut().then(() => navigation.replace('Login'));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Thông tin User */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color={COLORS.black} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userRole}>Thành viên kim cương</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <View style={styles.menuRow}>
            <Ionicons name="time-outline" size={22} color={COLORS.primary} />
            <Text style={styles.menuText}>Xem tất cả lịch sử đặt vé</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <View style={styles.orderLeft}>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.movieTitle}</Text>
                <Text style={styles.timeText}>
                  {new Date(item.bookingTime).toLocaleDateString('vi-VN')}
                </Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.priceText}>{item.totalAmount.toLocaleString()}đ</Text>
                <Text style={styles.detailText}>{item.seatCount} ghế</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, paddingHorizontal: 20 },
  profileCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1A1A1A', 
    padding: 20, 
    borderRadius: 20, 
    marginTop: 20,
    marginBottom: 20 
  },
  avatarContainer: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  userEmail: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  userRole: { color: '#aaa', fontSize: 12, marginTop: 4 },
  logoutBtn: { padding: 5 },
  
  menuContainer: { marginBottom: 30 },
  menuItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 12
  },
  menuRow: { flexDirection: 'row', alignItems: 'center' },
  menuText: { color: COLORS.white, marginLeft: 10, fontWeight: '500' },

  sectionTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  orderItem: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary
  },
  orderLeft: { flex: 1 },
  orderRight: { alignItems: 'flex-end' },
  movieTitle: { color: COLORS.white, fontSize: 15, fontWeight: 'bold' },
  detailText: { color: '#666', fontSize: 12 },
  priceText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 15 },
  timeText: { color: '#aaa', fontSize: 12, marginTop: 4 },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 20 }
});

export default ProfileScreen;