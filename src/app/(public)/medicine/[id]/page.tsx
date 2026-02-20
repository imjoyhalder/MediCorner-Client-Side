// 'use client';

// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Star, Pill, Building2, Calendar, ShoppingCart, MessageSquare, ShieldCheck, Loader2, ArrowLeft, User } from "lucide-react";
// import Image from "next/image";
// import { Medicine, Review } from "@/types/medicine";
// import { toast } from "sonner";
// import { addToCart } from "@/actions/cart.action";
// import { useRouter } from "next/navigation";
// import { postReview } from "@/services/review.service";
// import { getSingleMedicine } from "@/services/single-medicine.service";

// const DEFAULT_IMAGE = "/Kerfin7-NEA-2139.jpg";

// const MedicineDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
//     const router = useRouter();
//     const [medicine, setMedicine] = useState<Medicine | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [cartLoading, setCartLoading] = useState(false);

//     // Review States
//     const [rating, setRating] = useState(0);
//     const [hover, setHover] = useState(0);
//     const [comment, setComment] = useState("");
//     const [submittingReview, setSubmittingReview] = useState(false);


//     useEffect(() => {
//         const fetchMedicine = async () => {
//             const { id } = await params;
//             const response = await getSingleMedicine(id);
//             console.log(response);
//             if (response.success) {
//                 setMedicine(response.data);
//             }
//             setLoading(false);
//         };
//         fetchMedicine();
//     }, [params]);

//     const handleAddToCart = async () => {
//         if (!medicine || !medicine.sellers.length) return toast.error("No stock available");
//         setCartLoading(true);
//         const res = await addToCart(medicine.sellers[0].id, 1);
//         setCartLoading(false);
//         if (!res.success) return toast.warning("Please login to add to cart!");
//         toast.success(res.message);
//     };

//     const handleReviewSubmit = async () => {
//         // 1. Validation
//         if (rating === 0) return toast.error("Please select a star rating");
//         if (!comment.trim()) return toast.error("Please write a comment");

//         setSubmittingReview(true);

//         try {

//             if (medicine?.id) {
//                 const reviewData = {
//                     rating: rating,
//                     comment: comment,
//                     medicineId: medicine.id
//                 };
//                 const res = await postReview(reviewData);
//                 if (res.success) {
//                     toast.success(res.message || "Review submitted successfully!");
//                     // Reset form
//                     setComment("");
//                     setRating(0);

//                     router.refresh(); 
//                 } else {
//                     // Handle backend validation or auth errors
//                     toast.error(res.message || "Failed to post review");
//                 }
//             }

//         } catch (error) {
//             toast.error("Something went wrong. Please try again.");
//         } finally {
//             setSubmittingReview(false);
//         }
//     };
//     if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-green-500" /></div>;
//     if (!medicine) return <div className="text-center py-20"><Pill className="mx-auto h-12 w-12 text-slate-300" /><h2 className="text-xl font-medium mt-4">Medicine not found</h2><Button onClick={() => router.back()} className="mt-4">Back</Button></div>;

//     const seller = medicine.sellers?.[0];

//     return (
//         <div className="min-h-screen bg-slate-50/50 pb-20 pt-6">
//             <div className="max-w-6xl mx-auto px-4 lg:px-8">

//                 {/* Header */}
//                 <div className="mb-6 flex items-center justify-between">
//                     <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-white transition-colors">
//                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
//                     </Button>
//                     <div className="flex gap-2">
//                         <Badge variant="outline" className="bg-white">{medicine.category.name}</Badge>
//                         {medicine.isOtc && <Badge className="bg-blue-600">OTC</Badge>}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                     {/* Left Column */}
//                     <div className="lg:col-span-8 space-y-8">
//                         <Card className="border-none shadow-sm overflow-hidden bg-white rounded-3xl">
//                             <div className="grid md:grid-cols-2">
//                                 <div className="relative aspect-square bg-slate-50 flex items-center justify-center border-r border-slate-50">
//                                     <Image src={medicine.thumbnail || DEFAULT_IMAGE} alt={medicine.name} fill className="object-contain p-10" />
//                                 </div>
//                                 <div className="p-8 flex flex-col justify-center">
//                                     <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{medicine.name}</h1>
//                                     <p className="text-lg font-medium text-green-600 mb-6">{medicine.genericName}</p>
//                                     <div className="space-y-4 border-t pt-6">
//                                         <div className="flex items-center gap-3 text-slate-600">
//                                             <div className="p-2 bg-slate-100 rounded-lg"><Building2 className="h-4 w-4" /></div>
//                                             <span className="text-sm font-semibold">{medicine.manufacturer}</span>
//                                         </div>
//                                         <div className="flex items-center gap-3 text-slate-600">
//                                             <div className="p-2 bg-slate-100 rounded-lg"><ShieldCheck className="h-4 w-4" /></div>
//                                             <span className="text-sm font-semibold">100% Genuine Guarantee</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>

