import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/weather-app/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        weather: resolve(__dirname, 'weather.html'),
        movies: resolve(__dirname, 'movies.html'),
        movie: resolve(__dirname, 'movie.html'),
        currency: resolve(__dirname, 'currency.html')
      }
    }
  }
});
