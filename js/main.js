/**
 * MAIN APPLICATION CONTROLLER
 * 
 * Responsabilidades:
 * - Orquestar todos los juegos
 * - Gestionar UI y navegación
 * - Coordinar sistema de puntuación
 * - Manejar sesiones de usuario
 * 
 * Estructura de estados:
 * - MENU: Pantalla principal
 * - GAME_SELECT: Seleccionar juego
 * - IN_GAME: Durante el juego
 * - RESULTS: Resultados del juego
 * - LEADERBOARD: Ver clasificación
 * - PROFILE: Ver perfil de usuario
 */

class GameApp {
  constructor() {
    this.currentState = 'MENU';
    this.currentGame = null;
    this.currentPlayer = null;
    this.gameInstances = {};
    
    this.initializeApp();
  }

  /**
   * Inicializar aplicación
   */
  initializeApp() {
    console.log('🎮 Ultimate Anime Quiz - Iniciando...');
    
    // Verificar si hay perfil activo
    const profile = gameStorage.getProfile();
    if (!profile) {
      this.currentState = 'WELCOME';
      this.showWelcomeScreen();
    } else {
      this.currentPlayer = profile;
      this.showMenu();
    }

    // Inicializar event listeners
    this.setupEventListeners();
  }

  /**
   * Crear nuevo perfil de usuario
   */
  createNewProfile(playerName) {
    if (!playerName || playerName.trim().length === 0) {
      alert('Por favor ingresa un nombre válido');
      return;
    }

    this.currentPlayer = gameStorage.initializeProfile(playerName);
    gameStorage.registerInLeaderboard(playerName);
    gameStorage.startSession();
    
    console.log(`✅ Perfil creado: ${playerName}`);
    this.showMenu();
  }

  /**
   * PANTALLA: Bienvenida
   */
  showWelcomeScreen() {
    const welcome = document.getElementById('welcome-screen');
    if (welcome) {
      welcome.style.display = 'block';
      
      const btnCreate = document.getElementById('btn-create-profile');
      if (btnCreate) {
        btnCreate.onclick = () => {
          const name = document.getElementById('player-name-input').value;
          this.createNewProfile(name);
        };
      }
    }
  }

  /**
   * PANTALLA: Menú principal
   */
  showMenu() {
    this.currentState = 'MENU';
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';
    
    const menu = document.getElementById('main-menu');
    if (menu) {
      menu.style.display = 'block';
      this.updateProfileDisplay();
    }
  }

  /**
   * PANTALLA: Selector de juegos
   */
  showGameSelect() {
    this.currentState = 'GAME_SELECT';
    const menu = document.getElementById('main-menu');
    const gameSelect = document.getElementById('game-selector');
    
    if (menu) menu.style.display = 'none';
    if (gameSelect) gameSelect.style.display = 'block';
  }

  /**
   * Seleccionar y comenzar un juego
   */
  startGame(gameType) {
    console.log(`🎮 Iniciando juego: ${gameType}`);
    
    this.currentState = 'IN_GAME';
    
    // Limpiar UI previa
    const gameSelect = document.getElementById('game-selector');
    const gameContainer = document.getElementById('game-container');
    if (gameSelect) gameSelect.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';

    // Crear instancia del juego
    switch (gameType) {
      case 'quiz':
        this.currentGame = new QuizGame();
        this.playQuiz();
        break;
      case 'opening_heardle':
        this.currentGame = new OpeningHeardleGame();
        this.playOpeningHeardle();
        break;
      case 'smash_or_pass':
        this.currentGame = new SmashOrPassGame();
        this.playSmashOrPass();
        break;
      case 'popularity_comparison':
        this.currentGame = new PopularityComparisonGame();
        this.playPopularityComparison();
        break;
      case 'rule34_comparison':
        // Verificar que hay personajes válidos
        const validChars = getValidRule34Characters();
        if (validChars.length < 2) {
          alert('No hay suficientes personajes válidos (18+) para este juego');
          this.showMenu();
          return;
        }
        // Nota: En implementación completa, crear game class similar
        alert('Modo Rule34 Comparison: No implementado en esta versión');
        this.showMenu();
        break;
      case 'ratings_comparison':
        // Similar a popularity_comparison pero con ratings
        alert('Modo Ratings Comparison: No implementado en esta versión');
        this.showMenu();
        break;
      default:
        console.error(`Juego desconocido: ${gameType}`);
        this.showMenu();
    }
  }

