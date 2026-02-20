// "use client"

// import React, { useState, useEffect, useTransition } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { IconPlus, IconLoader2, IconMedicineSyrup, IconLayoutGrid, IconPackageExport } from "@tabler/icons-react"
// import { addMedicine } from "@/services/seller.service"
// import { getAllCategories } from "@/services/category.service"
// import { Category } from "@/types/category"
// import { CreateMedicinePayload } from "@/types/medicine"


// export function AddMedicineSheet() {
//     const router = useRouter()
//     const [isPending, startTransition] = useTransition()
//     const [open, setOpen] = useState(false)
//     const [categories, setCategories] = useState<Category[]>([])

//     const [formData, setFormData] = useState<CreateMedicinePayload>({
//         name: "",
//         brandName: "",
//         genericName: "",
//         manufacturer: "",
//         description: "",
//         categoryId: "",
//         price: 0,
//         stockQuantity: 0,
//         batchNumber: "",
//     })

//     // API theke categories fetch kora
//     useEffect(() => {
//         if (open) { // Shudhu sheet open hole fetch korbe optimization er jonno
//             const fetchCats = async () => {
//                 const { data, error } = await getAllCategories()
//                 if (data) setCategories(data)
//                 if (error) toast.error(error)
//             }
//             fetchCats()
//         }
//     }, [open])

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value, type } = e.target
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
//         }))
//     }

//     const handleCategoryChange = (value: string) => {
//         setFormData((prev) => ({ ...prev, categoryId: value }))
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()

//         if (!formData.categoryId) {
//             return toast.error("Please select a medicine category")
//         }

//         startTransition(async () => {
//             try {
//                 const res = await addMedicine(formData)
//                 if (res.success) {
//                     toast.success("Medicine added successfully")
//                     setOpen(false)
//                     router.refresh()
                 
//                     setFormData({
//                         name: "", brandName: "", genericName: "", manufacturer: "",
//                         description: "", categoryId: "", price: 0, stockQuantity: 0, batchNumber: ""
//                     })
//                 } else {
//                     toast.error(res.message || "Failed to add medicine")
//                 }
//             } catch (error) {
//                 toast.error("Internal server error")
//             }
//         })
//     }

//     return (
//         <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//                 <Button className="bg-primary hover:bg-primary/90 shadow-md gap-2 h-9 px-4">
//                     <IconPlus className="size-4" /> Add New Medicine
//                 </Button>
//             </SheetTrigger>

//             <SheetContent className="w-full sm:max-w-[500px] overflow-y-auto p-0 border-l">
//                 <div className="flex flex-col h-full">
//                     <SheetHeader className="p-6 border-b bg-muted/20">
//                         <div className="flex items-center gap-3 text-primary mb-1">
//                             <IconMedicineSyrup className="size-6" />
//                             <span className="text-xs font-bold uppercase tracking-widest">Inventory System</span>
//                         </div>
//                         <SheetTitle className="text-2xl font-bold">Add Medicine</SheetTitle>
//                         <SheetDescription>
//                             Enter medicine details to list it in your pharmacy inventory.
//                         </SheetDescription>
//                     </SheetHeader>

//                     <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6 pb-24">
//                         {/* Primary Info */}
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="name">Medicine Name</Label>
//                                 <Input id="name" name="name" placeholder="e.g. Napa Extend" onChange={handleChange} required />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="brandName">Brand</Label>
//                                     <Input id="brandName" name="brandName" placeholder="Beximco" onChange={handleChange} required />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="categoryId" className="flex items-center gap-1">
//                                         <IconLayoutGrid className="size-3" /> Category
//                                     </Label>
//                                     <Select onValueChange={handleCategoryChange} required>
//                                         <SelectTrigger className="focus:ring-primary">
//                                             <SelectValue placeholder="Select" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {categories.map((cat) => (
//                                                 <SelectItem key={cat.id} value={cat.id}>
//                                                     {cat.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Inventory Box */}
//                         <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-4">
//                             <h4 className="text-xs font-bold uppercase text-primary/70 flex items-center gap-2">
//                                 <IconPackageExport className="size-4" /> Stock & Pricing
//                             </h4>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="price">Price (৳)</Label>
//                                     <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" onChange={handleChange} required className="bg-background" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="stockQuantity">Stock Qty</Label>
//                                     <Input id="stockQuantity" name="stockQuantity" type="number" placeholder="0" onChange={handleChange} required className="bg-background" />
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="batchNumber">Batch Number</Label>
//                                 <Input id="batchNumber" name="batchNumber" placeholder="BN-XXXXX" onChange={handleChange} required className="bg-background" />
//                             </div>
//                         </div>

//                         {/* Secondary Info */}
//                         <div className="space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="genericName">Generic Name</Label>
//                                     <Input id="genericName" name="genericName" placeholder="Paracetamol" onChange={handleChange} />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="manufacturer">Manufacturer</Label>
//                                     <Input id="manufacturer" name="manufacturer" placeholder="Square Pharmaceuticals" onChange={handleChange} />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="description">Product Description</Label>
//                                 <Textarea id="description" name="description" placeholder="Dosage, instructions, etc." rows={3} onChange={handleChange} className="resize-none focus:ring-primary" />
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-background pb-2">
//                             <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" className="flex-[2]" disabled={isPending}>
//                                 {isPending ? (
//                                     <><IconLoader2 className="mr-2 size-4 animate-spin" /> Adding...</>
//                                 ) : (
//                                     "Add Medicine"
//                                 )}
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     )
// }


"use client"

