import { UsersTable } from "@/components/modules/admin-dashboard/UsersTable";
import { getAllUserForAdmin } from "@/services/admin.service";


export default async function AdminUsersPage() {
    const res = await getAllUserForAdmin();
    // console.log(res);
    if (res.error || !res.data) {
        return <div className="p-10 text-center text-red-500 font-bold">{res.error || "Failed to load users"}</div>;
    }

    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-slate-900 ">User Management</h1>
                <h1 className="text-slate-500 font-medium">Manage and monitor customer and seller accounts</h1>
            </div>

            <UsersTable initialUsers={res.data} />
        </div>
    );
}