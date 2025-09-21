import {UserCard, type UserData} from "./user-card.tsx";
import {useState} from "react";

type UsersTableProps = {
    users: UserData[];
};


export function UsersTable({users}: UsersTableProps) {

    const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");
    const filteredUsers = genderFilter === "all"
        ? users
        : users.filter(user => user.gender === genderFilter);

    console.log(filteredUsers);

    return (
        <div className="flex flex-col gap-5 sm:px-6 md:px-16 lg:px-32">
            <div className={"flex px-10 py-7 w-full h-24 gap-4 bg-gray-100/50 rounded-md shadow-lg"}>
                <button
                    onClick={() => setGenderFilter("all")}
                    className="
                        px-4 py-2 rounded transition-colors duration-300
                        bg-gray-300 text-gray-800
                        hover:bg-gradient-to-bl hover:from-gray-400 hover:to-gray-500 hover:text-white
                        active:scale-95 hover:scale-105
                    "
                >
                    All
                </button>
                <button
                    onClick={() => setGenderFilter("male")}
                    className="
                        px-4 py-2 rounded transition-colors duration-300
                        bg-blue-300 text-gray-800
                        hover:bg-gradient-to-bl hover:from-blue-400 hover:to-blue-500 hover:text-white
                        active:scale-95 hover:scale-105
                    "
                >
                    Male
                </button>
                <button
                    onClick={() => setGenderFilter("female")}
                    className="
                        px-4 py-2 rounded transition-colors duration-300
                        bg-pink-300 text-gray-800
                        hover:bg-gradient-to-bl hover:from-pink-400 hover:to-pink-500 hover:text-white
                        active:scale-95 hover:scale-105
                    "
                >
                    Female
                </button>

            </div>
            {filteredUsers.length === 0 ?
                (
                    <h2 className="text-black text-3xl mx-auto text-center">User list is empty </h2>
                ) :
                (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredUsers.map(user => (
                            <UserCard key={user.id} user={user}/>))}
                    </div>
                )
            }
        </div>

    );
}