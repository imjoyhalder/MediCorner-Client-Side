"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, Save, User } from "lucide-react";
import Image from "next/image";
import { UserProfile } from "@/types/customer";
import { updateProfile } from "@/services/cutomer.service";

export default function CustomerProfileForm({ profile }: { profile: UserProfile }) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
        };

        toast.promise(updateProfile(payload), {
            loading: 'Updating your profile...',
            success: (res) => {
                if (res.success) return "Profile updated successfully!";
                throw new Error(res.message);
            },
            error: (err) => err.message || "Update failed",
            finally: () => setLoading(false)
        });
    };

    return (
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm max-w-xl mx-auto mt-10">
            <div className="flex flex-col items-center mb-8">
                <div className="relative size-24 rounded-3xl bg-slate-50 border-4 border-white shadow-xl overflow-hidden mb-4">
                    {profile.image ? (
                        <Image src={profile.image} alt="Profile" fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-300"><User size={40} /></div>
                    )}
                </div>
                <h3 className="font-bold text-slate-800">{profile.email}</h3>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Full Name</label>
                    <Input name="name" defaultValue={profile.name} className="h-12 rounded-2xl border-slate-200 focus:ring-[#15a215]" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Phone Number</label>
                    <Input name="phone" defaultValue={profile.phone || ""} className="h-12 rounded-2xl border-slate-200 focus:ring-[#15a215]" placeholder="+8801..." />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#15a215] hover:bg-green-700 rounded-2xl font-bold shadow-lg shadow-green-100"
                >
                    {loading ? "Updating..." : "Save Profile Changes"}
                </Button>
            </div>
        </form>
    );
}