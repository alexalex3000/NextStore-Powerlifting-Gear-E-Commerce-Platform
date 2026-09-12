import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("session_token")?.value;

    if(!token){
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/shop/profile/:path*'
    ]
}