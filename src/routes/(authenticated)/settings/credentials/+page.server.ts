import { Encrypter512, parse_login_data_form } from "$lib/auth";
import { database } from "$lib/database";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    credentials: async ({ request, locals, cookies }) => {
        const form = await request.formData();
        // checks wether username and password exists in the submitted form
        const parse_result = parse_login_data_form(form);
        // if either the password or username does not exist, give error
        if (parse_result.isError) {
            return fail(parse_result.error.code, parse_result.error.data)
        }
        // check wether the username exists in the database
        const user = await database.user.findFirst({ where: { username: parse_result.success.username } })

        // if (!user) {
        //     return {
        //         isError: true, error: {
        //             code: 400,
        //             data: { user: "wrong credentials" },
        //         },
        //     };
        // }
        if (!user) {
            return { username: "Wrong credentials" }
        }

        // check wether the password from the form is the same as the existing one after being hashed
        const oldpassword = parse_result.success.password
        const oldhash = Encrypter512.hash(oldpassword, user.salt);

        // compare "oldhash" to "user.hash"
        if (oldhash != user.hash) {
            return {
                isError: true, error: {
                    code: 400,
                    data: { user: "wrong credentials" },
                },
            };
        }
        // change password and then hash the new password and update the saved "hash" to the new password after hashing
        const newpassword = form.get("newpassword")?.toString()
        if (newpassword == undefined) {
            return {
                isError: true, error: { code: 400, data: { user: "missing input" } }
            }
        }
        const newhash = Encrypter512.hash(newpassword, user.salt);
        await database.user.update({ where: { id: user.id }, data: { hash: newhash } })



        // const username = await database.user.findFirst({where: {username}})
        // const username = await database.user.findFirst({where:{username:}})
        // if (newusername == )


    }
}



// have a form that check wether the selected input upon submit is equal to the users current credentials, if correct give the user a form to change their credentials