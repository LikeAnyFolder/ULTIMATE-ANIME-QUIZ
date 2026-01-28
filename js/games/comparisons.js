/**
 * MÓDULO: COMPARACIÓN DE POPULARIDAD (¿Qué anime es más famoso?)
 * 
 * Compara dos anime basándose en:
 * - MyAnimeList members
 * - IMDb votes
 * 
 * El jugador debe adivinar cuál anime tiene más seguidores/votos
 * 
 * Datos verificables de:
 * - myanimelist.net (member counts)
 * - imdb.com (user votes)
 * 
 * Última actualización: 2025-01-20
 */

class PopularityComparisonGame {
  constructor() {
    this.currentPairIndex = 0;
    this.score = 0;
    this.answers = [];
    this.metric = null;
    this.generatePairs();
  }

  /**
   * Generar pares de comparación random
   */
  generatePairs() {
    const animes = POPULARITY_DATA.animes;
    const pairs = [];

    // Generar 10 pares diferentes
    for (let i = 0; i < 10; i++) {
      const shuffled = [...animes].sort(() => Math.random() - 0.5);
      pairs.push({
        anime1: shuffled[0],
        anime2: shuffled[1],
        metric: Math.random() > 0.5 ? 'mal_members' : 'imdb_votes'
      });
    }

    this.pairs = pairs;
  }

  /**
   * Obtener pregunta actual
   */
  getCurrentQuestion() {
    const pair = this.pairs[this.currentPairIndex];
    if (!pair) return null;

    this.metric = pair.metric;
    const metricName = pair.metric === 'mal_members' ? 'Miembros en MyAnimeList' : 'Votos en IMDb';

    return {
      anime1: pair.anime1.name,
      anime2: pair.anime2.name,
      metric: pair.metric,
      metricName,
      source: 'MAL / IMDb (2025-01-20)',
      pair
    };
  }

  /**
   * Enviar respuesta (index 0 o 1 para anime1 o anime2)
   */
  submitAnswer(selectedAnimeIndex) {
    const pair = this.pairs[this.currentPairIndex];
    const metric = pair.metric;

    const value1 = pair.anime1[metric];
    const value2 = pair.anime2[metric];
    const correctIndex = value1 > value2 ? 0 : 1;
    const isCorrect = selectedAnimeIndex === correctIndex;

    const answer = {
      question: `¿Cuál es más popular? ${pair.anime1.name} vs ${pair.anime2.name}`,
      metric: pair.metric,
      selectedAnime: selectedAnimeIndex === 0 ? pair.anime1.name : pair.anime2.name,
      correctAnime: correctIndex === 0 ? pair.anime1.name : pair.anime2.name,
      selectedValue: selectedAnimeIndex === 0 ? value1 : value2,
      correctValue: correctIndex === 0 ? value1 : value2,
      isCorrect,
      timestamp: new Date().toISOString()
    };

    this.answers.push(answer);

    if (isCorrect) {
      this.score += 10;
    }

    return {
      isCorrect,
      correctAnime: answer.correctAnime,
      stats: {
        [pair.anime1.name]: value1,
        [pair.anime2.name]: value2
      },
      metricUsed: pair.metric === 'mal_members' ? 'Miembros MAL' : 'Votos IMDb'
    };
  }

  /**
   * Siguiente pregunta
   */
  nextQuestion() {
    this.currentPairIndex++;
    return {
      hasNext: this.currentPairIndex < this.pairs.length,
      currentIndex: this.currentPairIndex,
      total: this.pairs.length
    };
  }

  /**
   * ¿Juego terminado?
   */
  isGameOver() {
    return this.currentPairIndex >= this.pairs.length;
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
      gameId: 'popularity_comparison',
      timestamp: new Date().toISOString(),
      answers: this.answers,
      performance: this._getPerformanceLevel(accuracy)
    };
  }

  _getPerformanceLevel(accuracy) {
    if (accuracy === 100) return 'EXPERTO EN POPULARIDAD';
    if (accuracy >= 90) return 'EXCELENTE CONOCIMIENTO';
    if (accuracy >= 80) return 'BUEN DESEMPEÑO';
    if (accuracy >= 70) return 'SATISFACTORIO';
    if (accuracy >= 50) return 'REGULAR';
    return 'NECESITA ESTUDIO';
  }
}
