import { TMDB_CONFIG } from '../constants/theme';

export const fetchNowPlaying = async () => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/now_playing?api_key=${TMDB_CONFIG.API_KEY}&language=vi-VN&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Lỗi API:", error);
    return [];
  }
};