import { Roles } from "@/constant/role";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";


export const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    const { data } = await userService.getSession();

    console.log(data);

    if (!data) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    const role = data?.user?.role;
    // console.log(data);
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
        if (!pathname.startsWith("/dashboard/customer-dashboard")) {
            return NextResponse.redirect(
                new URL("/dashboard/customer-dashboard", request.url)
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


// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./src/services/user.service";
// import { Roles } from "./src/constant/role";

// export const proxy = async (request: NextRequest) => {
//     const pathname = request.nextUrl.pathname;
//     const { data } = await userService.getSession();


//     if (data && (pathname === "/login" || pathname === "/register")) {
//         const role = data?.user?.role;
//         if (role === Roles.admin) return NextResponse.redirect(new URL("/", request.url));
//         if (role === Roles.seller) return NextResponse.redirect(new URL("/", request.url));
//         if (role === Roles.customer) return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (!data) {
//         if (pathname === "/login" || pathname === "/register") return NextResponse.next();
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const role = data?.user?.role;

//     if (role === Roles.admin) {
//         if (!pathname.startsWith("/dashboard/admin-dashboard")) {
//             return NextResponse.redirect(
//                 new URL("/dashboard/admin-dashboard", request.url)
//             );
//         }
//         return NextResponse.next();
//     }

//     if (role === Roles.seller) {
//         if (!pathname.startsWith("/dashboard/seller-dashboard")) {
//             return NextResponse.redirect(
//                 new URL("/dashboard/seller-dashboard", request.url)
//             );
//         }
//         return NextResponse.next();
//     }

//     if (role === Roles.customer) {
//         if (!pathname.startsWith("/dashboard/customer-dashboard")) {
//             return NextResponse.redirect(
//                 new URL("/dashboard/customer-dashboard", request.url)
//             );
//         }
//         return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL("/login", request.url));
// };

// export const config = {
//     matcher: [
//         "/dashboard/:path*",
//         "/login",
//         "/register"
//     ],
// };