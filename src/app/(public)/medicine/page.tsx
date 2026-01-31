import { MedicineServices } from "@/services/medecine.service"
import { CategoryServices } from "@/services/category.service"
import { AllMedicineClient } from "@/components/modules/medicine/allMedicine"


export const revalidate = 10

export default async function Page() {
    const medicinesRes = await MedicineServices.getAllMedicine()
    const categoryRes = await CategoryServices.getAllCategories()

    return (
        <AllMedicineClient
            medicines={medicinesRes.data.data}
            categories={categoryRes.data}
        />
    )
}
