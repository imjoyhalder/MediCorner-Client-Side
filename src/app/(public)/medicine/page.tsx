import { AllMedicinePage } from "@/components/modules/medicine/allMedicine"
import { MedicineServices } from "@/services/medecine.service"


export default async function Page() {
    const res = await MedicineServices.getAllMedicine()

    if (!res.data?.data) return null

    return <AllMedicinePage medicines={res.data.data} />
}