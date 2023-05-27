import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { database } from "$lib/database";
import type { LoginData } from "$lib/interfaces/auth";
import * as crypto from "crypto"
import { parse_login_data_form, auth } from "$lib/auth";

export const actions: Actions = {
    login: async ({ request, locals, cookies }) => {
        const form = await request.formData();

        const parse_result = parse_login_data_form(form)
        //if parse_result contains error, return fail
        //if error in parse_result exists, return fail
        if (parse_result.isError) {
            return fail(parse_result.error.code, parse_result.error.data)
        }

        const herbaberb = await auth.login(parse_result.success)
        if (herbaberb.isError) {
            return fail(herbaberb.error.code, herbaberb.error.data)
        }
        cookies.set("session", herbaberb.success.session, {
            path: "/",
            httpOnly: true, // optional for now
            sameSite: "strict", // optional for now
            secure: process.env.NODE_ENV === "production", // optional for now
            maxAge: 1200, //
        });
        throw redirect(302, "/");
    },
};
