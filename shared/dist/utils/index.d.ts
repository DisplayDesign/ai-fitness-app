export declare function generateUUID(): string;
export declare function convertTimestamp(timestamp: any): Date;
export declare function formatDate(date: Date, locale?: string): string;
export declare function formatTime(date: Date, locale?: string): string;
export declare function validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
};
export declare function validateEmail(email: string): boolean;
export declare function calculateBMI(weight: number, height: number): number;
export declare function getBMICategory(bmi: number): string;
export declare function getGoalText(goal: string): string;
export declare function getHistoryText(history: string): string;
