import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Loader, MessageSquare } from "lucide-react"
import AuthImagePattern from "../components/AuthImagePattern"
import LoginForm from "../components/auth/LoginForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase"
import { toast } from "react-toastify"


export default function LoginPage() {
    const queryClient = useQueryClient()

    //login api for google provider login
    const { mutate: providerLoginMutation, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await signInWithPopup(auth, provider)
                const uid = res.user.uid 
                const response = await axiosInstance.post("/auth/providerlogin", { uid })
                return response.data
            }
            catch (err) {
                throw err   //the OnError will catch this
            }
        },
        onSuccess: () => {
            //re-fetch authenticated user's data
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        },
        onError: (err: any) => {
            toast.error(err.response.data.message || "Something went wrong")
        }
    })

    //button for provider login
    async function handleProviderLogin(e: any) {
        e.preventDefault()
        providerLoginMutation() //call the mutation
    }



    return <div className="min-h-fit pt-10 grid lg:grid-cols-2">
        {/* left side  */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/* LOGO  */}
                <div className="flex flex-col items-center gap-2 group">
                    <div className="size-12 rounded-xl flex items-center justify-center bg-[#e7e494] hover:bg-[#e8e34e] transition-colors">
                        <MessageSquare className="size-8 text-[#c86112f6]" />
                    </div>
                    <h1 className="text-2xl font-bold mt-2 text-[#F9FAFB]">Welcome Back</h1>
                    <p className="text-slate-200">Sign in to your account</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }}
                className=""
            >
                <div className="mt-2 sm:mx-auto sm:w-sm sm:max-w-xl">
                    <div className="py-7 px-2 rounded">
                        <LoginForm />
                    </div>
                </div>

                <div className="mb-2">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative mb-1 flex justify-center text-sm">
                            <span className="px-2 bg-[#111827] text-gray-200">Or</span>
                        </div>
                    </div>
                </div>


                {/* Login with google provider  */}
                <button className="cursor-pointer text-gray-700
                    bg-gray-200 hover:bg-gray-300 
                    border-blue-300 focus:border-blue-200 focus:ring-3 focus:ring-blue-200
                    font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 w-full border "
                    onClick={handleProviderLogin} disabled={isPending}>
                    {
                        isPending ? <Loader className="animate-spin w-5 h-5 mx-auto" /> : (
                            <div className="flex justify-center">
                                <img src="/google.png" alt="google_img" className="w-5 h-5 mr-2" />
                                <span>Login with Google</span>
                            </div>
                        )
                    }
                </button>


                <div className="flex justify-center text-center">
                    <p className="text-sm text-slate-200">Don't have an account? {" "}
                        <Link to={"/signup"} className="text-yellow-500 underline cursor-pointer hover:text-yellow-600">Create account</Link>
                    </p>
                </div>
            </motion.div>
        </div>

        <div className="hidden lg:inline ">
            {/* Right side  */}
            <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue your conversations and catch up with your messages."
            />

        </div>

    </div>
}