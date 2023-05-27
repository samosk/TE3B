import { database } from "../database";
import * as crypto from "crypto";
import type { UserManager, LoginData, RegisterData, Encrypter, UIDRandomizer, LoginResult, RegisterResult, LogoutResult } from "../interfaces/auth";

const UIDRand: UIDRandomizer = {
    generate_unique_id(): string {
        return crypto.randomUUID();
    }
};
// encrypts the password
const Encrypter512: Encrypter = {
    hash(password: string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    }

}
export type ParseLoginResult =
    | { error: { code: number; data: any }; isError: true }
    | {
        isError: false; success: LoginData
    };


export type ParseRegisterResult =
    | { error: { code: number; data: any }; isError: true }
    | {
        isError: false; success: RegisterData
    };
// function handles the formdata and checks wether the username and password has been input
export function parse_login_data_form(formData: FormData): ParseLoginResult {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (username == undefined) {
        return { isError: true, error: { code: 400, data: { username: "username missing" } } };
    }
    if (password == undefined) {
        return { isError: true, error: { code: 400, data: { password: "password missing" } } };
    }
    return { isError: false, success: { username, password } };
}
// function handles the formdata and checks wether the username and password has been input
export function parse_register_data_form(formData: FormData): ParseRegisterResult {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (username == undefined) {
        return { isError: true, error: { code: 400, data: { username: "username missing" } } };
    }
    if (password == undefined) {
        return { isError: true, error: { code: 400, data: { password: "password missing" } } };
    }
    return { isError: false, success: { username, password } };
}

export class SQLiteAuth implements UserManager {
    async logout(sessiontoken: string): Promise<LogoutResult> {
        try {
            const result = await database.user.findFirst({ where: { session: sessiontoken } })
            if (result == undefined) {
                return {
                    isError: true, error: {
                        code: 400,
                        data: { user: "non-existent session" },
                    },
                };
            }
            const update = await database.user.update({
                where: { id: result.id },
                data: {
                    session: "",
                },
            });

            return { isError: false, success: true };
        } catch (error) {
            console.log(error);
            return {
                isError: true, error: {
                    code: 400,
                    data: { server: "database connection error" },
                },
            };
        }
    }

    async login(logindata: LoginData): Promise<LoginResult> {
        try {
            const result = await database.user.findFirst({
                where: { username: logindata.username },
            });

            console.log(result);

            if (!result) {
                return {
                    isError: true, error: {
                        code: 400,
                        data: { user: "wrong credentials" },
                    },
                };
            }

            const { salt, hash } = result;

            const newhash = Encrypter512.hash(logindata.password, salt);

            if (newhash != hash) {
                return {
                    isError: true, error: {
                        code: 400,
                        data: { user: "wrong credentials" },
                    },
                };
            }

            const session = UIDRand.generate_unique_id();

            const update = await database.user.update({
                where: { id: result.id },
                data: {
                    session,
                },
            });

            return { isError: false, success: { session: update.session } };
        } catch (error) {
            console.log(error);
            return {
                isError: true, error: {
                    code: 400,
                    data: { server: "database connection error" },
                },
            };
        }
    }
    async register(registerdata: RegisterData): Promise<RegisterResult> {
        try {
            const result = await database.user.findFirst({
                where: { username: registerdata.username },
            });

            console.log(result);

            if (result) {
                return {
                    isError: true, error: {
                        code: 400,
                        data: { user: "user already exists" },
                    },
                };
            }

            const session = UIDRand.generate_unique_id();
            const salt = crypto.randomBytes(16).toString('hex');
            // Should be saved in the database along with the hash

            // Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
            const hash = crypto.pbkdf2Sync(registerdata.password, salt, 1000, 64, 'sha512').toString('hex');

            const create = await database.user.create({
                data: {
                    session, username: registerdata.username, hash, salt,
                },
            });

            return { isError: false, success: { session: create.session } };
        } catch (error) {
            console.log(error);
            return {
                isError: true, error: {
                    code: 400,
                    data: { server: "database connection error" },
                },
            };
        }
    }
}