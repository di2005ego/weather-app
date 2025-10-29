import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', // если деплоишь на GitHub Pages, иначе можно '/'
  build: {
    rollupOptions: {
      // указываем все HTML-файлы как точки входа
      input: {
        main: resolve(__dirname, 'src/index.html'),
        weather: resolve(__dirname, 'src/weather.html'),
        movies: resolve(__dirname, 'src/movies.html'),
        movie: resolve(__dirname, 'src/movie.html'),
        currency: resolve(__dirname, 'src/currency.html')
      }
    }
  }
});
