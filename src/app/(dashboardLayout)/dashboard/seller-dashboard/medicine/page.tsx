import { AddMedicineSheet } from "@/components/modules/seller-dashboard/add-medicine";
import { DataTable } from "@/components/modules/seller-dashboard/medicine-table";
import { getSellerMedicines } from "@/services/seller.service";

export default async function MedicinePage() {
    const response = await getSellerMedicines();
    const medicines = response?.data || [];

    return (
        <div className="flex flex-col gap-6 py-6">
            {/* Inventory Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 lg:px-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Medicine Inventory</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your medicine stock, pricing, and details here.
                    </p>
                </div>

                {/* Custom Component containing the Trigger Button and Sheet */}
                <AddMedicineSheet />
            </div>

            {/* Table Section with Pagination */}
            <div className="px-0">
                <DataTable data={medicines} />
            </div>
        </div>
    );
}