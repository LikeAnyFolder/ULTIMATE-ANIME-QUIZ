# 🎮 Ultimate Anime Quiz

**Plataforma web de minijuegos de anime 100% frontend, lista para GitHub Pages**

## ✨ Características

- ✅ **Datos verificables**: Todas las fuentes están comentadas en el código (MAL, IMDb, Wikias oficiales)
- 🔒 **Privacidad total**: Los datos se almacenan ÚNICAMENTE en `localStorage` del navegador
- 📱 **Responsive**: Diseño mobile-first que funciona en cualquier dispositivo
- 🎯 **Sistema de puntuación**: Leaderboards locales, perfiles de usuario, rachas
- ⚖️ **Ético y responsable**: Solo personajes canonicamente adultos (18+), sin contenido explícito
- 🎨 **UI moderna**: Diseño limpio con transiciones suaves
- 📦 **100% independiente**: Cero dependencias externas, funciona offline

## 🎮 Modos de Juego

### 1. 📚 Quiz Clásico
**Estado**: ✅ **COMPLETO**

Responde 10 preguntas verificadas sobre anime.

**Características**:
- Preguntas con fuente citada (MAL, episodio específico, wikias oficiales)
- 4 opciones múltiples
- Dificultad variada (easy, medium, hard)
- Explicaciones después de cada respuesta
- Sistema de puntuación (10 pts por respuesta correcta)

**Fuentes de datos**:
- MyAnimeList.net (myanimelist.net)
- IMDb (imdb.com)
- Wikias oficiales de anime
- Última actualización: 2025-01-20

**Archivo**: `js/data/ratings.js`, `js/games/quiz.js`

---

### 2. 🎵 Adivina el Opening (Opening Heardle)
**Estado**: ⏱️ **DESARROLLADO (audio requiere setup)**

Escucha fragmentos de openings y adivina cuál es.

**Características**:
- Sistema de progresión: comienza con 5 segundos, aumenta a 30 seg
- 3 vidas por pregunta
- Puntuación basada en la duración mínima usada
- Metadata real de openings

**⚠️ Instrucciones para implementar audio**:

1. **Descargar clips legales** (máx 30 segundos bajo fair use):
   - YouTube: Usar YouTube downloader para extraer clips
   - OR: Usar OSFX para openings con licencia abierta
   - OR: Contactar a estudios directamente

2. **Convertir a MP3/WAV**:
   ```bash
   ffmpeg -i opening.mp4 -ss 0 -t 30 -vn opening.mp3
   ```

3. **Guardar en estructura correcta**:
   ```
   assets/audio/openings/
   ├─ aot_opening1.mp3
   ├─ death_note_opening1.mp3
   ├─ steins_gate_opening.mp3
   └─ ...
   ```

4. **Actualizar rutas en `js/data/openings.js`**:
   ```javascript
   audioFile: 'assets/audio/openings/aot_opening1.mp3'
   ```

**Fuentes de metadata**:
- MyAnimeList.net (información de openings)
- AnimeTheme.moe (cuando disponible)
- Última actualización: 2025-01-20

**Archivo**: `js/data/openings.js`, `js/games/opening_heardle.js`

---

### 3. ❤️ Smash or Pass
**Estado**: ✅ **COMPLETO**

Elige si harías "smash" (❤️) o "pass" (💔) con personajes de anime.

**Criterios éticos**:
- ✅ SOLO personajes canonicamente adultos (18+)
- ✅ SOLO imágenes oficiales del manga/anime
- ✅ SIN sexualización visual
- ✅ SIN menores
- ✅ SIN fanart explícito

**Características**:
- 8 personajes verificados
- Imágenes placeholders (para implementar: agregar oficial art en `assets/images/`)
- Estadísticas basadas ÚNICAMENTE en votos locales
- Puntuación variable (5 pts smash, 3 pts pass)

