import LoginForm from "./_components/LoginForm"
import { Clock } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Section */}
      <div className="md:w-1/2 p-12 flex flex-col justify-center items-center space-y-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="flex items-center gap-4">
          <Clock className="text-blue-500 w-10 h-10" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Chronofy
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-white text-center">
          Master Your Time, Maximize Your Impact
        </h2>

        <p className="text-gray-400 text-lg text-center max-w-md">
          Transform your productivity with intelligent time tracking, comprehensive reporting,
          and seamless workflow management.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 p-12 flex items-center justify-center bg-[#0B0B0B]">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
          <p className="text-md text-gray-400 text-center">
            Sign in to access your timesheet dashboard
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
