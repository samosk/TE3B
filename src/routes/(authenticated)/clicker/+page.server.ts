import { database } from "$lib/database";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = await database.user.findUnique({
        where: { session: locals.session },
    });
    const clicks = await database.clicker.findUnique({
        where: { userId: user?.id },
    });
    const users = await database.clicker.findMany({ where: { userId: user?.id } });

    // users.sort((a: any, b: any) => a - b)
    return { users: users.sort((a: any, b: any) => a - b), clicks: clicks?.clicks ?? 0 };

    return { clicks: clicks?.clicks ?? 0 };
};



export const actions: Actions = {
    click: async ({ locals, request }) => {
        const user = await database.user.findUnique({
            where: { session: locals.session },
        });

        if (!user) {
            return fail(404, { error: "user not found" });
        }
        const clicks = await database.clicker.upsert({
            where: { userId: user?.id },
            update: {
                clicks: {
                    increment: 1,
                },
            },
            create: {
                userId: user?.id,
                clicks: 1,
            },
        });
    },
    // leaderboard: async ({ locals }) => {

    //     const user = await database.user.findUnique({
    //         where: { session: locals.session },
    //     });
    //     const clicks = await database.clicker.findUnique({
    //         where: { userId: user?.id },
    //     });
    //     const users = await database.user.findMany({ where: { clicker: clicks } });
    //     // users.sort((a: any, b: any) => a - b)
    //     return { users: users.sort((a: any, b: any) => a - b) }
    // }
};