import {Button} from "./Button.tsx";
import {FormInput} from "./FormInput.tsx";
import {useState} from "react";
import {useModal} from "./context/ModalContext";
import {useUsers} from "./context/UsersContext.tsx";
import * as React from "react";

export function RegistrationForm() {
    const {openModal} = useModal();

    const {users, winners, setUsers} = useUsers();

    const [form, setForm] = useState({name: "", dob: "", email: "", phone: ""});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.dob || !form.email || !form.phone) {
            openModal("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            openModal("Invalid email format");
            return;
        }

        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(form.phone)) {
            openModal("Invalid phone number");
            return;
        }

        if (Date.parse(form.dob) > Date.now()) {
            openModal("Date of Birth cannot be in the future");
            return;
        }

        const newUser = {
            id: users.length + winners.length + 1,
            name: form.name,
            dob: form.dob,
            email: form.email,
            phone: form.phone
        };

        setUsers([...users, newUser]);
        setForm({name: "", dob: "", email: "", phone: ""});
        openModal("User successfully added!");
    };


    return <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput name="name" type="text" placeholder="Enter user name" value={form.name}
                   onChange={handleChange}/>
        <FormInput name="dob" type="date" value={form.dob}
                   onChange={handleChange}/>
        <FormInput name="email" type="email" placeholder="Enter email" value={form.email}
                   onChange={handleChange}/>
        <FormInput name="phone" type="tel" placeholder="Enter phone number" value={form.phone}
                   onChange={handleChange}/>

        <Button type="submit">Save</Button>
    </form>
}