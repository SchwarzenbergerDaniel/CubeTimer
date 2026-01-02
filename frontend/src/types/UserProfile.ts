export interface UserProfile {
    id: number;
    username: string;
    avatar: string | null;
    pb: number;
    ao5: number;
    ao12: number;
    totalSolves: number;
    createdAt: string;
}