//                         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
//                             <h3 className="text-xl font-bold text-slate-900 mb-4">Product Description</h3>
//                             <p className="text-slate-600 leading-relaxed">{medicine.description || "Detailed data is being compiled for this product."}</p>
//                         </div>

//                         {/* REVIEWS SECTION */}
//                         <div className="space-y-6">
//                             <div className="flex items-center justify-between">
//                                 <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                                     <MessageSquare className="h-5 w-5 text-green-500" /> Customer Reviews
//                                 </h3>
//                                 <Badge variant="secondary">{medicine.reviews?.length || 0} Reviews</Badge>
//                             </div>

//                             {/* Post a Review Card */}
//                             <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
//                                 <CardContent className="p-8">
//                                     <h4 className="font-bold text-slate-800 mb-4">Write a Review</h4>
//                                     <div className="flex flex-col gap-4">
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-sm text-slate-500 mr-2">Rating:</span>
//                                             {[1, 2, 3, 4, 5].map((star) => (
//                                                 <button
//                                                     key={star}
//                                                     type="button"
//                                                     onClick={() => setRating(star)}
//                                                     onMouseEnter={() => setHover(star)}
//                                                     onMouseLeave={() => setHover(0)}
//                                                     className="focus:outline-none transition-transform active:scale-110"
//                                                 >
//                                                     <Star className={`h-6 w-6 ${(hover || rating) >= star ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <Textarea
//                                             placeholder="Tell us about your experience with this medicine..."
//                                             className="min-h-[120px] bg-slate-50 border-none focus-visible:ring-green-500 rounded-2xl p-4"
//                                             value={comment}
//                                             onChange={(e) => setComment(e.target.value)}
//                                         />
//                                         <Button
//                                             onClick={handleReviewSubmit}
//                                             disabled={submittingReview}
//                                             className="w-full sm:w-max px-8 bg-green-600 hover:bg-green-700 rounded-xl"
//                                         >
//                                             {submittingReview ? <Loader2 className="animate-spin h-4 w-4" /> : "Submit Review"}
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Review List */}
//                             <div className="grid gap-4">
//                                 {medicine.reviews?.length === 0 ? (
//                                     <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
//                                         <p className="text-slate-400">No reviews yet. Be the first to review!</p>
//                                     </div>
//                                 ) : (
//                                     medicine.reviews?.map((rev) => (
//                                         <Card key={rev.id} className="border-none shadow-sm bg-white rounded-2xl">
//                                             <CardContent className="p-6">
//                                                 <div className="flex items-start gap-4">
//                                                     <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
//                                                         <User className="h-5 w-5" />
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <div className="flex items-center justify-between mb-1">
//                                                             <h5 className="font-bold text-slate-900 text-sm">Verified Customer</h5>
//                                                             <span className="text-[10px] text-slate-400 uppercase tracking-wider">
//                                                                 {new Date(rev.createdAt).toLocaleDateString()}
//                                                             </span>
//                                                         </div>
//                                                         <div className="flex gap-0.5 mb-3">
//                                                             {[...Array(5)].map((_, i) => (
//                                                                 <Star key={i} className={`h-3 w-3 ${i < rev.rating! ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
//                                                             ))}
//                                                         </div>
//                                                         <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
//                                                     </div>
//                                                 </div>
//                                             </CardContent>
//                                         </Card>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column (Sidebar) */}
//                     <div className="lg:col-span-4">
//                         <div className="sticky top-6">
//                             {seller ? (
//                                 <Card className="border-none shadow-2xl shadow-green-900/10 rounded-3xl overflow-hidden bg-white">
//                                     <div className="bg-green-600 p-8 text-white">
//                                         <Badge className="bg-white/20 hover:bg-white/30 border-none mb-2">In Stock</Badge>
//                                         <div className="flex items-baseline gap-1">
//                                             <span className="text-5xl font-black">৳{seller.price}</span>
//                                             <span className="text-sm opacity-80">/ unit</span>
//                                         </div>
//                                     </div>
//                                     <CardContent className="p-8 space-y-6">
//                                         <div className="space-y-4">
//                                             <div className="flex justify-between items-center text-sm">
//                                                 <span className="text-slate-500 font-medium">Availability</span>
//                                                 <span className="font-bold text-slate-900">{seller.stockQuantity} Units Left</span>
//                                             </div>
//                                             <div className="flex justify-between items-center text-sm">
//                                                 <span className="text-slate-500 flex items-center gap-1"><Calendar className="h-4 w-4" /> Expiry Date</span>
//                                                 <span className="font-bold text-rose-600">{new Date(seller.expiryDate).toLocaleDateString()}</span>
//                                             </div>
//                                         </div>
//                                         <Button onClick={handleAddToCart} disabled={cartLoading} className="w-full h-16 text-lg font-bold bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg shadow-green-200 active:scale-[0.98] transition-all">
//                                             {cartLoading ? <Loader2 className="animate-spin h-6 w-6" /> : <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</>}
//                                         </Button>
//                                         <p className="text-[11px] text-center text-slate-400 leading-tight">
//                                             Secure checkout with local payment methods.
//                                         </p>
//                                     </CardContent>
//                                 </Card>
//                             ) : (
//                                 <Card className="bg-slate-100 border-dashed border-2 p-12 text-center rounded-3xl">
//                                     <Pill className="h-12 w-12 text-slate-300 mx-auto mb-4" />
//                                     <p className="text-slate-500 font-bold">Currently Out of Stock</p>
//                                 </Card>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MedicineDetailsPage;

