/**
 * STORAGE SYSTEM - Gestión de datos locales (localStorage)
 * 
 * Responsabilidades:
 * - Perfiles de usuario (nombre, avatar, stats)
 * - Puntuaciones por juego
 * - Leaderboard local
 * - Historial de sesión
 * 
 * Todo almacenado en localStorage del navegador (no requiere backend)
 */

class GameStorage {
  constructor() {
    this.STORAGE_KEY_PROFILE = 'ultimate_anime_quiz_profile';
    this.STORAGE_KEY_SCORES = 'ultimate_anime_quiz_scores';
    this.STORAGE_KEY_LEADERBOARD = 'ultimate_anime_quiz_leaderboard';
    this.STORAGE_KEY_SESSION = 'ultimate_anime_quiz_session';
  }

  /**
   * GESTIÓN DE PERFIL DE USUARIO
   */
  initializeProfile(playerName) {
    const profile = {
      playerName,
      playerId: this._generateId(),
      createdDate: new Date().toISOString(),
      totalScore: 0,
      gamesPlayed: 0,
      currentStreak: 0,
      maxStreak: 0,
      avatarColor: this._getRandomColor(),
      stats: {
        quiz: { attempts: 0, correct: 0, score: 0 },
        opening_heardle: { attempts: 0, correct: 0, score: 0 },
        smash_or_pass: { attempts: 0, correct: 0, score: 0 },
        rule34_comparison: { attempts: 0, correct: 0, score: 0 },
        popularity_comparison: { attempts: 0, correct: 0, score: 0 },
        ratings_comparison: { attempts: 0, correct: 0, score: 0 }
      }
    };
    
    localStorage.setItem(this.STORAGE_KEY_PROFILE, JSON.stringify(profile));
    return profile;
  }

