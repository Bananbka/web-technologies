import {TableRow} from "./TableRow.tsx";
import {useUsers} from "./context/UsersContext.tsx";


export function Table() {
    const {users} = useUsers();

    return <table className="w-full text-left border-collapse">
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
            <TableRow user={user}/>
        ))}
        </tbody>
    </table>
}