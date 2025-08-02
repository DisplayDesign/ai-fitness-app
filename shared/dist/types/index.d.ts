export interface UserProfile {
    name: string;
    gender: 'male' | 'female';
    height: number;
    weight: number;
    training_history: 'beginner' | 'intermediate' | 'advanced';
    goal: 'muscle_gain' | 'weight_loss' | 'strength' | 'endurance';
}
export interface User {
    user_id: string;
    email: string;
    profile: UserProfile;
    created_at: Date;
    updated_at: Date;
}
export interface Exercise {
    exercise_id: string;
    name: string;
    description: string;
    video_url: string;
    target_part: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    equipment: string[];
    instructions: string[];
    tips: string[];
}
export interface TrainingPlan {
    plan_id: string;
    user_id: string;
    plan_data: {
        exercises: Array<{
            name: string;
            sets: number;
            reps: number;
            weight: number;
        }>;
        duration: number;
        difficulty: string;
    };
    start_date: Date;
    created_at: Date;
}
export interface TrainingLog {
    log_id: string;
    user_id: string;
    plan_id: string;
    log_content: string;
    submitted_at: Date;
}
export interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}
export interface AIChatLog {
    chat_id: string;
    user_id: string;
    messages: ChatMessage[];
    created_at: Date;
}
export interface Article {
    article_id: string;
    title: string;
    content: string;
    category: 'training' | 'nutrition' | 'health' | 'motivation';
    published_at: Date;
    author: string;
    tags: string[];
    image_url?: string;
}
export interface GoalSetting {
    goal_id: string;
    user_id: string;
    type: 'weight' | 'strength' | 'endurance' | 'body_composition';
    target_value: number;
    current_value: number;
    unit: string;
    deadline: Date;
    created_at: Date;
    updated_at: Date;
}
