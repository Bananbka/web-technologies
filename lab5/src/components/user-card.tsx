export type UserData = {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    position: string;
    photo: string;
    email: string;
    hobbies: string[];
}

type UserCardProps = {
    user: UserData
}

export function UserCard({ user }: UserCardProps) {
    const bgColor = user.gender === "female"
        ? (user.age < 18 ? "bg-pink-400" : "bg-pink-300")
        : (user.age < 18 ? "bg-blue-400" : "bg-blue-300");
    const textColor = "text-gray-900";

    return (
        <div
            className={`${bgColor} flex flex-col rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300`}
        >
            <div
                className="aspect-square bg-cover bg-center"
                style={{ backgroundImage: `url(${user.photo})` }}
            />
            <div className="p-4 flex flex-col gap-2">
                <h3 className={`text-xl font-semibold ${textColor}`}>
                    {user.firstName} {user.lastName}
                </h3>
                {user.age >= 18 && <p className={textColor}>Age: {user.age}</p>}
                <p className={textColor}>Gender: {user.gender}</p>
                <p className={textColor}>Position: {user.position}</p>
                <p className={`${textColor} break-words`}>Email: {user.email}</p>

                {user.hobbies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user.hobbies.map((hobby, index) => (
                            <span
                                key={index}
                                className={`${
                                    user.gender === "female"
                                        ? `bg-pink-100 text-pink-800`
                                        : "bg-blue-100 text-blue-800"
                                } text-xs px-2 py-1 rounded-full`}
                            >
                {hobby}
              </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}