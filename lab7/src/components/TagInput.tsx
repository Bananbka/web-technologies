import {useUsers, type User} from "./context/UsersContext.tsx";
import {useState} from "react";
import {Tag} from "./Tag.tsx";
import {useModal} from "./context/ModalContext.tsx";
import {Button} from "./Button.tsx";

export function TagInput() {
    const {users, setUsers, winners, setWinners} = useUsers();
    const {openModal} = useModal();

    const [winnerName, setWinnerName] = useState<string | null>("");

    let newWinners: User[] = [];
    let winner: User | null = null;
    let newUsers: User[] = [];
    const pickWinner = () => {
        if (users.length === 0) {
            openModal("No users left to pick from!");
            return;
        }

        if (winnerName != "") {
            newWinners = users.filter((user) => user.name === winnerName);
            if (newWinners.length === 0) {
                openModal("No users matches this name!");
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
    }

    const deleteWinner = (winnerId: number) => {
        const winnerToDeleteList: User[] = winners.filter(w => w.id === winnerId);
        if (winnerToDeleteList.length === 0) {
            openModal("No winner data to delete!");
            return;
        }
        const winnerToDelete: User = winnerToDeleteList[0];
        setUsers([...users, winnerToDelete]);
        setWinners(winners.filter(w => w.id !== winnerId));
    }


    return <>
        <div className="flex flex-1 gap-2.5">
            {winners.map((winner) => (
                <Tag id={winner.id} text={winner.name} onDelete={() => deleteWinner(winner.id)}/>
            ))}
            <input type="text" value={winnerName ?? ""} id={"winner-input"}
                   onChange={(e) => setWinnerName(e.target.value)}
                   placeholder={"Winners"} className={"focus:ring-0 focus:outline-0 flex-1"}/>
        </div>

        <Button
            onClick={pickWinner}
            disabled={winners.length >= 3 || users.length < 2}
            className={`ml-auto ${
                winners.length >= 3 || users.length < 2
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    : "bg-sky-500 hover:bg-sky-600"
            }`}
        >
            New winner
        </Button>
    </>


}