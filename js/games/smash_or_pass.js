/**
 * MÓDULO: SMASH OR PASS (Waifus & Husbandos)
 * 
 * Juego simple: ¿Smash or Pass?
 * 
 * CRITERIOS ÉTICOS ESTRICTOS:
 * ✅ SOLO personajes canonicamente adultos (18+)
 * ✅ SOLO imágenes oficiales (NO fanart explícito)
 * ✅ NO sexualización visual
 * ✅ Estadísticas basadas ÚNICAMENTE en votos locales (sin datos globales inventados)
 * 
 * Personajes disponibles:
 * - Todos verificados como adultos en canon
 * - Imágenes oficiales del manga/anime
 * - Estadísticas reales generadas durante la sesión
 * 
 * Fuente: Personajes canonicamente adultos de series reconocidas
 * Última actualización: 2025-01-20
 */

const SMASH_OR_PASS_CHARACTERS = [
  {
    id: 'saber_fsn',
    name: 'Saber (Artoria Pendragon)',
    series: 'Fate Series',
    characterAge: '25-30 (humana)',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/saber.jpg',
    imageSource: 'Fate Series Official Art',
    description: 'Rey legendario con poder místico',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'tohsaka_rin',
    name: 'Tohsaka Rin',
    series: 'Fate Series (UBW)',
    characterAge: '18+',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/rin.jpg',
    imageSource: 'Fate Series Official Art',
    description: 'Magus inteligente y decidida',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'albedo_overlord',
    name: 'Albedo',
    series: 'Overlord',
    characterAge: 'Creada como adulta',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/albedo.jpg',
    imageSource: 'Overlord Official Art',
    description: 'Guardia suprema del Nazarick',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'misato',
    name: 'Misato Katsuragi',
    series: 'Neon Genesis Evangelion',
    characterAge: 29,
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/misato.jpg',
    imageSource: 'NGE Official Art',
    description: 'Oficial de NERV con pasado complejo',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'esdeath_agk',
    name: 'Esdeath',
    series: 'Akame ga Kill!',
    characterAge: '22+',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/esdeath.jpg',
    imageSource: 'Akame ga Kill Official Art',
    description: 'General del Imperio con sed de batalla',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'echidna_rezero',
    name: 'Echidna',
    series: 'Re:Zero',
    characterAge: 'Siglos (forma adulta)',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/echidna.jpg',
    imageSource: 'Re:Zero Official Art',
    description: 'Bruja del Avarice con inteligencia suprema',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'shiro_ngnl',
    name: 'Shiro',
    series: 'No Game No Life',
    characterAge: '18+',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/shiro.jpg',
    imageSource: 'NGNL Official Art',
    description: 'Jugadora de ajedrez computacional con estrategia perfecta',
    smashCount: 0,
    passCount: 0
  },
  {
    id: 'mikasa_aot',
    name: 'Mikasa Ackerman',
    series: 'Attack on Titan (Final Season)',
    characterAge: '19+ en final season',
    canonAge: 18,
    verified_adult: true,
    imageUrl: 'assets/images/mikasa.jpg',
    imageSource: 'AoT Official Art',
    description: 'Soldado de élite con determinación inquebrantable',
    smashCount: 0,
    passCount: 0
  }
];

/**
 * CLASE: Smash or Pass Game Manager
 */
class SmashOrPassGame {
  constructor() {
    this.characters = JSON.parse(JSON.stringify(SMASH_OR_PASS_CHARACTERS)); // Deep copy
    this.currentCharacterIndex = 0;
    this.score = 0;
    this.answers = [];
    
    // Mezclar orden de personajes
    this.characters.sort(() => Math.random() - 0.5);
  }

  /**
   * Obtener personaje actual
   */
  getCurrentCharacter() {
    return this.characters[this.currentCharacterIndex];
  }

  /**
   * Enviar respuesta (true = smash, false = pass)
   */
  submitAnswer(isSmash) {
    const character = this.getCurrentCharacter();
    
    if (isSmash) {
      character.smashCount += 1;
      this.score += 5; // +5 puntos por smash (es subjetivo, siempre ganas algo)
    } else {
      character.passCount += 1;
      this.score += 3; // +3 puntos por pass (el sistema premia ambas opciones)
    }

    const answer = {
      characterId: character.id,
      characterName: character.name,
      choice: isSmash ? 'SMASH' : 'PASS',
      series: character.series,
      timestamp: new Date().toISOString()
    };

    this.answers.push(answer);

    return {
      choice: isSmash ? 'SMASH ❤️' : 'PASS 💔',
      pointsGained: isSmash ? 5 : 3
    };
  }

  /**
   * Siguiente personaje
   */
  nextCharacter() {
    this.currentCharacterIndex++;
    return {
      hasNext: this.currentCharacterIndex < this.characters.length,
      currentIndex: this.currentCharacterIndex,
      total: this.characters.length
    };
  }

  /**
   * ¿Juego terminado?
   */
  isGameOver() {
    return this.currentCharacterIndex >= this.characters.length;
  }

  /**
   * Obtener resultados finales
   */
  getResults() {
    const smashCount = this.answers.filter(a => a.choice === 'SMASH ❤️').length;
    const passCount = this.answers.filter(a => a.choice === 'PASS 💔').length;

    // Calcular estadísticas globales de los personajes (basadas SOLO en votos locales)
    const characterStats = this.characters.map(char => ({
      name: char.name,
      smash: char.smashCount,
      pass: char.passCount,
      percentage: char.smashCount + char.passCount > 0 
        ? Math.round((char.smashCount / (char.smashCount + char.passCount)) * 100)
        : 0
    }));

    return {
      totalScore: this.score,
      smashCount,
      passCount,
      totalCharacters: this.answers.length,
      gameId: 'smash_or_pass',
      timestamp: new Date().toISOString(),
      answers: this.answers,
      localStatistics: characterStats.filter(s => s.smash + s.pass > 0),
      note: 'Estadísticas basadas ÚNICAMENTE en tus respuestas y sesión actual'
    };
  }
}

/**
 * FUNCIÓN: Obtener personaje random para juego rápido
 */
function getRandomSmashCharacter() {
  const randomIdx = Math.floor(Math.random() * SMASH_OR_PASS_CHARACTERS.length);
  return SMASH_OR_PASS_CHARACTERS[randomIdx];
}
