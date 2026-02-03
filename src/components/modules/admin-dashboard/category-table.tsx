'use client';

import { useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus, Trash2, Loader2, FolderTree,
    Search, Hash, ChevronLeft, ChevronRight
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { createCategory, deleteCategory } from "@/services/category.service";

interface ICategory {
    id: string;
    name: string;
    slug: string;
}

export function CategoryTable({ initialCategories }: { initialCategories: ICategory[] }) {
    const [categories, setCategories] = useState<ICategory[]>(initialCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Form State
    const [formData, setFormData] = useState({ name: "", slug: "" });

    // Filter Logic
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    // Handle Create
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await createCategory(formData);
        setLoading(false);

        if (res.success) {
            toast.success(res.message);
            setCategories([res.data, ...categories]);
            setIsCreateOpen(false);
            setFormData({ name: "", slug: "" });
            setCurrentPage(1);
        } else {
            toast.error(res.message);
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        
        setDeleteId(id);
        const res = await deleteCategory(id);
        setDeleteId(null);

        if (res.success) {
            toast.success(res.message);
            const updatedCategories = categories.filter(c => c.id !== id);
            setCategories(updatedCategories);
            
            const newTotalPages = Math.ceil(updatedCategories.length / itemsPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-5 p-1">
            {/* Header & Search Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-10 rounded-xl border-slate-200 focus:ring-slate-100"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold gap-2 px-5 w-full md:w-auto shadow-md transition-all active:scale-95">
                            <Plus className="h-5 w-5" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-2xl sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-black">New Category</DialogTitle>
                            <DialogDescription>Add a new classification for medicines.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Category Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Immune Support"
                                    className="rounded-xl h-11"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Slug (URL identifier)</label>
                                <Input
                                    required
                                    placeholder="e.g. immune-support"
                                    className="rounded-xl h-11"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                />
                            </div>
                            <DialogFooter className="pt-4">
                                <Button type="submit" disabled={loading} className="w-full bg-indigo-600 font-bold rounded-xl h-11">
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Category"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-slate-100">
                                <TableHead className="w-[100px] font-bold text-slate-600 pl-6">Icon</TableHead>
                                <TableHead className="font-bold text-slate-600">Category Name</TableHead>
                                <TableHead className="font-bold text-slate-600 hidden md:table-cell">Slug</TableHead>
                                <TableHead className="text-right font-bold text-slate-600 pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedCategories.length > 0 ? (
                                paginatedCategories.map((cat) => (
                                    <TableRow key={cat.id} className="hover:bg-slate-50/30 transition-colors border-slate-50">
                                        <TableCell className="pl-6 py-4">
                                            <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                                <FolderTree className="h-5 w-5" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{cat.name}</span>
                                                <span className="text-[10px] text-slate-400 font-medium md:hidden">{cat.slug}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                                                <Hash className="h-3 w-3" /> {cat.slug}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={deleteId === cat.id}
                                                className="h-9 w-9 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                                            >
                                                {deleteId === cat.id ?
                                                    <Loader2 className="h-4 w-4 animate-spin" /> :
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                }
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-40 text-center text-slate-400 font-medium">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* --- Pagination UI --- */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-slate-50/20">
                        <p className="text-xs font-bold text-slate-400">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} entries
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-600 hover:bg-white shadow-sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            
                            <div className="flex items-center px-3 h-9 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 shadow-sm">
                                {currentPage} / {totalPages}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-600 hover:bg-white shadow-sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}