export interface LoginPayload {
    email: string;
    password: string;
}

export interface VerifyOtpPayload {
    otp: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface ApiErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