import React, { useState, useEffect, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconPlus, IconLoader2, IconMedicineSyrup, IconLayoutGrid, IconPackageExport, IconPhotoPlus, IconX } from "@tabler/icons-react"
import { addMedicine } from "@/services/seller.service"
import { getAllCategories } from "@/services/category.service"
import { Category } from "@/types/category"
import { CreateMedicinePayload } from "@/types/medicine"

export function AddMedicineSheet() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    
    // Image states
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<CreateMedicinePayload>({
        name: "",
        brandName: "",
        genericName: "",
        manufacturer: "",
        description: "",
        categoryId: "",
        price: 0,
        stockQuantity: 0,
        batchNumber: "",
    })

    useEffect(() => {
        if (open) {
            const fetchCats = async () => {
                const { data, error } = await getAllCategories()
                if (data) setCategories(data)
                if (error) toast.error(error)
            }
            fetchCats()
        }
    }, [open])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
        }))
    }

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, categoryId: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!imageFile) {
            return toast.error("Please upload a medicine thumbnail image")
        }

        if (!formData.categoryId) {
            return toast.error("Please select a medicine category")
        }

        startTransition(async () => {
            try {
                
                const data = new FormData();
                data.append("thumbnail", imageFile);
                data.append("name", formData.name);
                data.append("brandName", formData.brandName);
                data.append("genericName", formData.genericName || "");
                data.append("manufacturer", formData.manufacturer || "");
                data.append("description", formData.description || "");
                data.append("categoryId", formData.categoryId);
                data.append("price", formData.price.toString());
                data.append("stockQuantity", formData.stockQuantity.toString());
                data.append("batchNumber", formData.batchNumber);

                const res = await addMedicine(data); 
                
                if (res.success) {
                    toast.success("Medicine added successfully")
                    setOpen(false)
                    router.refresh()
                    
                    // Reset all states
                    setImageFile(null);
                    setImagePreview(null);
                    setFormData({
                        name: "", brandName: "", genericName: "", manufacturer: "",
                        description: "", categoryId: "", price: 0, stockQuantity: 0, batchNumber: ""
                    })
                } else {
                    toast.error(res.message || "Failed to add medicine")
                }
            } catch (error) {
                toast.error("Internal server error")
            }
        })
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 shadow-md gap-2 h-9 px-4">
                    <IconPlus className="size-4" /> Add New Medicine
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-[500px] overflow-y-auto p-0 border-l">
                <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b bg-muted/20">
                        <div className="flex items-center gap-3 text-primary mb-1">
                            <IconMedicineSyrup className="size-6" />
                            <span className="text-xs font-bold uppercase tracking-widest">Inventory System</span>
                        </div>
                        <SheetTitle className="text-2xl font-bold">Add Medicine</SheetTitle>
                        <SheetDescription>
                            Enter medicine details to list it in your pharmacy inventory.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6 pb-24">
                        
                        {/* Image Upload Section - Professional & Responsive */}
                        <div className="space-y-2">
                            <Label>Medicine Thumbnail</Label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center overflow-hidden
                                    ${imagePreview ? 'h-40 border-primary' : 'h-32 border-muted-foreground/20 hover:border-primary/50 bg-muted/5 hover:bg-muted/10'}`}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs font-medium">Change Image</p>
                                        </div>
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon" 
                                            className="absolute top-2 right-2 size-6 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageFile(null);
                                                setImagePreview(null);
                                            }}
                                        >
                                            <IconX className="size-3" />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <IconPhotoPlus className="size-7 stroke-[1.5]" />
                                        <p className="text-xs font-medium">Click to upload medicine image</p>
                                        <p className="text-[10px] opacity-70">Supports: JPG, PNG, WEBP</p>
                                    </div>
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                        </div>

                        {/* Primary Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Medicine Name</Label>
                                <Input id="name" name="name" placeholder="e.g. Napa Extend" onChange={handleChange} required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brandName">Brand</Label>
                                    <Input id="brandName" name="brandName" placeholder="Beximco" onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="categoryId" className="flex items-center gap-1">
                                        <IconLayoutGrid className="size-3" /> Category
                                    </Label>
                                    <Select onValueChange={handleCategoryChange} required>
                                        <SelectTrigger className="focus:ring-primary">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Box */}
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-4">
                            <h4 className="text-xs font-bold uppercase text-primary/70 flex items-center gap-2">
                                <IconPackageExport className="size-4" /> Stock & Pricing
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (৳)</Label>
                                    <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" onChange={handleChange} required className="bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stockQuantity">Stock Qty</Label>
                                    <Input id="stockQuantity" name="stockQuantity" type="number" placeholder="0" onChange={handleChange} required className="bg-background" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="batchNumber">Batch Number</Label>
                                <Input id="batchNumber" name="batchNumber" placeholder="BN-XXXXX" onChange={handleChange} required className="bg-background" />
                            </div>
                        </div>

                        {/* Secondary Info */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="genericName">Generic Name</Label>
                                    <Input id="genericName" name="genericName" placeholder="Paracetamol" onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="manufacturer">Manufacturer</Label>
                                    <Input id="manufacturer" name="manufacturer" placeholder="Square Pharmaceuticals" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Product Description</Label>
                                <Textarea id="description" name="description" placeholder="Dosage, instructions, etc." rows={3} onChange={handleChange} className="resize-none focus:ring-primary" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-background pb-2">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-[2]" disabled={isPending}>
                                {isPending ? (
                                    <><IconLoader2 className="mr-2 size-4 animate-spin" /> Adding...</>
                                ) : (
                                    "Add Medicine"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    )
}