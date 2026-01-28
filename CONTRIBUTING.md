# Guía de Contribución - Agregar Datos Reales

Esta guía explica cómo agregar nuevos datos verificables al proyecto.

---

## 📚 Agregar Preguntas Quiz

### Ubicación
`js/data/ratings.js` → Array `QUIZ_QUESTIONS`

### Template
```javascript
{
  id: 'q_unique_id',
  question: '¿Tu pregunta sobre anime?',
  options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
  correctAnswer: 0, // Índice de la respuesta correcta (0-3)
  source: 'Fuente: MAL (https://myanimelist.net/anime/XXX) | Fecha: YYYY-MM-DD',
  difficulty: 'easy' | 'medium' | 'hard',
  category: 'release_year' | 'studio' | 'episode_count' | 'character_powers' | 'composer' | 'movie_release' | 'character_backstory' | 'popularity' | 'rating',
  explanation: 'Explicación clara y verificable de por qué esta es la respuesta correcta.'
}
```

### Proceso de Verificación
1. **Verifica en MAL**: myanimelist.net
2. **Verifica en IMDb**: imdb.com
3. **Verifica en Wikias oficiales**
4. **Documenta la fuente exacta** (URL + fecha)
5. **Proporciona explicación clara**

### Ejemplo Real
```javascript
{
  id: 'q_aot_year',
  question: '¿En qué año se estrenó "Attack on Titan"?',
  options: ['2011', '2013', '2015', '2017'],
  correctAnswer: 1,
  source: 'MAL: https://myanimelist.net/anime/16498/Shingeki_no_Kyojin | 2025-01-20',
  difficulty: 'easy',
  category: 'release_year',
  explanation: 'Attack on Titan (進撃の巨人) fue estrenado el 7 de abril de 2013 en el canal NTV de Japón.'
}
```

---

## 🎵 Agregar Openings

### Ubicación
`js/data/openings.js` → Array `OPENINGS_DATA.openings`

### Template
```javascript
{
  id: 'anime_opening1',
  animeId: 'anime_id', // Debe existir en RATINGS_DATA
  animeName: 'Nombre del Anime',
  animeJapanese: '日本語の名前',
  openingNumber: 1,
  title: 'Título del Opening',
  artistJapanese: 'アーティスト',
  artist: 'Artist Name',
  season: 1,
  episodes: '1-13',
  releaseDate: 'YYYY-MM-DD',
  composer: 'Nombre del Compositor',
  duration_seconds: 90,
  audioFile: 'assets/audio/openings/anime_opening1.mp3', // Agregar después de descargar
  youtubeClip: 'Referencia: https://www.youtube.com/watch?v=XXXX',
  source: 'MAL: myanimelist.net | AnimeTheme: animetheme.moe | 2025-01-20',
  notes: 'Notas adicionales sobre el opening'
}
```

### Cómo obtener metadata
1. Ve a MyAnimeList.net
2. Busca el anime
3. Ve a "Opening Theme"
4. Copia información: título, artista, episodios, etc.

---

## 👥 Agregar Personajes Smash or Pass

### Ubicación
`js/games/smash_or_pass.js` → Array `SMASH_OR_PASS_CHARACTERS`

### Template
```javascript
{
  id: 'unique_id',
  name: 'Nombre del Personaje',
  series: 'Nombre de la Serie',
  characterAge: '20+ (descripción)',
  canonAge: 18, // DEBE SER 18 O MAYOR
  verified_adult: true, // SOLO true para 18+
  imageUrl: 'assets/images/unique_id.jpg',
  imageSource: 'Serie Official Art',
  description: 'Descripción breve del personaje',
  smashCount: 0,
  passCount: 0
}
```

### ⚠️ Requisitos Éticos Estrictos
- ✅ **DEBE** ser canonicamente 18+ verificado
- ✅ Solo imágenes oficiales (manga, anime, oficial art)
- ✅ Descripción apropiada
- ❌ NO menores (incluso si aparentan mayor)
- ❌ NO fanart explícito
- ❌ NO sexualización visual

### Cómo verificar edad
1. Busca en wikias oficiales del anime
2. Verifica biografía del personaje
3. Documenta fuente (URL + fecha)
4. Si hay ambigüedad → **EXCLUIR**

---

## 📊 Agregar Anime a Comparaciones

### Ubicación
`js/data/popularity.js` → Array `POPULARITY_DATA.animes`

