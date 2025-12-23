// Scoring system for the learning platform

export interface QuizAttempt {
  quizId: number;
  attempts: number;
  correct: boolean;
}

export interface EvaluationResult {
  topic: string;
  score: number;
  totalQuestions: number;
}

export interface UserScore {
  learningAttempts: QuizAttempt[];
  evaluationResults: EvaluationResult[];
  totalScore: number;
}

const STORAGE_KEY = 'user_score_data';

// Scoring rules
const POINTS = {
  LEARNING_FIRST_TRY: 10,
  LEARNING_LATER_TRY: 3,
  EVALUATION_CORRECT: 25,
};

// Get user score data from localStorage
export const getUserScoreData = (): UserScore => {
  if (typeof window === 'undefined') {
    return {
      learningAttempts: [],
      evaluationResults: [],
      totalScore: 0,
    };
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      learningAttempts: [],
      evaluationResults: [],
      totalScore: 0,
    };
  }

  return JSON.parse(data);
};

// Save user score data to localStorage
export const saveUserScoreData = (data: UserScore) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Record a learning quiz attempt
export const recordLearningAttempt = (quizId: number, isCorrect: boolean) => {
  const data = getUserScoreData();
  
  const existingAttempt = data.learningAttempts.find(a => a.quizId === quizId);
  
  if (existingAttempt) {
    // Increment attempts
    existingAttempt.attempts++;
    if (isCorrect && !existingAttempt.correct) {
      existingAttempt.correct = true;
    }
  } else {
    // First attempt
    data.learningAttempts.push({
      quizId,
      attempts: 1,
      correct: isCorrect,
    });
  }

  // Recalculate total score
  data.totalScore = calculateTotalScore(data);
  saveUserScoreData(data);
};

// Record evaluation results
export const recordEvaluationResult = (topic: string, correctAnswers: number, totalQuestions: number) => {
  const data = getUserScoreData();
  
  // Update or add evaluation result
  const existingResult = data.evaluationResults.find(r => r.topic === topic);
  if (existingResult) {
    existingResult.score = correctAnswers;
    existingResult.totalQuestions = totalQuestions;
  } else {
    data.evaluationResults.push({
      topic,
      score: correctAnswers,
      totalQuestions,
    });
  }

  // Recalculate total score
  data.totalScore = calculateTotalScore(data);
  saveUserScoreData(data);
};

// Calculate total score based on all attempts
export const calculateTotalScore = (data: UserScore): number => {
  let total = 0;

  // Learning attempts scoring
  data.learningAttempts.forEach(attempt => {
    if (attempt.correct) {
      if (attempt.attempts === 1) {
        total += POINTS.LEARNING_FIRST_TRY;
      } else {
        total += POINTS.LEARNING_LATER_TRY;
      }
    }
  });

  // Evaluation scoring
  data.evaluationResults.forEach(result => {
    total += result.score * POINTS.EVALUATION_CORRECT;
  });

  return total;
};

// Get badges earned based on score
export const getBadges = (score: number): string[] => {
  const badges: string[] = [];
  
  if (score >= 50) badges.push('Bronze Badge');
  if (score >= 100) badges.push('Silver Badge');
  if (score >= 200) badges.push('Gold Badge');
  if (score >= 300) badges.push('Platinum Badge');
  if (score >= 400) badges.push('Diamond Badge');
  
  return badges;
};

// Get learning score breakdown
export const getLearningScore = (): number => {
  const data = getUserScoreData();
  let total = 0;

  data.learningAttempts.forEach(attempt => {
    if (attempt.correct) {
      if (attempt.attempts === 1) {
        total += POINTS.LEARNING_FIRST_TRY;
      } else {
        total += POINTS.LEARNING_LATER_TRY;
      }
    }
  });

  return total;
};

// Get evaluation score breakdown
export const getEvaluationScore = (): number => {
  const data = getUserScoreData();
  let total = 0;

  data.evaluationResults.forEach(result => {
    total += result.score * POINTS.EVALUATION_CORRECT;
  });

  return total;
};

// Reset user score to 0
export const resetUserScore = () => {
  const emptyData: UserScore = {
    learningAttempts: [],
    evaluationResults: [],
    totalScore: 0,
  };
  saveUserScoreData(emptyData);
};