import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, TMDB_CONFIG } from '../constants/theme';


const MovieDetail = ({ route, navigation }) => {
  // Nhận dữ liệu phim từ màn hình Home truyền sang
  const { movie } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Poster Phim lớn (Backdrop) */}
        <Image
          source={{ uri: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.backdrop_path}` }}
          style={styles.backdrop}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.releaseDate}>📅 {movie.release_date}</Text>
          </View>

          <Text style={styles.sectionTitle}>Nội dung phim</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </ScrollView>

      {/* Nút Đặt Vé ở dưới cùng */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookBtn}
          onPress={() => navigation.navigate('SeatSelection', { movie: movie })}
        >
          <Text style={styles.bookBtnText}>Đặt vé ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black, paddingTop:45 },
  backdrop: { width: '100%', height: 250, resizeMode: 'cover' },
  detailsContainer: { padding: 20 },
  title: { color: COLORS.white, fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  infoRow: { flexDirection: 'row', marginBottom: 20 },
  rating: { color: COLORS.primary, fontWeight: 'bold', marginRight: 20 },
  releaseDate: { color: '#aaa' },
  sectionTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  overview: { color: '#ccc', lineHeight: 22, textAlign: 'justify' },
  footer: { padding: 20, backgroundColor: 'rgba(0,0,0,0.8)' },
  bookBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center' },
  bookBtnText: { color: COLORS.black, fontWeight: 'bold', fontSize: 16 }
});

export default MovieDetail;