import './App.css'
import {useState} from "react";

interface User {
    id: number;
    name: string;
    dob: string;
    email: string;
    phone: string;
}

function App() {
    const [users, setUsers] = useState<User[]>([
        {id: 1, name: "Biba", dob: "01/10/1990", email: "one@email.com", phone: "+380989689898"},
        {id: 2, name: "Boba", dob: "02/05/1985", email: "two@email.com", phone: "+38097969797"},
        {id: 3, name: "Buba", dob: "15/08/1987", email: "three@email.com", phone: "+380969669696"}
    ]);

    const [winners, setWinners] = useState<User[]>([]);
    const [form, setForm] = useState({name: "", dob: "", email: "", phone: ""});
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const [winnerName, setWinnerName] = useState<string | null>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.dob || !form.email || !form.phone) {
            setModalMessage("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setModalMessage("Invalid email format");
            return;
        }

        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(form.phone)) {
            setModalMessage("Invalid phone number");
            return;
        }

        if (Date.parse(form.dob) > Date.now()) {
            setModalMessage("Date of Birth cannot be in the future");
            return;
        }

        const newUser: User = {
            id: users.length + winners.length + 1,
            name: form.name,
            dob: form.dob,
            email: form.email,
            phone: form.phone
        };

        setUsers([...users, newUser]);
        setForm({name: "", dob: "", email: "", phone: ""});
        setModalMessage("User successfully added!");
    };

    const pickWinner = () => {
        if (users.length === 0) {
            setModalMessage("No users left to pick from!");
            return;
        }

        let newWinners: User[] = [];
        let winner: User | null = null;
        let newUsers: User[] = [];
        if (winnerName != "") {
            newWinners = users.filter((user) => user.name === winnerName);
            if (newWinners.length === 0) {
                setModalMessage("No users matches this name!");
                return;
            }
            winner = newWinners[0];
            newUsers = users.filter((user) => user.id !== winner?.id);
            setWinnerName("");
        } else {
            const randomIndex = Math.floor(Math.random() * users.length);
            winner = users[randomIndex];
            newUsers = users.filter((_, index) => index !== randomIndex);

        }

        setWinners([...winners, winner]);
        setUsers(newUsers);
    };

    const deleteWinner = (winnerId: number) => {
        const winnerToDeleteList: User[] = winners.filter(w => w.id === winnerId);
        if (winnerToDeleteList.length === 0) {
            setModalMessage("No winner data to delete!");
            return;
        }
        const winnerToDelete: User = winnerToDeleteList[0];
        setUsers([...users, winnerToDelete]);
        setWinners(winners.filter(w => w.id !== winnerId));
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 w-screen">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-md flex flex-wrap items-center gap-2 p-4">
                <div className="flex flex-1 gap-2.5">
                    {winners.map((winner) => (
                        <div
                            key={winner.id}
                            className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium flex flex-row gap-2"
                        >
                            {winner.name}
                            <span
                                onClick={() => deleteWinner(winner.id)}
                                className={"hover:cursor-pointer"}
                            >
                                ✖
                            </span>
                        </div>
                    ))}
                    <input type="text" value={winnerName ?? ""} id={"winner-input"} onChange={(e) => setWinnerName(e.target.value)}
                           placeholder={"Winners"} className={"focus:ring-0 focus:outline-0 flex-1"}/>
                </div>

                <button
                    onClick={pickWinner}
                    disabled={winners.length >= 3 || users.length < 2}
                    className={`ml-auto px-4 py-2 rounded-md text-white ${
                        (winners.length >= 3 || users.length < 2) && winnerName?.trim() === ""
                            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                            : "bg-sky-500 hover:bg-sky-600"
                    }`}
                >
                    New winner
                </button>
            </div>

            <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-6 mt-6">
                <h2 className="text-lg font-bold text-gray-800">REGISTER FORM</h2>
                <p className="text-sm text-gray-500 mb-6">Please fill in all the fields.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter user name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="self-start bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md font-medium"
                    >
                        Save
                    </button>
                </form>
            </div>

            <div className="w-full max-w-4xl bg-white shadow-md rounded-md mt-6 p-4">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b">
                    <tr className="text-gray-600">
                        <th className="py-2 px-3">#</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Date of Birth</th>
                        <th className="py-2 px-3">Email</th>
                        <th className="py-2 px-3">Phone number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200">
                            <td className="py-2 px-3 text-blue-500">{user.id}</td>
                            <td className="py-2 px-3">{user.name}</td>
                            <td className="py-2 px-3">{user.dob}</td>
                            <td className="py-2 px-3">{user.email}</td>
                            <td className="py-2 px-3">{user.phone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {modalMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center">
                        <p className="text-gray-800 mb-4">{modalMessage}</p>
                        <button
                            onClick={() => setModalMessage(null)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