**Cómo agregar imágenes**:
1. Obtener imágenes oficiales (oficial manga/anime artwork)
2. Guardar en `assets/images/`
3. Nombrar: `{character_id}.jpg` (ej: `saber_fsn.jpg`)
4. Actualizar ruta en `js/games/smash_or_pass.js`

**Archivo**: `js/games/smash_or_pass.js`

---

### 4. 📊 ¿Cuál Anime es Más Famoso?
**Estado**: ✅ **COMPLETO**

Compara popularidad de dos anime basándose en datos reales.

**Métricas**:
- **MyAnimeList members**: Conteo exacto de usuarios que han agregado el anime
- **IMDb votes**: Votos recibidos en IMDb

**Características**:
- 10 rondas comparativas
- Métrica aleatoria cada pregunta
- Muestra estadísticas reales después de responder
- Puntuación: 10 pts por respuesta correcta

**Fuentes de datos**:
- MyAnimeList.net (member counts) - Verificable públicamente
- IMDb.com (user votes) - Verificable públicamente
- Última actualización: 2025-01-20

**Nota sobre Wikipedia**:
No incluimos page views porque:
- Están geobloqueados para acceso automático
- Requieren API especial
- Los datos públicos son limitados

**Archivo**: `js/data/popularity.js`, `js/games/comparisons.js`

---

### 5. 📈 Rule34 Statistics (OPCIONAL)
**Estado**: ⚠️ **NO IMPLEMENTADO COMPLETAMENTE**

Compara estadísticas NSFW (solo números, sin imágenes).

**Por qué no está completo**:
- Datos necesarios: Conteos verificables de sitios NSFW
- Problema: La mayoría de sitios no exponen APIs públicas
- Solución: Requeriría scraping manual o partnerships
- Decisión: Incluir solo si hay datos 100% verificables

**Lo que SÍ se implementó**:
- Validación ética: SOLO personajes 18+
- Exclusión automática de menores
- Base de datos con validaciones

**Cómo completarlo** (si tienes acceso a datos):
1. Recopila conteos verificables con fecha exacta
2. Documenta fuente y método
3. Actualiza `js/data/rule34_stats.js`
4. Descomenta modo en menú

**Archivo**: `js/data/rule34_stats.js`

---

### 6. ⭐ ¿Qué Anime/Episodio Tiene Mejor Rating?
**Estado**: 🔧 **EN DESARROLLO**

Compara ratings de anime y episodios específicos.

**Datos disponibles**:
- MAL scores (myanimelist.net)
- IMDb ratings (imdb.com)
- Episode-specific ratings

**Próximas mejoras**:
- Implementar comparador visual
- Incluir episodios destacados
- Mostrar tendencias de rating

**Archivo de datos**: `js/data/ratings.js`

---

## 📁 Estructura del Proyecto

```
anime-quiz/
├─ index.html                          # HTML principal
├─ css/
│  └─ style.css                        # Estilos (mobile-first, responsivo)
├─ js/
│  ├─ main.js                          # Controlador principal de la app
│  ├─ storage.js                       # Gestión de localStorage
│  ├─ data/
│  │  ├─ ratings.js                    # Scores de MAL e IMDb
│  │  ├─ popularity.js                 # Datos de popularidad (MAL members, IMDb votes)
│  │  ├─ openings.js                   # Metadata de openings
│  │  └─ rule34_stats.js               # Estadísticas NSFW (ética)
│  └─ games/
│     ├─ quiz.js                       # Juego: Quiz clásico
│     ├─ comparisons.js                # Juego: Comparaciones de popularidad
│     ├─ smash_or_pass.js              # Juego: Smash or Pass
│     └─ opening_heardle.js            # Juego: Adivina el opening
├─ assets/
│  ├─ images/                          # (Placeholder para imágenes)
│  └─ audio/
│     └─ openings/                     # (Archivos MP3 de openings - agregar manualmente)
└─ README.md                           # Este archivo
```

