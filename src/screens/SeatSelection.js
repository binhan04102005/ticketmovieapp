import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../constants/theme';
// Import cả db và auth từ file config
import { db, auth } from '../api/firebaseConfig'; 
import { doc, setDoc, updateDoc, onSnapshot, collection, addDoc } from 'firebase/firestore';

const SeatSelection = ({ navigation, route }) => {
  const { movie } = route.params;
  const SEAT_PRICE = 75000;
  
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Lắng nghe dữ liệu Real-time và Khởi tạo cấu trúc Object hợp lệ
  useEffect(() => {
    const docRef = doc(db, "CinemaRooms", movie.id.toString());
    
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        setRows(docSnap.data().rows);
      } else {
        const defaultRows = [
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
          { seats: [0, 0, 0, 0, 0, 0, 0, 0] },
        ];
        try {
          await setDoc(docRef, { rows: defaultRows });
          setRows(defaultRows);
        } catch (err) {
          console.error("Lỗi khởi tạo dữ liệu:", err);
        }
      }
      setLoading(false);
    }, (error) => {
      console.error("Lỗi Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [movie.id]);

  // 2. Tính toán tổng tiền
  const selectedSeatsCount = useMemo(() => {
    let count = 0;
    rows.forEach(rowObj => {
      rowObj.seats.forEach(seat => {
        if (seat === 2) count++;
      });
    });
    return count;
  }, [rows]);

  const totalPrice = selectedSeatsCount * SEAT_PRICE;

  // 3. Hàm xử lý chọn ghế
  const toggleSeat = (rowIndex, seatIndex) => {
    const newRows = rows.map((rowObj, rIdx) => {
      if (rIdx === rowIndex) {
        const newSeats = rowObj.seats.map((seat, sIdx) => {
          if (sIdx === seatIndex) {
            if (seat === 0) return 2; 
            if (seat === 2) return 0; 
          }
          return seat;
        });
        return { ...rowObj, seats: newSeats }; 
      }
      return rowObj;
    });
    setRows(newRows);
  };

  // 4. Xử lý thanh toán (Đã thêm logic kiểm tra Đăng nhập)
  const handlePayment = async () => {
    // KIỂM TRA ĐĂNG NHẬP
    if (!auth.currentUser) {
      Alert.alert(
        "Yêu cầu đăng nhập",
        "Bạn cần đăng nhập để thực hiện đặt vé.",
        [
          { text: "Để sau", style: "cancel" },
          { text: "Đăng nhập", onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }

    try {
      const docRef = doc(db, "CinemaRooms", movie.id.toString());
      
      // Chuyển ghế đang chọn (2) -> Đã đặt (1)
      const finalRowsForDB = rows.map(rowObj => ({
        ...rowObj,
        seats: rowObj.seats.map(seat => (seat === 2 ? 1 : seat))
      }));

      // Cập nhật sơ đồ ghế lên rạp
      await updateDoc(docRef, { rows: finalRowsForDB });

      // Lưu lịch sử kèm userId của người đang đăng nhập
      await addDoc(collection(db, "Orders"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        movieId: movie.id,
        movieTitle: movie.title,
        seatCount: selectedSeatsCount,
        totalAmount: totalPrice,
        bookingTime: new Date().toISOString(),
      });

      navigation.navigate('TicketScreen', {
        movie: movie,
        totalPrice: totalPrice,
        seatCount: selectedSeatsCount
      });

    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      Alert.alert("Lỗi", "Không thể hoàn tất thanh toán. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{color: COLORS.white, marginTop: 10, textAlign: 'center'}}>Đang tải sơ đồ ghế...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <View style={styles.screen} />
        <Text style={styles.screenText}>Màn hình rạp</Text>
      </View>

      <ScrollView contentContainerStyle={styles.seatMap}>
        <View style={styles.seatsContainer}> 
          {rows.map((rowObj, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {rowObj.seats.map((seat, seatIndex) => (
                <TouchableOpacity
                  key={seatIndex}
                  disabled={seat === 1}
                  onPress={() => toggleSeat(rowIndex, seatIndex)}
                  style={[
                    styles.seat,
                    seat === 1 && styles.bookedSeat,
                    seat === 2 && styles.selectedSeat,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.seat} />
          <Text style={styles.legendText}>Trống</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.seat, styles.selectedSeat]} />
          <Text style={styles.legendText}>Chọn</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.seat, styles.bookedSeat]} />
          <Text style={styles.legendText}>Đã đặt</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalText}>{selectedSeatsCount} Ghế đã chọn</Text>
          <Text style={styles.priceText}>
            {totalPrice.toLocaleString('vi-VN')} VNĐ
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.btnPay, selectedSeatsCount === 0 && { opacity: 0.5 }]} 
          disabled={selectedSeatsCount === 0}
          onPress={handlePayment}
        >
          <Text style={styles.btnPayText}>
             {auth.currentUser ? "Thanh toán" : "Đăng nhập để đặt"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.black, paddingTop: 60 },
    screenContainer: { alignItems: 'center', marginTop: 30, marginBottom: 10 },
    screen: { 
      width: '80%', 
      height: 5, 
      backgroundColor: COLORS.primary, 
      borderRadius: 5, 
      elevation: 15,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    screenText: { color: COLORS.white, marginTop: 10, opacity: 0.5, fontSize: 12 },
    seatMap: { alignItems: 'center', paddingBottom: 100 },
    seatsContainer: {
      marginTop: 20,
      transform: [
        { perspective: 1000 },
        { rotateX: '45deg' }
      ],
    },
    row: { flexDirection: 'row', marginBottom: 10 },
    seat: { 
      width: 30, 
      height: 30, 
      backgroundColor: COLORS.lightGrey, 
      margin: 4, 
      borderRadius: 6,
      elevation: 3, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
    },
    bookedSeat: { backgroundColor: COLORS.grey },
    selectedSeat: { backgroundColor: COLORS.primary },
    legend: { 
      flexDirection: 'row', 
      justifyContent: 'center', 
      marginBottom: 30,
      backgroundColor: 'rgba(255,255,255,0.05)',
      paddingVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
    legendText: { color: COLORS.white, fontSize: 11, marginLeft: 5 },
    footer: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, 
      paddingBottom: 40,
      backgroundColor: COLORS.grey, 
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30 
    },
    totalText: { color: '#aaa', fontSize: 14 },
    priceText: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
    btnPay: { 
      backgroundColor: COLORS.primary, 
      paddingHorizontal: 35, 
      justifyContent: 'center', 
      borderRadius: 15 
    },
    btnPayText: { fontWeight: 'bold', fontSize: 14, color: COLORS.black }
  });

export default SeatSelection;