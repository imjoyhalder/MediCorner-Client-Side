
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    UserX, ShieldCheck, Loader2, MoreHorizontal,
    CheckCircle2, ChevronLeft, ChevronRight, Users
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { banUser } from "@/services/admin.service";
import { IUser, UserRole, UserStatus } from "@/types/user";

type FilterRole = UserRole | "ALL";
type FilterStatus = UserStatus | "ALL";

export function UsersTable({ initialUsers }: { initialUsers: IUser[] }) {
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [roleFilter, setRoleFilter] = useState<FilterRole>("ALL");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    // --- Pagination Logic (20 Users per page) ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const filteredUsers = users.filter((user) => {
        const roleMatch = roleFilter === "ALL" || user.role === roleFilter;
        const statusMatch = statusFilter === "ALL" || user.status === statusFilter;
        return roleMatch && statusMatch;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (type: 'role' | 'status', value: string) => {
        if (type === 'role') setRoleFilter(value as FilterRole);
        if (type === 'status') setStatusFilter(value as FilterStatus);
        setCurrentPage(1);
    };

    const handleStatusUpdate = async () => {
        if (!selectedUser) return;
        setLoadingId(selectedUser.id);
        const res = await banUser(selectedUser.id);
        setLoadingId(null);

        if (res.success) {
            const newStatus = selectedUser.status === "BAN" ? "ACTIVE" : "BAN";
            toast.success(`${selectedUser.name || 'User'} is now ${newStatus}`);
            setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, status: newStatus as UserStatus } : u));
            setSelectedUser(null);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="relative w-full max-w-[100vw] overflow-x-hidden">
            {/* Sticky Filter Section */}
            <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md pb-4 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">

                    <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                                Role
                            </label>
                            <Select onValueChange={(v) => handleFilterChange("role", v)} defaultValue="ALL">
                                <SelectTrigger className="w-full sm:w-40 rounded-xl border-slate-200 h-10 shadow-none focus:ring-0">
                                    <SelectValue placeholder="Roles" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                    <SelectItem value="ALL">All Roles</SelectItem>
                                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                                    <SelectItem value="SELLER">Seller</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">
                                Status
                            </label>
                            <Select onValueChange={(v) => handleFilterChange("status", v)} defaultValue="ALL">
                                <SelectTrigger className="w-full sm:w-40 rounded-xl border-slate-200 h-10 shadow-none focus:ring-0">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="BAN">Banned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-4 h-10 bg-slate-100 rounded-xl ml-auto border border-slate-200/50">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600">
                            Total {filteredUsers.length}
                        </span>
                    </div>
                </div>
            </div>


            {/* Main Table Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="border-slate-100">
                                <TableHead className="font-bold text-slate-600 h-12 px-6 whitespace-nowrap">User Detail</TableHead>
                                <TableHead className="font-bold text-slate-600 hidden md:table-cell whitespace-nowrap">Role</TableHead>
                                <TableHead className="font-bold text-slate-600 whitespace-nowrap">Status</TableHead>
                                <TableHead className="text-right font-bold text-slate-600 pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <TableRow key={user.id} className="border-slate-50 group transition-colors hover:bg-slate-50/50">
                                        <TableCell className="py-3 px-6">
                                            <div className="flex flex-col min-w-[150px]">
                                                <span className="font-bold text-slate-900 text-sm truncate">{user.name || 'Anonymous'}</span>
                                                <span className="text-[11px] text-slate-400 font-medium truncate">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-3">
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[9px] uppercase tracking-wider border-none">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge className={`font-bold text-[9px] px-2 py-0.5 rounded-full border-none shadow-sm ${user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                }`}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-3 pr-6">
                                            {user.role === 'ADMIN' ? (
                                                <ShieldCheck className="h-4 w-4 text-slate-300 ml-auto mr-2" />
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white hover:shadow-md transition-all">
                                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-2xl border-slate-100 p-1">
                                                        <DropdownMenuLabel className="text-[10px] text-slate-400 px-2 py-1">Management</DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            onClick={() => setSelectedUser(user)}
                                                            className={`font-bold rounded-lg cursor-pointer ${user.status === 'BAN' ? 'text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700' : 'text-rose-600 focus:bg-rose-50 focus:text-rose-700'
                                                                }`}
                                                        >
                                                            {user.status === 'BAN' ? <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> : <UserX className="h-3.5 w-3.5 mr-2" />}
                                                            {user.status === 'BAN' ? "Activate Account" : "Ban Account"}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-slate-400 font-medium italic">
                                        No users found matches the filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-50 bg-slate-50/30 gap-4">
                    <p className="text-[11px] font-bold text-slate-400 order-2 sm:order-1">
                        Displaying {paginatedUsers.length} of {filteredUsers.length} Users
                    </p>
                    <div className="flex items-center gap-2 order-1 sm:order-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl h-9 px-3 border-slate-200 text-slate-600 hover:bg-white shadow-sm disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="min-w-[70px] text-center text-xs font-black text-slate-700">
                            Page {currentPage} / {totalPages || 1}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl h-9 px-3 border-slate-200 text-slate-600 hover:bg-white shadow-sm disabled:opacity-30"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Alert Dialog */}
            <AlertDialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <AlertDialogContent className="rounded-3xl border-slate-100 max-w-[90vw] sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-black text-slate-900 leading-tight">
                            {selectedUser?.status === "BAN" ? "Restore Access?" : "Confirm Restriction?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium text-sm">
                            {selectedUser?.status === "BAN"
                                ? `Are you sure you want to unban ${selectedUser?.name}? They will regain access instantly.`
                                : `Are you sure you want to ban ${selectedUser?.name}? This user will be logged out from all devices.`
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="rounded-2xl border-slate-200 font-bold text-slate-500 sm:w-1/2">Dismiss</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => { e.preventDefault(); handleStatusUpdate(); }}
                            disabled={loadingId !== null}
                            className={`rounded-2xl font-bold text-white sm:w-1/2 ${selectedUser?.status === "BAN" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                                }`}
                        >
                            {loadingId ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}