### Template
```javascript
{
  id: 'unique_id',
  name: 'Anime Name (English)',
  mal_members: 2500000, // Número exacto de MyAnimeList
  imdb_votes: 350000,   // Número exacto de IMDb
  imdb_popularity_score: 85.5,
  rank_mal_all_time: 15,
  rank_mal_tv: 10,
  source: 'MAL: myanimelist.net/anime/XXXX | IMDb: imdb.com/title/ttXXXXXX | 2025-01-20',
  metrics_used: ['mal_members', 'imdb_votes'],
  year: 2020
}
```

### Cómo obtener datos exactos
1. **MAL**: Ve a myanimelist.net/anime/ID
   - Busca "Members: X,XXX,XXX"
   - Copia el número exacto
2. **IMDb**: Ve a imdb.com/title/ttID
   - Busca número de votos en rating
   - Copia el número exacto
3. **Documenta la fecha**

### Ejemplo
```javascript
{
  id: 'tower_of_god',
  name: 'Tower of God',
  mal_members: 850000,
  imdb_votes: 120000,
  imdb_popularity_score: 82.1,
  rank_mal_all_time: 89,
  rank_mal_tv: 60,
  source: 'MAL: myanimelist.net/anime/40221 | IMDb: imdb.com/title/tt12592790 | 2025-01-20',
  metrics_used: ['mal_members', 'imdb_votes'],
  year: 2020
}
```

---

## ⭐ Agregar Ratings de Animes

### Ubicación
`js/data/ratings.js` → Array `RATINGS_DATA.animes`

### Template
```javascript
{
  id: 'unique_id',
  name: 'Anime Name',
  japaneseName: '日本語',
  score_mal: 8.54,
  members_mal: 2800000,
  score_imdb: 8.9,
  votes_imdb: 280000,
  year: 2013,
  studio: 'Studio Name',
  source: 'MAL: myanimelist.net/anime/XXXX | IMDb: imdb.com/title/ttXXXXXX | 2025-01-20',
  episodes: 24,
  status: 'Completed' | 'Ongoing'
}
```

---

## 📝 Proceso de Control de Calidad

Antes de hacer push de nuevos datos:

### Checklist
- [ ] Fuente verificada públicamente (URL + fecha)
- [ ] Datos correctos (número exacto, no redondeado)
- [ ] Información completa (no campos vacíos)
- [ ] Comentarios claros
- [ ] Sin información personal sensible
- [ ] Sin contenido ofensivo
- [ ] Formato JSON válido (usa https://jsonlint.com/)

### Validación técnica
```bash
# Abre DevTools (F12) y ejecuta:
JSON.parse(localStorage.getItem('ultimate_anime_quiz_scores'))
// Si devuelve objeto válido, estructura JSON es correcta
```

---

## 🔄 Flujo de Actualización

1. **Rama de desarrollo**:
   ```bash
   git checkout -b add/new-data
   ```

2. **Edita archivos de datos**:
   - Agrega nuevas preguntas/personajes/anime
   - Verifica cada entrada

3. **Testing local**:
   - Abre index.html
   - Juega los modos afectados
   - Verifica que no haya errores (F12)

4. **Commit**:
   ```bash
   git add js/data/
   git commit -m "Add: 5 new quiz questions with verified sources"
   ```

5. **Push y Pull Request**:
   ```bash
   git push origin add/new-data
   ```
   Luego abre un PR en GitHub

---

## 🚫 Lo que NO hacer

- ❌ Datos inventados
- ❌ "Datos de ejemplo"
- ❌ Números aleatorios
- ❌ Scraping automático
- ❌ Información no verificada
- ❌ Menores de edad en Smash or Pass
- ❌ Contenido sexualmente explícito
- ❌ Información personal de usuarios reales

---

## 📞 Preguntas Comunes

**P: ¿Puedo agregar anime reciente?**
R: Sí, pero asegúrate que los datos en MAL/IMDb estén completos

**P: ¿Qué pasa si la información cambia?**
R: Actualiza con nueva fecha. Ej: "Actualizado MAL: 2025-02-01"

**P: ¿Puedo usar datos de otras wikias?**
R: Sí, si son verificables y citas la fuente exacta

**P: ¿Cuántas preguntas puedo agregar?**
R: Ilimitadas, mientras sean verificadas

---

## 🎓 Recursos para Verificación

- [MyAnimeList](https://myanimelist.net)
- [IMDb](https://imdb.com)
- [AniDB](https://anidb.net)
- [AnimeTheme](https://animetheme.moe)
- [Official Wikias](https://en.wikipedia.org/wiki/List_of_anime_databases_and_search_engines)

---

**Gracias por contribuir a un proyecto verificable y ético.** 🙏