'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Pill, Building2, Calendar, ShoppingCart, MessageSquare, ShieldCheck, Loader2, ArrowLeft, User, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Medicine } from "@/types/medicine";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";
import { useRouter } from "next/navigation";
import { postReview } from "@/services/review.service";
import { getSingleMedicine } from "@/services/single-medicine.service";

const DEFAULT_IMAGE = "/Kerfin7-NEA-2139.jpg";

const MedicineDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);



    // Review States
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchMedicine = async () => {
            const { id } = await params;
            const response = await getSingleMedicine(id);
            if (response.success) {
                setMedicine(response.data);
            }
            setLoading(false);
        };
        fetchMedicine();
    }, [params]);

    const handleAddToCart = async () => {
        if (!medicine || !medicine.sellers.length) return toast.error("No stock available");
        setCartLoading(true);
        const res = await addToCart(medicine.sellers[0].id, 1);
        setCartLoading(false);
        if (!res.success) return toast.warning("Please login to add to cart!");
        toast.success(res.message);
    };

    const handleReviewSubmit = async () => {
        if (rating === 0) return toast.error("Please select a star rating");
        if (!comment.trim()) return toast.error("Please write a comment");
        setSubmittingReview(true);
        try {
            if (medicine?.id) {
                const reviewData = { rating, comment, medicineId: medicine.id };
                const res = await postReview(reviewData);
                if (res.success) {
                    toast.success(res.message || "Review submitted successfully!");
                    setComment("");
                    setRating(0);
                    router.refresh();
                } else {
                    toast.error(res.message || "Failed to post review");
                }
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-emerald-600" /></div>;
    if (!medicine) return <div className="text-center py-20"><Pill className="mx-auto h-12 w-12 text-slate-300" /><h2 className="text-xl font-medium mt-4">Medicine not found</h2><Button onClick={() => router.back()} className="mt-4">Back</Button></div>;

    const seller = medicine.sellers?.[0];

    return (
        <div className="min-h-screen pb-20 pt-6">
            <div className="max-w-6xl mx-auto px-4">

                {/* Navigation & Badges */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-white border text-slate-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                    </Button>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="rounded-md px-3 py-1 font-medium">{medicine.category.name}</Badge>
                        {medicine.isOtc && <Badge className="bg-green-500 rounded-md">OTC Medicine</Badge>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Product Basic Info */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <div className="grid md:grid-cols-2">
                                <div className="relative aspect-square bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100">
                                    <Image src={medicine.thumbnail || DEFAULT_IMAGE} alt={medicine.name} fill className="object-contain p-6" priority />
                                </div>
                                <div className="p-6 lg:p-8 flex flex-col">
                                    <div className="mb-auto">
                                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">{medicine.name}</h1>
                                        <p className="text-emerald-600 font-semibold mb-4">{medicine.genericName}</p>

                                        <div className="flex flex-col gap-3 mb-6">
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <Building2 className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">Manufacturer: {medicine.manufacturer}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                                <span className="font-medium text-slate-700">Laboratory Tested & Verified</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Only: Add to Cart (Appears after Product Info) */}
                                    <div className="block lg:hidden mt-4 pt-6 border-t border-slate-100">
                                        <div className="flex items-end justify-between mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Price</p>
                                                <p className="text-3xl font-black text-slate-900">৳{seller?.price || 0}</p>
                                            </div>
                                            {seller && <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 mb-1">In Stock</Badge>}
                                        </div>
                                        <Button onClick={handleAddToCart} disabled={cartLoading} className="w-full h-12 bg-green-500 hover:bg-green-600 rounded-lg text-base font-bold">
                                            {cartLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</>}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Description */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl bg-white">
                            <div className="p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Product Details
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                                    {medicine.description || "Detailed medical information is being updated for this product. Please consult with a specialist for usage instructions."}
                                </p>
                            </div>
                        </Card>

                        {/* REVIEWS SECTION */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-emerald-600" /> Reviews ({medicine.reviews?.length || 0})
                                </h3>
                            </div>

                            {/* Submit Review */}
                            <Card className="border border-slate-200 shadow-sm rounded-xl bg-white">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-slate-700">Your Rating:</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHover(star)}
                                                        onMouseLeave={() => setHover(0)}
                                                        className="transition-colors"
                                                    >
                                                        <Star className={`h-6 w-6 ${(hover || rating) >= star ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <Textarea
                                            placeholder="Share your experience with this medicine..."
                                            className="min-h-[100px] border-slate-200 focus-visible:ring-emerald-500 rounded-lg"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleReviewSubmit}
                                            disabled={submittingReview}
                                            className="w-full sm:w-max px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
                                        >
                                            {submittingReview ? <Loader2 className="animate-spin h-4 w-4" /> : "Post Review"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Review List */}
                            <div className="grid gap-3 mt-6">
                                {medicine.reviews?.length === 0 ? (
                                    <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                                        <p className="text-slate-400 text-sm font-medium">No reviews yet. Be the first one!</p>
                                    </div>
                                ) : (
                                    medicine.reviews?.map((rev) => (
                                        <Card key={rev.id} className="border border-slate-100 shadow-sm bg-white rounded-xl">
                                            <CardContent className="p-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                        <User className="h-5 w-5 text-slate-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2 mb-1">
                                                            <p className="font-bold text-slate-900 text-sm truncate">User_{rev.id.slice(-4)}</p>
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter shrink-0">
                                                                {new Date(rev.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-0.5 mb-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`h-3 w-3 ${i < (rev.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                                                            ))}
                                                        </div>
                                                        <p className="text-slate-600 text-[14px] leading-snug">{rev.comment}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (Desktop Only) */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-6">
                            {seller ? (
                                <Card className="border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl overflow-hidden bg-white">
                                    <div className="p-6 border-b border-slate-50">
                                        <div className="flex items-center justify-between mb-4">
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1">In Stock</Badge>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Unit Price</p>
                                                <p className="text-3xl font-black text-slate-900">৳{seller.price}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Stock Availability</span>
                                                <span className="font-bold text-slate-900">{seller.stockQuantity} Units</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500 flex items-center gap-1"><Calendar className="h-4 w-4" /> Expiry Date</span>
                                                <span className="font-bold text-rose-600">{new Date(seller.expiryDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <Button onClick={handleAddToCart} disabled={cartLoading} className="w-full h-14 text-lg font-bold bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-all active:scale-95">
                                            {cartLoading ? <Loader2 className="animate-spin h-6 w-6" /> : <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</>}
                                        </Button>
                                        <p className="mt-4 text-[11px] text-center text-slate-400">
                                            Express delivery available within 24 hours.
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="bg-slate-50 border-dashed border-2 p-10 text-center rounded-xl">
                                    <Pill className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-bold">Currently Out of Stock</p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailsPage;