import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constant/role";

export const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    const { data } = await userService.getSession();


    if (!data) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    const role = data?.user?.role;
    console.log(data);
    if (role === Roles.admin) {
        if (!pathname.startsWith("/dashboard/admin-dashboard")) {
            return NextResponse.redirect(
                new URL("/dashboard/admin-dashboard", request.url)
            );
        }
        return NextResponse.next();
    }


    if (role === Roles.seller) {
        if (!pathname.startsWith("/dashboard/seller-dashboard")) {
            return NextResponse.redirect(
                new URL("/dashboard/seller-dashboard", request.url)
            );
        }
        return NextResponse.next();
    }

    if (role === Roles.customer) {
        if (!pathname.startsWith("/dashboard/user-dashboard")) {
            return NextResponse.redirect(
                new URL("/dashboard/user-dashboard", request.url)
            );
        }
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
};
export const config = {
    matcher: [
        "/dashboard/:path*", 
    ],
};
