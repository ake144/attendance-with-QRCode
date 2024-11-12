'use client'

import { GetMembers } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/type";

const MembersPage = () => {
    const [members, setMembers] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const fetchedMembers = await GetMembers();
                setMembers(fetchedMembers);
            } catch (err) {
                console.error("Failed to fetch members:", err);
                setError("Could not load members. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return <p>Loading members...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Members Directory</h1>

            {members.length > 0 ? (
                <div className="space-y-6">
                    {members.map((member,index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                            <p className="text-sm"><strong>Email:</strong> {member.email}</p>
                            <p className="text-sm mb-2"><strong>Phone:</strong> {member.phone}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No members found.</p>
            )}

            <Link href="/" className="inline-block bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600">
                Back to Directory
            </Link>
        </div>
    );
};

export default MembersPage;
