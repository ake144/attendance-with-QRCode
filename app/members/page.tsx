'use client'

import { apiClient } from "@/lib/api-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const MembersPage = () => {
    const [members, setMembers] = useState<UserInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const fetchedMembers = await apiClient.getUsers();
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading members...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        className="mt-4"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Members Directory</h1>
                    <p className="text-gray-600">Connect with our church community</p>
                </div>

                {members.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                            <Card key={member.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <Avatar className="w-20 h-20">
                                            <AvatarImage src={member.profilePic || undefined} />
                                            <AvatarFallback className="text-2xl">
                                                {member.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <CardTitle className="text-xl">{member.name}</CardTitle>
                                    <CardDescription>
                                        {member.role === 'ADMIN' ? 'Church Administrator' : 'Church Member'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {member.email && !member.email.includes('@placeholder.com') && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-700">{member.email}</span>
                                        </div>
                                    )}
                                    {member.phone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-700">{member.phone}</span>
                                        </div>
                                    )}
                                    {member.address && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-700">{member.address}</span>
                                        </div>
                                    )}
                                    {member.occupation && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Briefcase className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-700">{member.occupation}</span>
                                        </div>
                                    )}
                                    {member.age && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-700">{member.age} years old</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                            <p className="text-gray-600">Be the first to join our community!</p>
                        </CardContent>
                    </Card>
                )}

                <div className="text-center mt-8">
                    <Link href="/">
                        <Button variant="outline">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MembersPage;
