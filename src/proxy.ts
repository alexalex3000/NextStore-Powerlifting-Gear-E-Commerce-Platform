import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("session_token")?.value;

    if(!token){
        NextResponse.redirect("/login");
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
}