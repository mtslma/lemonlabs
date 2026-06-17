export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
    active?: boolean;
    createdAt?: string;
    email: string;
    id: string;
    name: string;
    role: UserRole;
    updatedAt?: string;
};

export type AuthSession = {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    email: string;
    name: string;
    password: string;
};

export type RefreshTokenPayload = {
    refreshToken: string;
};
