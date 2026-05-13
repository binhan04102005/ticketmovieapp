import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { fetchNowPlaying } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import { Ionicons } from '@expo/vector-icons'; // Import icon

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNowPlaying();
      setMovies(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return (
    <View style={styles.loading}><ActivityIndicator size="large" color={COLORS.primary} /></View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header với nút Profile */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Phim Đang Chiếu</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileBtn}
        >
          <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MovieCard 
            movie={item} 
            onPress={() => navigation.navigate('MovieDetail', { movie: item })} 
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.black, 
    paddingTop: 50 // Cách tai thỏ
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  header: { 
    color: COLORS.white, 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  profileBtn: {
    padding: 5
  },
  listContent: {
    paddingHorizontal: 5,
    paddingBottom: 20
  },
  loading: { 
    flex: 1, 
    backgroundColor: COLORS.black, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default HomeScreen;