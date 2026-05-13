import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Thư viện tạo QR
import { COLORS, TMDB_CONFIG } from '../constants/theme';


const TicketScreen = ({ route, navigation }) => {
  const { movie, totalPrice, seatCount } = route.params;

  // Tạo một mã vé ngẫu nhiên hoặc dựa trên ID
  const ticketCode = `TICKET-${movie.id}-${Math.floor(Math.random() * 10000)}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ticketCard}>
        {/* Ảnh phim làm nền nhỏ phía trên */}
        <Image 
          source={{ uri: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.backdrop_path}` }} 
          style={styles.movieBanner} 
        />
        
        <View style={styles.infoSection}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.timeText}>15:30 | Thứ Tư, 13 Tháng 5, 2026</Text>
          
          <View style={styles.detailsRow}>
            <View>
              <Text style={styles.label}>Số lượng</Text>
              <Text style={styles.value}>{seatCount} Ghế</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.label}>Tổng tiền</Text>
              <Text style={styles.value}>{totalPrice.toLocaleString('vi-VN')}đ</Text>
            </View>
          </View>

          {/* Đường gạch ngang đứt đoạn kiểu cuống vé */}
          <View style={styles.dashedLine} />

          <View style={styles.qrSection}>
            <QRCode
              value={ticketCode}
              size={180}
              color="black"
              backgroundColor="white"
            />
            <Text style={styles.ticketID}>{ticketCode}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.homeBtn} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeBtnText}>Quay về Trang chủ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center' },
  ticketCard: { width: '85%', backgroundColor: COLORS.white, borderRadius: 20, overflow: 'hidden' },
  movieBanner: { width: '100%', height: 150 },
  infoSection: { padding: 20, alignItems: 'center' },
  movieTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black, textAlign: 'center' },
  timeText: { color: '#666', marginVertical: 8 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 },
  label: { color: '#888', fontSize: 12 },
  value: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  dashedLine: { 
    width: '100%', 
    height: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderStyle: 'dashed', 
    marginVertical: 25 
  },
  qrSection: { alignItems: 'center' },
  ticketID: { marginTop: 10, color: '#888', letterSpacing: 2 },
  homeBtn: { marginTop: 30, backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, width: '85%', alignItems: 'center' },
  homeBtnText: { fontWeight: 'bold', color: COLORS.black }
});

export default TicketScreen;