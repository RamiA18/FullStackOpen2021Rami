interface ExercisesResult {
  totalPeriod: number;
  trainingDaysPerPeriod: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  perDayTarget: number;
  averagePerDay: number;
}

const calculateExercises = (
  dailyLog: number[],
  targetAveragePerDay: number
): ExercisesResult => {
  let rating;
  let ratingDescription;
  const totalHours: number = dailyLog.reduce((acc, curr) => (acc += curr), 0);
  const averagePerDay: number = totalHours / dailyLog.length;
  if (averagePerDay > targetAveragePerDay) {
    rating = 5;
    ratingDescription = "Great Job. Above the target";
  } else if (averagePerDay === targetAveragePerDay) {
    rating = 3;
    ratingDescription = "Met the target!";
  } else if (averagePerDay < targetAveragePerDay) {
    rating = 1;
    ratingDescription = "Did not meet the expectations";
  }

  return {
    totalPeriod: dailyLog.length,
    trainingDaysPerPeriod: dailyLog.filter((dayHours) => dayHours > 0).length,
    success: targetAveragePerDay <= averagePerDay,
    rating,
    ratingDescription,
    perDayTarget: targetAveragePerDay,
    averagePerDay: Number(averagePerDay.toFixed(2)),
  };
};

export default calculateExercises;
// console.log(calculateExercises([5, 2, 1, 2, 0, 2, 1], 3))
