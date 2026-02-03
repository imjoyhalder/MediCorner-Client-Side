
import { CategoryTable } from "@/components/modules/admin-dashboard/category-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAllCategories } from "@/services/category.service";
import { AlertCircle } from "lucide-react";

export default async function CategoryPage() {

    const { data, error } = await getAllCategories();

    if (error) {
        return (
            <div className="p-6">
                <Alert variant="destructive" className="rounded-2xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Medicine Categories
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                    Manage and organize your medicine classifications efficiently.
                </p>
            </div>


            <CategoryTable initialCategories={data || []} />
        </div>
    );
}