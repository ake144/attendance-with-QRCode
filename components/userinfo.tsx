"use client";

import { UserInfo } from "@/types/type";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useUser } from "@clerk/nextjs";

interface UserFormProps {
    handleFormUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ handleFormUpdate }) => {
    const { user } = useUser();

    // Initialize memberInfo with default values or empty strings to avoid null values.
    const [memberInfo, setMemberInfo] = useState<UserInfo>({
        name: user?.fullName || "",
        email: user?.emailAddresses[0]?.emailAddress || "",
        phone: "",
        qrCode: "",
    });

    // Unified change handler for inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setMemberInfo((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <form className="space-y-4" onSubmit={handleFormUpdate}>
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    value={memberInfo.name || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={memberInfo.email || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    value={memberInfo.phone || ""}
                    onChange={handleChange}
                />
            </div>
            <Button type="submit">Update</Button>
        </form>
    );
};

export default UserForm;
