export default function AuthImagePattern({ title, subtitle }: {
    title: string,
    subtitle: string
}) {
    return <div className="flex items-center justify-center pt-18 ">
        <div className="max-w-md text-center ">
            <div className="grid grid-cols-3 p-2 gap-2 mb-4">
                {
                    [...Array(9)].map((_, i) => (
                        <div key={i}
                            className={`size-29 aspect-square bg-[#c8c212f6] rounded-2xl ${i % 2 === 0 ? "animate-pulse" : ""
                                }`}
                        /> 
                    ))
                }
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB]">{title}</h2>
            <p className="text-slate-200 text-sm">{subtitle}</p>
        </div>
    </div>
}