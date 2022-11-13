export const calculateBmi = (height, weight) => {
    const bmi = weight / (height * height);
    let message;
    if (bmi < 18.4) {
        message = "under weight";
    }
    else if (bmi <= 24.9) {
        message = "normal";
    }
    else {
        message = "overweight";
    }
    return message;
};
