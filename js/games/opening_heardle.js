/**
 * MÓDULO: ADIVINA EL OPENING (Opening Heardle)
 * 
 * Tipo Heardle: Escucha clips de openings y adivina cuál es
 * 
 * NOTA CRÍTICA SOBRE AUDIO:
 * Este módulo está diseñado para funcionar con archivos de audio locales.
 * No incluimos audio files en el repo por copyright.
 * 
 * INSTRUCCIONES PARA IMPLEMENTAR:
 * 1. Descargar clips de openings (máx 30 segundos bajo fair use)
 * 2. Convertir a MP3/WAV
 * 3. Guardar en: assets/audio/openings/
 * 4. Nombrar: {openingId}.mp3 (ej: aot_opening1.mp3)
 * 5. Actualizar rutas en este archivo
 * 
 * El juego proporciona:
 * - Sistema de progresión de duración (comienza con 5 seg, sube a 30 seg)
 * - Sistema de vidas (3 intentos antes de perder)
 * - Puntuación basada en duración mínima usada
 * 
 * Fuente: Metadata de openings reales verificados
 * Última actualización: 2025-01-20
 */

class OpeningHeardleGame {
  constructor() {
    this.currentOpeningIndex = 0;
    this.lives = 3;
    this.score = 0;
    this.answers = [];
    this.audioContext = null;
    
    // Obtener openings y mezclarlos
    this.openings = JSON.parse(JSON.stringify(OPENINGS_DATA.openings));
    this.openings.sort(() => Math.random() - 0.5);
    
    // Inicializar progresión de audio para cada opening
    this.audioProgression = this._initAudioProgression();
  }

  /**
   * Inicializar sistema de progresión de duración de audio
   * Comienza con 5 segundos, aumenta con intentos
   */
  _initAudioProgression() {
    return {
      currentDuration: 5, // Comienza con 5 segundos
      maxDuration: 30,
    };
  }

  /**
   * Obtener opening actual
   */
  getCurrentOpening() {
    return this.openings[this.currentOpeningIndex];
  }

  /**
   * Obtener audio clip actual
   * Retorna: { audioFile, duration, attempt }
   */
  getAudioClip() {
    const opening = this.getCurrentOpening();
    
    // Nota: En implementación real, usar Web Audio API para cortar el archivo
    return {
      audioFile: opening.audioFile,
      currentDuration: this.audioProgression.currentDuration,
      maxDuration: opening.duration_seconds,
      audioUrl: `assets/audio/openings/${opening.id}.mp3`,
      note: 'Los archivos de audio deben descargarse legalmente y colocarse en assets/audio/'
    };
  }

  /**
   * Revelar más segundos de audio (si hay intentos restantes)
   */
  expandAudioClip() {
    if (this.lives <= 0) {
      return { success: false, reason: 'No hay más vidas' };
    }

    this.audioProgression.currentDuration = Math.min(
      this.audioProgression.currentDuration + 5,
      this.audioProgression.maxDuration
    );

    this.lives -= 1;

    return {
      success: true,
      newDuration: this.audioProgression.currentDuration,
      livesRemaining: this.lives
    };
  }

  /**
   * Enviar respuesta (índice del opening adivinado)
   */
  submitGuess(guessedOpeningIndex) {
    const correctOpening = this.getCurrentOpening();
    const allOpenings = this.openings;
    
    const isCorrect = allOpenings[guessedOpeningIndex].id === correctOpening.id;
    
    // Calcular puntuación basada en duración usada
    let pointsGained = 0;
    if (isCorrect) {
      // Puntos bonus si adivinaste con poco audio
      const durationUsed = this.audioProgression.currentDuration;
      const durationFraction = durationUsed / correctOpening.duration_seconds;
      pointsGained = Math.round(50 * durationFraction);
      this.score += pointsGained;
    }

    const answer = {
      openingId: correctOpening.id,
      correctOpening: correctOpening.title,
      correctAnime: correctOpening.animeName,
      guessedOpeningId: allOpenings[guessedOpeningIndex].id,
      guessedOpening: allOpenings[guessedOpeningIndex].title,
      guessedAnime: allOpenings[guessedOpeningIndex].animeName,
      isCorrect,
      durationUsed: this.audioProgression.currentDuration,
      pointsEarned: pointsGained,
      timestamp: new Date().toISOString()
    };

    this.answers.push(answer);

    return {
      isCorrect,
      correctOpening: correctOpening.title,
      correctAnime: correctOpening.animeName,
      pointsGained,
      message: isCorrect 
        ? `¡Correcto! ${correctOpening.title} de ${correctOpening.animeName}`
        : `Incorrecto. Era ${correctOpening.title} de ${correctOpening.animeName}`
    };
  }

  /**
   * Siguiente opening
   */
  nextOpening() {
    this.currentOpeningIndex++;
    this.audioProgression = this._initAudioProgression();
    this.lives = 3;
    
    return {
      hasNext: this.currentOpeningIndex < this.openings.length,
      currentIndex: this.currentOpeningIndex,
      total: this.openings.length
    };
  }

  /**
   * ¿Juego terminado?
   */
  isGameOver() {
    return this.currentOpeningIndex >= this.openings.length;
  }

  /**
   * Obtener resultados finales
   */
  getResults() {
    const correctAnswers = this.answers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctAnswers / this.answers.length) * 100);

    return {
      totalScore: this.score,
      correctAnswers,
      totalQuestions: this.answers.length,
      accuracy,
      gameId: 'opening_heardle',
      timestamp: new Date().toISOString(),
      answers: this.answers,
      performance: this._getPerformanceLevel(accuracy),
      note: 'Audio files no incluido por copyright. Ver README para implementación.'
    };
  }

  _getPerformanceLevel(accuracy) {
    if (accuracy === 100) return 'OÍDO DORADO';
    if (accuracy >= 90) return 'EXPERTO EN OPENINGS';
    if (accuracy >= 80) return 'FANÁTICO DE ANIME';
    if (accuracy >= 70) return 'BUEN OYENTE';
    if (accuracy >= 50) return 'PRINCIPIANTE';
    return 'NECESITA ENTRENAR';
  }

  /**
   * Obtener opciones de respuesta (todos los openings)
   */
  getAnswerOptions() {
    return this.openings.map((op, idx) => ({
      index: idx,
      animeName: op.animeName,
      title: op.title,
      artist: op.artist,
      season: op.season
    }));
  }
}
