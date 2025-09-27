import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ModalProvider} from "./components/context/ModalContext.tsx";
import {UsersProvider} from "./components/context/UsersContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalProvider>
            <UsersProvider>
                <App/>
            </UsersProvider>
        </ModalProvider>
    </StrictMode>,
)
