import { motion } from "framer-motion"
import Input from "../Input";
import { Eye, EyeClosed, Loader, Lock, Mail, RefreshCcw, User } from "lucide-react"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export default function SignupForm() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [uid, setUid] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowpassword] = useState(false)

    //for interacting with query cache
    const queryClient = useQueryClient()

    //mutation to handle signup
    const { mutate: signupMutation, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post("/auth/signup", {
                fullname,
                email,
                uid,
                password
            })
            return res.data
        },
        onSuccess: () => {
            toast.success("Account created successfully!")
            //re-fetch the data
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        },
        onError: (err: any) => {
            toast.error(err.response.data.message || "Error creating account!")
        }
    })

    function handleSignup(e: any) {
        e.preventDefault()
        signupMutation()
    }

    //mutation to get the uid of the provider
    const { mutate: getProviderUid} = useMutation({
        mutationFn: async () => {
            try {
                const res = await signInWithPopup(auth, provider)
                setUid(res.user.uid)
                setEmail(res.user.email ?? "")
            }
            catch (err) {
                throw err   //onError is triggered
            }
        },
        onError: () => {
            toast.error("Can't get Uid")
            setUid("")
            setEmail("")
        }
    })

    return <form onSubmit={handleSignup}>
        <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
        />


        {!uid ? (
            <button className="cursor-pointer text-gray-700
                    bg-gray-200 hover:bg-gray-300 
                    border-blue-300 focus:border-blue-200 focus:ring-3 focus:ring-blue-200
                    font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 w-full border "
                type="button"
                onClick={() => {
                    getProviderUid()
                }} disabled={isPending}>
                {
                    isPending ? <Loader className="animate-spin w-5 h-5 mx-auto" /> : (
                        <div className="flex justify-center">
                            <img src="/google.png" alt="google_img" className="w-5 h-5 mr-2" />
                            <span>Click to add Email</span>
                        </div>
                    )
                }
            </button>
        ) : (
            <div className="relative">
                <Input
                    icon={Mail}
                    type="text"
                    placeholder={email}
                    readOnly={true}
                />
                <button onClick={() => setUid("")} className="absolute top-2.5 right-3 text-gray-6-- cursor-pointer hover:text-gray-500">
                    <RefreshCcw size={20} />
                </button>
            </div>
        )}

        <div className="relative w-full mt-4">
            <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password (atleast 6 characters long)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button"
                className="absolute top-2.5 right-3 text-gray-6-- cursor-pointer hover:text-gray-500"
                onClick={() => setShowpassword((prev) => !prev)}>
                {showPassword ? <EyeClosed /> : <Eye />}
            </button>
        </div>
        <motion.button
            className='mt-4 w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-yellow-600
            hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                 transition duration-200 cursor-pointer'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isPending}
        >
            {isPending ? <Loader className="animate-spin m-auto" /> : "Agree & Join"}
        </motion.button>

    </form>
}