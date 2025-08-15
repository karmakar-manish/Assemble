import { Users } from "lucide-react"

export default function SidebarComponent() {

    //create 8 skeleton items
    const skeletonContacts = Array(8).fill(null)

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header  */}
            <div className="border-b border-slate-400 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            {/* Skeleton Contacts  */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="p-3 flex items-center gap-2">
                        {/* Avatar skeleton  */}
                        <div className="relative mx-auto">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        {/* User info skeleton - only visible in large screens */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>

                ))}

            </div>


        </aside >
    )
}
