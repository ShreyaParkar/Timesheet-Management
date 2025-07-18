"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { Clock, LogOut, User } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          
            <Clock className="text-blue-500 w-8 h-8" />
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Chronofy	
          </h1>
        </div>

        {/* Right Side: User Info / Auth */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-blue-500/20">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                    {session.user.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
              </div>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white border-none"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm">Not logged in</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
