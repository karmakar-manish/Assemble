import { motion } from "framer-motion"
import Input from "../Input";
import { Eye, EyeClosed, Loader, Lock, Mail } from "lucide-react"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowpassword] = useState(false)

    const queryClient = useQueryClient()

    //mutation to call the login api
    const {mutate: loginMutation, isPending} = useMutation({
        mutationFn: async(userData: {email: string, password: string})=>{
            const res = await axiosInstance.post("/auth/login", userData)
            return res.data 
        },
        onSuccess: ()=>{
            //re-fetch the authenticated user's data
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        },
        onError: (err:any)=>{
            toast.error(err.response.data.message || "Error while login!")
        }
    })
    
    function handleLogin(e: any) {
        e.preventDefault()
        //call the login mutation
        loginMutation({email, password})
    }

    return <form onSubmit={handleLogin}>
        <Input
            icon={Mail}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-full mt-4">
            <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            {isPending ? <Loader className="animate-spin m-auto" /> : "Sign in"}
        </motion.button>

    </form>
}