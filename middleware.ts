// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {
    // Optional: Custom logic
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/login", // Redirect unauthenticated users to login
    },
  }
)

// Define which paths should be protected
export const config = {
  matcher: [
    "/dashboard",
    "/timesheet/:path*", // Protect all dynamic week pages
    // Add more protected routes here
  ],
}