  /**
   * JUEGO: Quiz Clásico
   */
  playQuiz() {
    this.updateQuizUI();
    this.setupQuizControls();
  }

  updateQuizUI() {
    const question = this.currentGame.getCurrentQuestion();
    const progress = `${this.currentGame.currentQuestionIndex + 1}/${this.currentGame.questions.length}`;
    
    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h2>Quiz de Anime</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${((this.currentGame.currentQuestionIndex + 1) / this.currentGame.questions.length) * 100}%"></div>
          </div>
          <p class="progress-text">${progress} | Puntuación: ${this.currentGame.score}</p>
        </div>
        
        <div class="quiz-content">
          <h3>${question.question}</h3>
          <p class="question-meta">Dificultad: ${question.difficulty}</p>
          
          <div class="options-container">
            ${question.options.map((option, idx) => `
              <button class="option-btn" data-index="${idx}">
                ${option}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Agregar event listeners
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.submitQuizAnswer(parseInt(e.target.dataset.index)));
    });
  }

  submitQuizAnswer(selectedIndex) {
    const result = this.currentGame.submitAnswer(selectedIndex);
    
    // Mostrar resultado
    const container = document.getElementById('game-container');
    const options = container.querySelectorAll('.option-btn');
    
    options[selectedIndex].classList.add(result.isCorrect ? 'correct' : 'incorrect');
    options[this.currentGame.getCurrentQuestion().correctAnswer].classList.add('correct-answer-highlight');
    
    // Deshabilitar botones
    options.forEach(btn => btn.disabled = true);
    
    // Mostrar explicación
    const explanation = document.createElement('div');
    explanation.className = 'explanation-container';
    explanation.innerHTML = `
      <p class="${result.isCorrect ? 'result-correct' : 'result-incorrect'}">
        ${result.isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
      </p>
      <p class="explanation">${result.explanation}</p>
      <p class="source">+${result.scoreGained} puntos</p>
    `;
    container.appendChild(explanation);
    
    // Siguiente pregunta después de 2 segundos
    setTimeout(() => {
      if (this.currentGame.isGameOver()) {
        this.showGameResults();
      } else {
        const next = this.currentGame.nextQuestion();
        this.updateQuizUI();
      }
    }, 2500);
  }

  /**
   * JUEGO: Smash or Pass
   */
  playSmashOrPass() {
    this.updateSmashOrPassUI();
  }

  updateSmashOrPassUI() {
    const character = this.currentGame.getCurrentCharacter();
    const progress = `${this.currentGame.currentCharacterIndex + 1}/${this.currentGame.characters.length}`;
    
    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML = `
      <div class="smash-container">
        <div class="smash-header">
          <h2>Smash or Pass</h2>
          <p class="progress-text">${progress}</p>
        </div>
        
        <div class="character-card">
          <div class="character-image-placeholder">
            <!-- Image would go here: ${character.imageUrl} -->
            <p>🎨 ${character.name}</p>
          </div>
          
          <div class="character-info">
            <h3>${character.name}</h3>
            <p class="series">${character.series}</p>
            <p class="description">${character.description}</p>
          </div>
          
          <div class="smash-buttons">
            <button id="btn-smash" class="btn-smash">❤️ SMASH</button>
            <button id="btn-pass" class="btn-pass">💔 PASS</button>
          </div>
        </div>
        
        <p class="ethical-note">✅ Solo personajes canonicamente adultos (18+)</p>
      </div>
    `;

    document.getElementById('btn-smash').onclick = () => this.submitSmashOrPassAnswer(true);
    document.getElementById('btn-pass').onclick = () => this.submitSmashOrPassAnswer(false);
  }

  submitSmashOrPassAnswer(isSmash) {
    const result = this.currentGame.submitAnswer(isSmash);
    
    // Mostrar respuesta
    const container = document.getElementById('game-container');
    const buttons = container.querySelectorAll('.smash-buttons button');
    buttons.forEach(btn => btn.disabled = true);
    
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerHTML = `
      <p class="choice-feedback">${result.choice}</p>
      <p>+${result.pointsGained} puntos</p>
    `;
    container.appendChild(feedback);
    
    // Siguiente personaje
    setTimeout(() => {
      if (this.currentGame.isGameOver()) {
        this.showGameResults();
      } else {
        const next = this.currentGame.nextCharacter();
        this.updateSmashOrPassUI();
      }
    }, 1500);
  }

  /**
   * JUEGO: Comparación de Popularidad
   */
  playPopularityComparison() {
    this.updatePopularityUI();
  }

  updatePopularityUI() {
    const question = this.currentGame.getCurrentQuestion();
    const progress = `${this.currentGame.currentPairIndex + 1}/${this.currentGame.pairs.length}`;
    
    const container = document.getElementById('game-container');
    if (!container) return;

    container.innerHTML = `
      <div class="comparison-container">
        <div class="comparison-header">
          <h2>¿Cuál es más famoso?</h2>
          <p class="metric">Métrica: ${question.metricName}</p>
          <p class="progress-text">${progress}</p>
        </div>
        
        <div class="comparison-content">
          <button class="anime-option" data-index="0">
            <span class="anime-name">${question.anime1.name}</span>
          </button>
          
          <div class="vs">VS</div>
          
          <button class="anime-option" data-index="1">
            <span class="anime-name">${question.anime2.name}</span>
          </button>
        </div>
        
        <p class="source">Fuente: ${question.source}</p>
      </div>
    `;

    document.querySelectorAll('.anime-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        this.submitPopularityAnswer(index);
      });
    });
  }

  submitPopularityAnswer(selectedIndex) {
    const result = this.currentGame.submitAnswer(selectedIndex);
    
    const container = document.getElementById('game-container');
    const buttons = container.querySelectorAll('.anime-option');
    
    buttons[selectedIndex].classList.add(result.isCorrect ? 'correct' : 'incorrect');
    
    // Mostrar estadísticas reales
    const stats = document.createElement('div');
    stats.className = 'stats-reveal';
    stats.innerHTML = `
      <p class="${result.isCorrect ? 'result-correct' : 'result-incorrect'}">
        ${result.isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
      </p>
      <div class="stats-table">
        ${Object.entries(result.stats).map(([name, value]) => `
          <div class="stat-row">
            <span>${name}:</span>
            <strong>${value.toLocaleString()}</strong>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(stats);
    
    buttons.forEach(b => b.disabled = true);
    
    setTimeout(() => {
      if (this.currentGame.isGameOver()) {
        this.showGameResults();
      } else {
        const next = this.currentGame.nextQuestion();
        this.updatePopularityUI();
      }
    }, 2500);
  }

  /**
   * Mostrar resultados del juego
   */
  showGameResults() {
    const results = this.currentGame.getResults();
    gameStorage.recordScore(results.gameId, results.totalScore, results);
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
      <div class="results-container">
        <h2>¡Juego Terminado!</h2>
        
        <div class="results-stats">
          <div class="stat">
            <span class="label">Puntuación Final:</span>
            <span class="value">${results.totalScore}</span>
          </div>
          
          <div class="stat">
            <span class="label">Respuestas Correctas:</span>
            <span class="value">${results.correctAnswers}/${results.totalQuestions}</span>
          </div>
          
          <div class="stat">
            <span class="label">Precisión:</span>
            <span class="value">${results.accuracy}%</span>
          </div>
          
          <div class="performance">
            <p class="performance-label">Desempeño:</p>
            <p class="performance-value">${results.performance}</p>
          </div>
        </div>
        
        <button id="btn-menu" class="btn-primary">Volver al Menú</button>
        <button id="btn-leaderboard" class="btn-secondary">Ver Clasificación</button>
      </div>
    `;

    document.getElementById('btn-menu').onclick = () => {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) gameContainer.style.display = 'none';
      this.showMenu();
    };

    document.getElementById('btn-leaderboard').onclick = () => this.showLeaderboard();
  }

  /**
   * PANTALLA: Leaderboard
   */
  showLeaderboard() {
    const leaderboard = gameStorage.getLeaderboard();
    const container = document.getElementById('game-container');
    
    if (!container) return;

    container.innerHTML = `
      <div class="leaderboard-container">
        <h2>🏆 Leaderboard Local</h2>
        
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Jugador</th>
              <th>Puntuación</th>
              <th>Juegos</th>
              <th>Racha Máxima</th>
            </tr>
          </thead>
          <tbody>
            ${leaderboard.map((entry, idx) => `
              <tr class="${idx === 0 ? 'champion' : ''} ${entry.playerName === this.currentPlayer.playerName ? 'current-player' : ''}">
                <td>${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}</td>
                <td>${entry.playerName}</td>
                <td><strong>${entry.totalScore}</strong></td>
                <td>${entry.gamesPlayed}</td>
                <td>${entry.maxStreak}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <button id="btn-back" class="btn-primary">Volver al Menú</button>
      </div>
    `;

    document.getElementById('btn-back').onclick = () => this.showMenu();
  }

  /**
   * PANTALLA: Perfil de usuario
   */
  showProfile() {
    const profile = gameStorage.getProfile();
    if (!profile) return;

    const container = document.getElementById('game-container') || document.body;
    
    const profileHtml = `
      <div class="profile-container">
        <h2>👤 Mi Perfil</h2>
        
        <div class="profile-header">
          <div class="avatar" style="background-color: ${profile.avatarColor}">
            ${profile.playerName.charAt(0).toUpperCase()}
          </div>
          <div class="profile-info">
            <h3>${profile.playerName}</h3>
            <p>ID: ${profile.playerId.substring(0, 8)}...</p>
          </div>
        </div>
        
        <div class="profile-stats">
          <div class="stat">
            <span class="label">Puntuación Total:</span>
            <span class="value">${profile.totalScore}</span>
          </div>
          <div class="stat">
            <span class="label">Juegos Jugados:</span>
            <span class="value">${profile.gamesPlayed}</span>
          </div>
          <div class="stat">
            <span class="label">Racha Actual:</span>
            <span class="value">${profile.currentStreak}</span>
          </div>
          <div class="stat">
            <span class="label">Racha Máxima:</span>
            <span class="value">${profile.maxStreak}</span>
          </div>
        </div>
        
        <div class="game-stats">
          <h4>Estadísticas por Juego:</h4>
          ${Object.entries(profile.stats).map(([gameId, stats]) => `
            <div class="game-stat">
              <strong>${gameId}:</strong> ${stats.attempts} intentos, ${stats.correct} correctas
            </div>
          `).join('')}
        </div>
        
        <button id="btn-back-profile" class="btn-primary">Volver</button>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = profileHtml;
    document.body.appendChild(wrapper);
    
    document.getElementById('btn-back-profile').onclick = () => {
      wrapper.remove();
      this.showMenu();
    };
  }

  /**
   * Actualizar display de perfil en menú
   */
  updateProfileDisplay() {
    const profileDisplay = document.getElementById('player-display');
    if (profileDisplay && this.currentPlayer) {
      profileDisplay.textContent = `Jugador: ${this.currentPlayer.playerName} | Score: ${this.currentPlayer.totalScore}`;
    }
  }

  /**
   * Setup de event listeners globales
   */
  setupEventListeners() {
    // Estos listeners se agregarán cuando sea necesario a través de las funciones específicas
  }

  /**
   * Placeholder para Opening Heardle (requiere implementación de Web Audio)
   */
  playOpeningHeardle() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
      <div class="feature-placeholder">
        <h2>🎵 Adivina el Opening</h2>
        <p>Este modo requiere archivos de audio locales.</p>
        <p>Para implementar:</p>
        <ol>
          <li>Descargar clips de openings (máx 30 seg)</li>
          <li>Guardar en assets/audio/openings/</li>
          <li>Ver README para más detalles</li>
        </ol>
        <button onclick="location.reload()">Volver</button>
      </div>
    `;
  }
}

/**
 * Instancia global de la aplicación
 */
let gameApp;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  gameApp = new GameApp();
});