  /**
   * Obtener perfil actual
   */
  getProfile() {
    const stored = localStorage.getItem(this.STORAGE_KEY_PROFILE);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Actualizar perfil
   */
  updateProfile(updates) {
    const profile = this.getProfile();
    if (!profile) throw new Error('No hay perfil activo');
    
    const updated = { ...profile, ...updates };
    localStorage.setItem(this.STORAGE_KEY_PROFILE, JSON.stringify(updated));
    return updated;
  }

  /**
   * GESTIÓN DE PUNTUACIONES POR JUEGO
   */
  recordScore(gameId, score, details = {}) {
    const scores = this.getScores() || [];
    
    const record = {
      gameId,
      score,
      timestamp: new Date().toISOString(),
      details,
      id: this._generateId()
    };

    scores.push(record);
    localStorage.setItem(this.STORAGE_KEY_SCORES, JSON.stringify(scores));

    // Actualizar estadísticas globales del perfil
    this._updateProfileStats(gameId, score, details);

    return record;
  }

  /**
   * Obtener todas las puntuaciones
   */
  getScores() {
    const stored = localStorage.getItem(this.STORAGE_KEY_SCORES);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Obtener puntuaciones de un juego específico
   */
  getScoresByGame(gameId) {
    return this.getScores().filter(s => s.gameId === gameId);
  }

  /**
   * GESTIÓN DE LEADERBOARD LOCAL
   */
  getLeaderboard() {
    const stored = localStorage.getItem(this.STORAGE_KEY_LEADERBOARD);
    if (!stored) return [];
    
    const leaderboard = JSON.parse(stored);
    return leaderboard.sort((a, b) => b.totalScore - a.totalScore);
  }

  /**
   * Registrar jugador en leaderboard (solo si no existe)
   */
  registerInLeaderboard(playerName) {
    let leaderboard = this.getLeaderboard();
    
    // Evitar duplicados
    if (leaderboard.find(p => p.playerId === playerName)) {
      return leaderboard;
    }

    const entry = {
      playerId: playerName,
      playerName,
      totalScore: 0,
      gamesPlayed: 0,
      maxStreak: 0,
      firstPlay: new Date().toISOString(),
      color: this._getRandomColor()
    };

    leaderboard.push(entry);
    localStorage.setItem(this.STORAGE_KEY_LEADERBOARD, JSON.stringify(leaderboard));
    return leaderboard;
  }

  /**
   * Actualizar entrada en leaderboard
   */
  updateLeaderboardEntry(playerId, updates) {
    const leaderboard = this.getLeaderboard();
    const entry = leaderboard.find(p => p.playerId === playerId);
    
    if (entry) {
      Object.assign(entry, updates);
      localStorage.setItem(this.STORAGE_KEY_LEADERBOARD, JSON.stringify(leaderboard));
    }
    
    return entry;
  }

  /**
   * GESTIÓN DE SESIÓN (para tracking dentro de una sesión)
   */
  startSession() {
    const session = {
      sessionId: this._generateId(),
      startTime: new Date().toISOString(),
      gamesInSession: [],
      totalScoreThisSession: 0
    };

    localStorage.setItem(this.STORAGE_KEY_SESSION, JSON.stringify(session));
    return session;
  }

  /**
   * Agregar juego a la sesión actual
   */
  addGameToSession(gameId, score) {
    const session = JSON.parse(localStorage.getItem(this.STORAGE_KEY_SESSION)) || this.startSession();
    
    session.gamesInSession.push({
      gameId,
      score,
      timestamp: new Date().toISOString()
    });
    session.totalScoreThisSession += score;

    localStorage.setItem(this.STORAGE_KEY_SESSION, JSON.stringify(session));
    return session;
  }

  /**
   * Obtener sesión actual
   */
  getSession() {
    const stored = localStorage.getItem(this.STORAGE_KEY_SESSION);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * MÉTODOS PRIVADOS AUXILIARES
   */
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  _getRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Actualizar estadísticas del perfil después de un juego
   */
  _updateProfileStats(gameId, score, details) {
    const profile = this.getProfile();
    if (!profile) return;

    // Estadísticas generales
    profile.totalScore += score;
    profile.gamesPlayed += 1;

    // Racha
    if (details.correct) {
      profile.currentStreak += 1;
      if (profile.currentStreak > profile.maxStreak) {
        profile.maxStreak = profile.currentStreak;
      }
    } else {
      profile.currentStreak = 0;
    }

    // Estadísticas específicas del juego
    if (profile.stats[gameId]) {
      profile.stats[gameId].attempts += 1;
      if (details.correct) {
        profile.stats[gameId].correct += 1;
      }
      profile.stats[gameId].score += score;
    }

    this.updateProfile(profile);
    
    // Actualizar también en leaderboard
    this.updateLeaderboardEntry(profile.playerId, {
      totalScore: profile.totalScore,
      gamesPlayed: profile.gamesPlayed,
      maxStreak: profile.maxStreak
    });
  }

  /**
   * LIMPIAR DATOS (para testing o reset)
   */
  clearAllData() {
    localStorage.removeItem(this.STORAGE_KEY_PROFILE);
    localStorage.removeItem(this.STORAGE_KEY_SCORES);
    localStorage.removeItem(this.STORAGE_KEY_LEADERBOARD);
    localStorage.removeItem(this.STORAGE_KEY_SESSION);
  }

  /**
   * Exportar datos (para backup)
   */
  exportData() {
    return {
      profile: this.getProfile(),
      scores: this.getScores(),
      leaderboard: this.getLeaderboard(),
      session: this.getSession(),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Importar datos (para restore)
   */
  importData(data) {
    if (data.profile) localStorage.setItem(this.STORAGE_KEY_PROFILE, JSON.stringify(data.profile));
    if (data.scores) localStorage.setItem(this.STORAGE_KEY_SCORES, JSON.stringify(data.scores));
    if (data.leaderboard) localStorage.setItem(this.STORAGE_KEY_LEADERBOARD, JSON.stringify(data.leaderboard));
  }
}

// Crear instancia global
const gameStorage = new GameStorage();
