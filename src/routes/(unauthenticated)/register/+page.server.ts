import { database } from "$lib/database";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import * as crypto from "crypto";
import type { RegisterData } from "$lib/interfaces/auth";
import { parse_register_data_form, auth } from "$lib/auth";

export const actions: Actions = {
    register: async ({ request, locals, cookies }) => {
        const form = await request.formData();

        // const username = form.get("username")?.toString();
        // const password = form.get("password")?.toString();
        const parse_register = parse_register_data_form(form)
        if (parse_register.isError) {
            return fail(parse_register.error.code, parse_register.error.data)
        }

        const herbaberb = await auth.register(parse_register.success)
        if (herbaberb.isError) {
            return fail(herbaberb.error.code, herbaberb.error.data)
        }

        // if (username && password) {
        // 	let users = await database.user.findUnique({ where: { username } });

        // 	if (!users) {
        // 		const session = crypto.randomUUID();

        // 		// Creating a unique salt for a particular user
        // 		const salt = crypto.randomBytes(16).toString('hex');
        // 		// Should be saved in the database along with the hash

        // 		// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
        // 		const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');


        // 		const user = await database.user.create({
        // 			data: { username, hash, salt, session },
        // 		});

        // 		cookies.set("session", user.session, {
        // 			path: "/",
        // 			httpOnly: true, // optional for now
        // 			sameSite: "strict", // optional for now
        // 			secure: process.env.NODE_ENV === "production", // optional for now
        // 			maxAge: 120, //
        // 		});
        // 		throw redirect(302, "/");
        // 	}
        // }
        // // TODO: Implement register
        // // Check if ustername already exist etc.

        // return {
        // 	error: "error my guy",
        // };
        throw redirect(302, "/");
    },
};
