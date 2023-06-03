import type { UserManager } from "./interfaces/auth";
import { SQLiteAuth, parse_login_data_form as _parse_login_data_form, parse_register_data_form as _parse_register_data_form } from "./implementations/auth";
export { Encrypter512 } from "./implementations/auth";
export const auth: UserManager = new SQLiteAuth();
export const parse_login_data_form = _parse_login_data_form;
export const parse_register_data_form = _parse_register_data_form;