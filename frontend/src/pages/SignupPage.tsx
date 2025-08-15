import { motion } from "framer-motion"
import SignupForm from "../components/auth/SignupForm"
import { Link } from "react-router-dom"
import { MessageSquare } from "lucide-react"
import AuthImagePattern from "../components/AuthImagePattern"


export default function SignupPage() {
    return <div className="min-h-fit pt-10 grid lg:grid-cols-2">
        {/* left side  */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/* LOGO  */}
                <div className="flex flex-col items-center gap-2 group">
                    <div className="size-12 rounded-xl flex items-center justify-center bg-[#e7e494] hover:bg-[#e8e34e] transition-colors">
                        <MessageSquare className="size-8 text-[#c86112f6]" />
                    </div>
                    <h1 className="text-2xl font-bold mt-2 text-[#F9FAFB]">Create Account</h1>
                    <p className="text-slate-200">Get started with your free account</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }}
                className=""
            >
                <div className="mt-2 sm:mx-auto sm:w-sm sm:max-w-xl">
                    <div className="py-8 px-4 rounded">
                        <SignupForm />
                    </div>
                </div>

                <div className="flex justify-center text-center">
                    <p className="text-sm text-slate-200">Already have an account? {" "}
                        <Link to={"/login"} className="text-yellow-500 underline cursor-pointer hover:text-yellow-600">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>

        <div className="hidden lg:inline ">
            {/* Right side  */}
            <AuthImagePattern 
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />

        </div>

    </div>
}