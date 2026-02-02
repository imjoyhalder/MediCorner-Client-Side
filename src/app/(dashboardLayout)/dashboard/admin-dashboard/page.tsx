import AdminOverview from "@/components/modules/admin-dashboard/adminOverview";

export default async function AdminDashboardPage() {
    return (
        <div>
            <AdminOverview/>
            <h1 className="text-2xl font-semibold mb-2">
                Admin Dashboard
            </h1>

            <p className="text-muted-foreground mb-6">
                Overview of platform activity
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-background p-4 shadow">
                    <h3>Total Orders</h3>
                    <p className="text-2xl font-bold">1,245</p>
                </div>
            </div>
        </div>
    );
}
