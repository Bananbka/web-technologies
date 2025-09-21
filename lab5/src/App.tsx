import './App.css'
import {mockUsers} from "./components/userMockData.ts";
import {UsersTable} from "./components/dataTable.tsx";

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-100 py-10 px-6">

            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                Users Dashboard
            </h1>
            <UsersTable users={mockUsers}/>
        </div>
    )
}

export default App
