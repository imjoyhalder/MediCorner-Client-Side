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
import { UserX, ShieldCheck, Loader2, MoreHorizontal, Filter } from "lucide-react";
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
} from "@/components/ui/alert-dialog"; // Shadcn AlertDialog Import
import { banUser } from "@/services/admin.service";
import { IUser, UserRole, UserStatus } from "@/types/user";

type FilterRole = UserRole | "ALL";
type FilterStatus = UserStatus | "ALL";

export function UsersTable({ initialUsers }: { initialUsers: IUser[] }) {
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [roleFilter, setRoleFilter] = useState<FilterRole>("ALL");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    
   
    const [userToBan, setUserToBan] = useState<string | null>(null);

    const filteredUsers = users.filter((user) => {
        const roleMatch = roleFilter === "ALL" || user.role === roleFilter;
        const statusMatch = statusFilter === "ALL" || user.status === statusFilter;
        return roleMatch && statusMatch;
    });

    const handleBan = async () => {
        if (!userToBan) return;

        setLoadingId(userToBan);
        const res = await banUser(userToBan);
        setLoadingId(null);
        setUserToBan(null); 

        if (res.success) {
            toast.success(res.message);
            setUsers(prev => prev.map(u => 
                u.id === userToBan ? { ...u, status: "BAN" as UserStatus } : u
            ));
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filter Section - No Changes */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-1 gap-3">
                    <div className="w-full md:w-48">
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 block ml-1">Filter by Role</label>
                        <Select onValueChange={(v: FilterRole) => setRoleFilter(v)} defaultValue="ALL">
                            <SelectTrigger className="rounded-xl border-slate-200 h-11">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Roles</SelectItem>
                                <SelectItem value="CUSTOMER">Customer</SelectItem>
                                <SelectItem value="SELLER">Seller</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full md:w-48">
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 block ml-1">Filter by Status</label>
                        <Select onValueChange={(v: FilterStatus) => setStatusFilter(v)} defaultValue="ALL">
                            <SelectTrigger className="rounded-xl border-slate-200 h-11">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Status</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="BAN">Banned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 h-11 self-end">
                    <span className="text-sm font-bold text-slate-600">Total: {filteredUsers.length} Users</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="font-bold text-slate-600 h-14">User Information</TableHead>
                                <TableHead className="font-bold text-slate-600 hidden md:table-cell">Role</TableHead>
                                <TableHead className="font-bold text-slate-600">Current Status</TableHead>
                                <TableHead className="text-right font-bold text-slate-600 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 text-sm">{user.name || 'Anonymous'}</span>
                                            <span className="text-xs text-slate-400">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4">
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase border-none">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge 
                                            className={`font-bold text-[10px] px-2.5 py-0.5 rounded-full border-none shadow-sm ${
                                                user.status === 'ACTIVE' 
                                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                                                : 'bg-rose-100 text-rose-700 hover:bg-rose-100'
                                            }`}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        {user.role === 'ADMIN' ? (
                                            <div className="flex justify-end pr-2 text-slate-300">
                                                <ShieldCheck className="h-5 w-5" />
                                            </div>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-full hover:bg-slate-100 outline-none">
                                                        <MoreHorizontal className="h-5 w-5 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 shadow-xl border-slate-100">
                                                    <DropdownMenuLabel className="text-xs text-slate-400">Manage User</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        
                                                        onClick={() => setUserToBan(user.id)}
                                                        disabled={user.status === 'BAN' || loadingId === user.id}
                                                        className="text-rose-600 focus:text-white focus:bg-rose-500 cursor-pointer font-bold rounded-lg transition-all"
                                                    >
                                                        <UserX className="h-4 w-4 mr-2" />
                                                        Ban This User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Shadcn Alert Dialog Implementation */}
            <AlertDialog open={!!userToBan} onOpenChange={() => setUserToBan(null)}>
                <AlertDialogContent className="rounded-2xl border-slate-100 shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black text-slate-900">
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">
                            This action will ban the user from the platform. They will no longer be able to log in or perform any activities.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={(e) => {
                                e.preventDefault(); 
                                handleBan();
                            }}
                            disabled={loadingId !== null}
                            className="rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-700 transition-all shadow-md shadow-rose-100"
                        >
                            {loadingId ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Yes, Ban User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}