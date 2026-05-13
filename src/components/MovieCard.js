import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { TMDB_CONFIG, COLORS } from '../constants/theme';

const MovieCard = ({ movie, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image 
      source={{ uri: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}` }} 
      style={styles.image} 
    />
    <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
    <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flex: 1, margin: 8, backgroundColor: COLORS.grey, borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: 220 },
  title: { color: COLORS.white, padding: 8, fontWeight: 'bold' },
  rating: { color: COLORS.primary, paddingHorizontal: 8, paddingBottom: 8, fontSize: 12 },
});

export default MovieCard;