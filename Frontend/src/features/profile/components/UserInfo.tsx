interface UserInfoProps{
    createdAt?: string,
    hoursTotal?: number,
    followers?: number,
    uploaded?: number
}

export default function UserInfo({createdAt, hoursTotal, followers, uploaded}: UserInfoProps){
    const formatedDate = new Date(createdAt ?? "").toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return(
        <div className="w-full h-full">
            <div className="flex flex-col p-5">
                <p>Joined: {formatedDate}</p>
                <p>{hoursTotal}</p>
                <p>{followers}</p>
                <p>{uploaded}</p>
            </div>
        </div>
    )
}