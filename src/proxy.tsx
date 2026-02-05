
import { Roles } from "@/constant/role";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { data } = await userService.getSession();
    const user = data?.user;

    if (!user && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (user && authRoutes.includes(pathname)) {
        if (user.role === Roles.admin) return NextResponse.redirect(new URL("/dashboard/admin-dashboard", request.url));
        if (user.role === Roles.seller) return NextResponse.redirect(new URL("/dashboard/seller-dashboard", request.url));
        if (user.role === Roles.customer) return NextResponse.redirect(new URL("/dashboard/customer-dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard")) {
        const role = user?.role;

        // Admin Protection
        if (role === Roles.admin && !pathname.startsWith("/dashboard/admin-dashboard")) {
            return NextResponse.redirect(new URL("/dashboard/admin-dashboard", request.url));
        }

        // Seller Protection
        if (role === Roles.seller && !pathname.startsWith("/dashboard/seller-dashboard")) {
            return NextResponse.redirect(new URL("/dashboard/seller-dashboard", request.url));
        }

        // Customer Protection
        if (role === Roles.customer && !pathname.startsWith("/dashboard/customer-dashboard")) {
            return NextResponse.redirect(new URL("/dashboard/customer-dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*", 
        "/login", 
        "/register"
    ],
};