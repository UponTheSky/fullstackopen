interface ReturnValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (hours: number[], target: number): ReturnValue => {
  const average = hours.reduce((prev, curr) => prev + curr, 0) / hours.length;
  const achievements = average / target;

  let rating: number;

  if (achievements < 0.5) {
    rating = 1;
  } else if (achievements < 1) {
    rating = 2;
  } else {
    rating = 3;
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(hour => hour !== 0).length,
    success: rating === 3,
    rating,
    ratingDescription: '',
    target,
    average
  };
};
