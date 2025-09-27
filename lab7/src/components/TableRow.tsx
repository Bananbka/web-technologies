import * as React from "react";
import type {User} from "./context/UsersContext";

type TableRowProps = { user: User };

export const TableRow: React.FC<TableRowProps> = ({ user }) => (
    <tr className="border-b border-gray-200">
        <td className="py-2 px-3 text-blue-500">{user.id}</td>
        <td className="py-2 px-3">{user.name}</td>
        <td className="py-2 px-3">{user.dob}</td>
        <td className="py-2 px-3">{user.email}</td>
        <td className="py-2 px-3">{user.phone}</td>
    </tr>
);