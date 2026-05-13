import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { db, auth } from '../api/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, "Orders"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("bookingTime", "desc") // Hiện vé mới nhất lên đầu
      );

      const querySnapshot = await getDocs(q);
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    } catch (error) {
      console.error("Lỗi lấy lịch sử:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.movieTitle}>{item.movieTitle}</Text>
        <Text style={styles.orderPrice}>{item.totalAmount.toLocaleString('vi-VN')}đ</Text>
      </View>
      
      <View style={styles.orderDetail}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={14} color="#aaa" />
          <Text style={styles.detailText}>
            {new Date(item.bookingTime).toLocaleDateString('vi-VN')} - {new Date(item.bookingTime).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="apps-outline" size={14} color="#aaa" />
          <Text style={styles.detailText}>{item.seatCount} ghế đã đặt</Text>
        </View>
      </View>
      
      <View style={styles.statusTag}>
        <Text style={styles.statusText}>Thành công</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đặt vé</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket-outline" size={80} color="#333" />
          <Text style={styles.emptyText}>Bạn chưa có giao dịch nào</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20,
    marginTop: 10
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  orderCard: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  movieTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1 },
  orderPrice: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  orderDetail: { marginBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  detailText: { color: '#aaa', fontSize: 13, marginLeft: 5 },
  statusTag: { 
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(0,255,0,0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 5 
  },
  statusText: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#555', marginTop: 10, fontSize: 16 }
});

export default OrderHistoryScreen;