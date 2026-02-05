import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserProfile } from "@/types/customer";
import CustomerProfileForm from "@/components/modules/customer-dashboard/profile-form";
import { getSingleCustomer } from "@/services/cutomer.service";



export default async function ProfilePage() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    });

    const userData = await getSingleCustomer()

    if (!session?.data?.user) {
        redirect("/login");
    }

    const user = session.data.user;

    const profileData: UserProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image ?? undefined, 
        phone: userData?.data?.phone || null, 
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="mb-8 pl-4 md:pl-0">
                <h1 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">
                    Account Settings
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Update your profile and contact information
                </p>
            </div>

            <div className="px-4 md:px-0">
                <CustomerProfileForm profile={profileData} />
            </div>
        </div>
    );
}