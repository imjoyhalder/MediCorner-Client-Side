"use client"

import React, { useState, useTransition, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IconEdit, IconLoader2, IconMedicineSyrup, IconPackage, IconTag } from "@tabler/icons-react"
import { updateMedicine } from "@/services/seller.service"
import { SellerMedicine, UpdateMedicinePayload } from "@/types/seller"

interface UpdateProps {
    medicine: SellerMedicine;
}

export function UpdateMedicineSheet({ medicine }: UpdateProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState<UpdateMedicinePayload>({
        name: medicine.medicineName,
        brandName: medicine.brandName,
        genericName: medicine.genericName || "",
        manufacturer: medicine.manufacturer || "",
        description: medicine.description || "",
        price: medicine.price,
        stockQuantity: medicine.stockQuantity,
        batchNumber: medicine.batchNumber,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(async () => {
            try {
                // Backend calls
                const res = await updateMedicine(medicine.medicineId, formData)

                if (res.success) {
                    toast.success("Inventory updated successfully")
                    setOpen(false)
                    router.refresh()
                } else {
                    toast.error(res.message || "Something went wrong")
                }
            } catch (error) {
                toast.error("Failed to connect to the server")
            }
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                    <IconEdit className="size-4" />
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-[500px] overflow-y-auto p-0 border-l">
                <div className="p-6 h-full flex flex-col">
                    <SheetHeader className="mb-6">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <IconMedicineSyrup className="size-5" />
                            <span className="text-xs font-bold uppercase tracking-wider">Editor Mode</span>
                        </div>
                        <SheetTitle className="text-2xl font-bold">Update Medicine</SheetTitle>
                        <SheetDescription>
                            Make changes to medicine details and inventory levels here.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                        {/* Section: Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Medicine Name</Label>
                                <Input id="name" name="name" placeholder="Napa Extend" value={formData.name} onChange={handleChange} required className="focus-visible:ring-blue-500" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brandName" className="text-sm font-medium text-muted-foreground">Brand Name</Label>
                                    <Input id="brandName" name="brandName" value={formData.brandName} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="genericName" className="text-sm font-medium text-muted-foreground">Generic Name</Label>
                                    <Input id="genericName" name="genericName" value={formData.genericName ?? ""} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <hr className="border-dashed" />

                        {/* Section: Inventory & Pricing */}
                        <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                            <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <IconPackage className="size-4" /> Inventory Details
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-xs uppercase font-bold text-slate-500">Price (৳)</Label>
                                    <div className="relative">
                                        <Input id="price" name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required className="pl-7" />
                                        <span className="absolute left-2.5 top-2 text-slate-400 text-sm">৳</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stockQuantity" className="text-xs uppercase font-bold text-slate-500">Available Stock</Label>
                                    <Input id="stockQuantity" name="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="batchNumber" className="text-xs uppercase font-bold text-slate-500 flex items-center gap-1">
                                    <IconTag className="size-3" /> Batch Number
                                </Label>
                                <Input id="batchNumber" name="batchNumber" value={formData.batchNumber} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="manufacturer">Manufacturer</Label>
                            <Input id="manufacturer" name="manufacturer" value={formData.manufacturer ?? ""} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea id="description" name="description" rows={4} value={formData.description ?? ""} onChange={handleChange} className="resize-none" />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-[2] bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                                {isPending ? (
                                    <><IconLoader2 className="mr-2 size-4 animate-spin" /> Saving...</>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}