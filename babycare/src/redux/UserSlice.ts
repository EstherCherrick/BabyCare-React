import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, register, sendVerificationCode, validateCode } from '../api/apiService';

interface UserState {
    id: string;
    email: string;
    isRegistered: boolean;
    isVerified: boolean;
    userExists: boolean | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    id: '',
    email: '',
    isRegistered: false,
    isVerified: false,
    userExists: null,
    loading: false,
    error: null,
};

export const checkUserThunk = createAsyncThunk(
    'user/checkUser',
    async ({ id, email }: { id: string; email: string }, { rejectWithValue }) => {
        try {
            const response = await checkUser(id, email);
            if (response.status === 200 && response.data) {
                return { exists: true, id, email };
            } else if (response.status === 404) {
                return { exists: false };
            } else {
                return rejectWithValue('שגיאה בבדיקת משתמש');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'שגיאה בבדיקת משתמש');
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await register(userData);
            if (response.status === 201) {
                return { id: userData.babyId, email: userData.parentEmail };
            } else {
                return rejectWithValue('הרשמה נכשלה');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'שגיאה בהרשמה');
        }
    }
);

export const sendCode = createAsyncThunk(
    'user/sendCode',
    async (email: string, { rejectWithValue }) => {
        try {
            await sendVerificationCode(email);
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message || 'שגיאה בשליחת קוד');
        }
    }
);

export const verifyCode = createAsyncThunk(
    'user/verifyCode',
    async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await validateCode(email, otp);
            if (response.data.success) {
                return true;
            } else {
                return rejectWithValue('קוד האימות שגוי');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'שגיאה באימות קוד');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },
        setUserEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setIsRegistered(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.userExists = null;
            })
            .addCase(checkUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userExists = action.payload?.exists ?? null;
                if (action.payload?.exists) {
                    state.id = action.payload.id ?? '';
                    state.email = action.payload.email ?? '';
                }
            })
            .addCase(checkUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.userExists = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isRegistered = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isRegistered = true;
                state.id = action.payload?.id || '';
                state.email = action.payload?.email || '';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isRegistered = false;
            })
            .addCase(sendCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendCode.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(verifyCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyCode.fulfilled, (state) => {
                state.loading = false;
                state.isVerified = true;
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isVerified = false;
            });
    },
});

export const { setUserId, setUserEmail, setIsRegistered } = userSlice.actions;
export default userSlice.reducer;
