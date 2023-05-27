export type LoginData = {
    username: string;
    password: string;
}

export type RegisterData = {
    username: string;
    password: string;
}
export type LoginResult =
    | { error: { code: number; data: any }; isError: true }
    | {
        isError: false; success: { session: string }
    };

export type RegisterResult =
    | { error: { code: number; data: any }; isError: true }
    | {
        isError: false; success: { session: string }
    };
export type LogoutResult =
    | { error: { code: number; data: any }; isError: true }
    | {
        isError: false; success: boolean
    }

export interface UserManager {
    login(logindata: LoginData): Promise<LoginResult>

    register(registerdata: RegisterData): Promise<RegisterResult>

    logout(sessiontoken: string): Promise<LogoutResult>
}
export interface UIDRandomizer {
    generate_unique_id(): string;
}

export interface Encrypter {
    hash(password: string, salt: string): string;
}