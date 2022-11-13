import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const args = process.argv.slice(2);
try {
    switch (args[0]) {
        case 'bmi':
            if (args.length !== 3) {
                throw new Error('invalid inputs');
            }
            const height = Number(args[1]);
            const weight = Number(args[2]);
            console.log(calculateBmi(height, weight));
            break;
        case 'ex':
            if (args.length < 3) {
                throw new Error('not enough inputs');
            }
            const target = Number(args[1]);
            const hours = args.slice(2).map(hour => Number(hour));
            console.log(hours);
            console.log(calculateExercises(hours, target));
            break;
        default:
            throw new Error("no corresponding operations");
    }
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
