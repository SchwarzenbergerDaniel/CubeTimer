// BACKEND_EXPECTATION: GET /api/users/{userId}/profile
// Response: { id, username, avatar, pb, ao5, ao12, totalSolves, createdAt }
import type {UserSearchResultModel} from "../types/UserSearchResultModel.ts";
import type {SolveDataModel} from "../types/SolveDataModel.ts";
import type {SolveResultModel} from "../types/SolveResultModel.ts";
import type {UserProfileModel} from "../types/UserProfileModel.ts";

export const MOCK_USER_PROFILE: UserProfileModel = {
    id: 1,
    username: 'CubeDestroyer99',
    avatar: null,
    pb: 7.42,
    ao5: 9.83,
    ao12: 10.24,
    totalSolves: 1847,
    createdAt: '2023-06-15'
};

// TODO: GET /api/users/search?q={query}
export const MOCK_SEARCH_RESULTS: UserSearchResultModel[] = [
    {id: 2, username: 'SpeedCubeKing', pb: 5.89, totalSolves: 4521},
    {id: 3, username: 'RubikMaster_DE', pb: 8.34, totalSolves: 2103},
    {id: 4, username: 'CubingNinja', pb: 6.12, totalSolves: 3890},
    {id: 5, username: 'PuzzleSolverX', pb: 11.45, totalSolves: 892},
    {id: 6, username: 'CubeVortex', pb: 7.01, totalSolves: 2567},
];

// TODO: POST /api/solves -> should return the updates times: { id, pb, ao5, ao12, totalSolves }
export const mockSaveSolve = async (solveData: SolveDataModel): Promise<SolveResultModel> => {
    console.log('MOCK API CALL: POST /api/solves', solveData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Math.floor(Math.random() * 10000),
                pb: solveData.time < MOCK_USER_PROFILE.pb ? solveData.time : MOCK_USER_PROFILE.pb,
                ao5: 9.71,
                ao12: 10.18,
                totalSolves: MOCK_USER_PROFILE.totalSolves + 1
            });
        }, 300);
    });
};

// TODO: GET /api/users/search?q={query}
export const mockSearchUsers = async (query: string): Promise<UserSearchResultModel[]> => {
    console.log('MOCK API CALL: GET /api/users/search?q=' + query);
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = MOCK_SEARCH_RESULTS.filter(user =>
                user.username.toLowerCase().includes(query.toLowerCase())
            );
            resolve(filtered);
        }, 300);
    });
};