// import { env } from "@/env"
// import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     baseURL: env.NEXT_PUBLIC_BACKEND_URL,
// })

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL: typeof window !== "undefined" ? window.location.origin : "",
    // fetchOptions: {
    //     credentials: "include",
    // },

    baseURL: process.env.BETTER_AUTH_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
    fetchOptions: {
        credentials: "include",
    },
});
