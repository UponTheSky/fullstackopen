interface ReturnValue {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
export declare const calculateExercises: (hours: number[], target: number) => ReturnValue;
export {};
