export default function MessageSkeleton()
{
    //create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null)

    return (
        <div className="p-4 mb-15">
            {skeletonMessages.map((_,idx)=>(
                <div key={idx} className={`chat ${idx%2===0 ? "chat-start": "chat-end"}`}>
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full">
                            <div className="skeleton w-full h-full rounded-full"/>
                        </div>
                    </div>

                    <div className="chat-header mb-1">
                        <div className="skeleton h-4 w-16"/>
                    </div>

                    
                    <div className="chat-bubble p-0">
                        <div className="skeleton h-16 w-[200px]"/>
                    </div>
                </div>
            ))}
        </div>
    )
}