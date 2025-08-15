import { motion } from "framer-motion"
import Input from "../Input";
import { Eye, EyeClosed, Loader, Lock, Mail, User } from "lucide-react"
import { useState } from "react";

export default function SignupForm() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowpassword] = useState(false)

    const [isPending, setPending] = useState(false)

    function handleSignup(e: any) {
        setPending(true)

        function temp() {
            setTimeout(() => {
                setPending(false)
            }, 2000)
        }
        temp()
        e.preventDefault()
    }

    return <form onSubmit={handleSignup}>
        <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
        />
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