## 🚀 Cómo Ejecutar

### Opción 1: Archivo Local
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! Funciona offline

### Opción 2: GitHub Pages

1. **Sube el proyecto a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ultimate Anime Quiz"
   git remote add origin https://github.com/TU_USUARIO/anime-quiz.git
   git push -u origin main
   ```

2. **Habilita GitHub Pages**:
   - Ve a Settings → Pages
   - Selecciona "Deploy from a branch"
   - Rama: `main`, carpeta: `/root`
   - Guarda

3. **Accede a**: `https://TU_USUARIO.github.io/anime-quiz`

### Opción 3: Servidor Local

```bash
# Con Python
python -m http.server 8000

# O con Node.js
npx http-server
```

Luego abre `http://localhost:8000`

---

## 💾 Datos y Almacenamiento

### ¿Dónde se guardan los datos?
- ✅ **localStorage**: Todos los datos del jugador, puntuaciones, leaderboard
- ❌ NO hay servidor backend
- ❌ NO se envía información a internet

### ¿Qué datos se guardan?
```javascript
{
  profile: {
    playerName: "Tu nombre",
    totalScore: 1250,
    gamesPlayed: 15,
    currentStreak: 3,
    maxStreak: 8,
    stats: { /* por juego */ }
  },
  scores: [ /* historial de partidas */ ],
  leaderboard: [ /* top jugadores */ ],
  session: { /* datos de sesión actual */ }
}
```

### Exportar / Importar Datos
```javascript
// Exportar
const backup = gameStorage.exportData();
console.log(JSON.stringify(backup));

// Importar
gameStorage.importData(backupData);

// Limpiar
gameStorage.clearAllData();
```

---

## 🔍 Verificación de Datos

Todos los datos son **100% verificables** públicamente:

### Quiz
- Preguntas: Verificables en MAL, Wikias oficiales, episodios
- Ejemplo: "Death Note tiene 37 episodios" → myanimelist.net/anime/1535

### Ratings
- MAL scores: myanimelist.net (página de cada anime)
- IMDb ratings: imdb.com (página de serie)
- Última verificación: 2025-01-20

### Popularidad
- MAL members: myanimelist.net (mostrado en cada página de anime)
- IMDb votes: imdb.com (mostrado en cada página)
- Última verificación: 2025-01-20

### Openings
- Metadata: MyAnimeList, AnimeDB, AniTheme
- Audio: Requiere descarga manual legal

### Smash or Pass
- Personajes: Todos canonicamente 18+ verificados
- Imágenes: Solo oficial art (placeholders en version actual)

---

## 🛠️ Desarrollo

### Agregar Nuevas Preguntas Quiz

En `js/data/ratings.js`, agrega objetos al array `QUIZ_QUESTIONS`:

```javascript
{
  id: 'q_new',
  question: '¿Tu pregunta?',
  options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
  correctAnswer: 0, // índice de respuesta correcta
  source: 'Fuente: MAL (fecha) | Wiki Oficial',
  difficulty: 'easy|medium|hard',
  category: 'category_name',
  explanation: 'Explicación clara'
}
```

### Agregar Nuevos Personajes Smash or Pass

En `js/games/smash_or_pass.js`, agrega al array `SMASH_OR_PASS_CHARACTERS`:

```javascript
{
  id: 'unique_id',
  name: 'Nombre del Personaje',
  series: 'Nombre de la Serie',
  characterAge: '20+',
  canonAge: 18,
  verified_adult: true,
  imageUrl: 'assets/images/unique_id.jpg',
  imageSource: 'Serie Official Art',
  description: 'Breve descripción',
  smashCount: 0,
  passCount: 0
}
```

**IMPORTANTE**: Verificar que `verified_adult: true` solo para personajes 18+

### Agregar Nuevos Animes a Comparaciones

En `js/data/popularity.js`, agrega al array `animes`:

```javascript
{
  id: 'unique_id',
  name: 'Nombre en inglés',
  mal_members: 2500000,
  imdb_votes: 350000,
  imdb_popularity_score: 85.5,
  rank_mal_all_time: 15,
  rank_mal_tv: 10,
  source: 'MAL: myanimelist.net | IMDb: imdb.com (FECHA)',
  metrics_used: ['mal_members', 'imdb_votes'],
  year: 2020
}
```

---

## 📊 Limitaciones Conocidas

| Característica | Estado | Razón |
|---|---|---|
| Audio en Opening Heardle | Requiere setup | Copyright: necesita archivos locales |
| Wikipedia page views | No incluído | Geobloqueado para acceso automático |
| Rule34 stats completo | Parcial | No hay API pública de Rule34.xxx |
| Imágenes personajes Smash | Placeholder | Copyright: necesita art oficial |
| Actualización automática | No | Datos verificables requieren confirmación manual |

---

## ⚖️ Consideraciones Éticas

### ✅ Qué Hacemos Bien
- SOLO personajes canonicamente adultos (18+)
- Datos verificables y citable
- SIN contenido explícito visual
- SIN sexualización inapropiada
- SIN menores de edad
- Transparencia en fuentes

### ❌ Qué No Hacemos
- Scraping automático sin consentimiento
- Acceso a contenido NSFW
- Datos inventados o simulados
- Monetización de datos
- Rastreo de usuarios

---

## 🐛 Troubleshooting

### Los datos no se guardan
```javascript
// Verificar localStorage
localStorage.getItem('ultimate_anime_quiz_profile')

// Limpiar y reiniciar
gameStorage.clearAllData()
```

### El juego está lento
- Asegúrate de que no hay muchas pestañas abiertas
- Prueba en incógnito (sin extensiones)
- Revisa la consola (F12 → Console)

### ¿Dónde están mis puntuaciones?
- Abre DevTools (F12)
- Ir a Application → Local Storage
- Busca `ultimate_anime_quiz_*`

---

## 📝 Licencia

Este proyecto es **educativo** y utiliza datos públicos verificables.

### Derechos de Contenido
- **Anime**: Propiedad de studios y editoriales respectivos
- **Datos MAL**: Creative Commons (usuario-generado)
- **IMDb ratings**: Fair use educativo
- **Código**: Libre para usar, modificar, compartir (con atribución)

---

## 🎓 Créditos y Referencias

### Fuentes de Datos
- **MyAnimeList.net**: Rankings y ratings de la comunidad
- **IMDb.com**: Ratings y votos
- **Official Wikias**: Información canónica de series
- **YouTube**: Clips de openings (fair use educativo)

### Tecnologías
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- localStorage API

### Inspiración
- Heardle (para Opening Heardle)
- Wordle (concepto de adivinanza)
- Comunidad anime global

---

## 📞 Soporte y Contribuciones

### Reportar errores
1. Abre DevTools (F12)
2. Copia el error de Console
3. Describe qué hacías cuando ocurrió

### Sugerir mejoras
- Agregar más preguntas verificadas
- Nuevos modos de juego
- Mejorar UI/UX
- Optimizar performance

---

## 🚀 Roadmap Futuro

- [ ] Sistema de achievements
- [ ] Multijugador local (comparar scores)
- [ ] Modo oscuro/claro automático
- [ ] Soporte para español/inglés/japonés
- [ ] Estadísticas avanzadas
- [ ] Integración con MAL API (leer-solo)
- [ ] PWA (installable)
- [ ] Temas personalizables

---

## ✨ Última Actualización

- **Fecha**: Enero 27, 2025
- **Versión**: 1.0.0
- **Estado**: Producción (Ready for GitHub Pages)
- **Datos Verificados**: 2025-01-20

---

**Hecho con ❤️ para la comunidad anime** 🎌

*"No hay datos inventados, solo datos reales y verificables"*
