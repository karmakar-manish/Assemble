import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    icon ?: React.ElementType
}

export default function Input({icon: Icon, ...props}: InputProps)
{
    return <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {Icon && <Icon className="size-5 text-base-content/40"/>}
        </div>

        <input {...props}
            className="w-full pl-10 pr-3 bg-white rounded-lg border p-2 border-blue-200 focus:border-blue-200 focus:ring-3 focus:ring-blue-200 placeholder-gray-400
            text-gray-900 text-sm"
        />
    </div> 
}