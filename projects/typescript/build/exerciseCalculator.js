export const calculateExercises = (hours, target) => {
    const average = hours.reduce((prev, curr) => prev + curr, 0) / hours.length;
    const achievements = average / target;
    let rating;
    if (achievements < 0.5) {
        rating = 1;
    }
    else if (achievements < 1) {
        rating = 2;
    }
    else {
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
