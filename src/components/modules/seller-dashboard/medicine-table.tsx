"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconTrash, IconChevronLeft, IconChevronRight, IconLoader2 } from "@tabler/icons-react"
import { toast } from "sonner"

// Types & Services
import { SellerMedicine } from "@/types/seller"
import { deleteMedicine } from "@/services/seller.service"
import { UpdateMedicineSheet } from "./update-medicine-form"


interface DataTableProps {
  data: SellerMedicine[];
}

export function DataTable({ data }: DataTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  })


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return

    startTransition(async () => {
      try {
        console.log(id);
        const response = await deleteMedicine(id)
        if (response.success) {
          toast.success("Medicine deleted successfully")
          router.refresh()
        } else {
          toast.error(response.message || "Failed to delete")
        }
      } catch (error) {
        toast.error("Something went wrong while deleting")
      }
    })
  }

  // Column Definitions
  const columns: ColumnDef<SellerMedicine>[] = [
    {
      accessorKey: "medicineName",
      header: "Medicine Name",
      cell: ({ row }) => <span className="font-medium">{row.original.medicineName}</span>,
    },
    {
      accessorKey: "brandName",
      header: "Brand",
    },
    {
      accessorKey: "price",
      header: "Price (৳)",
      cell: ({ row }) => <span>৳{row.original.price.toLocaleString()}</span>,
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ row }) => (
        <span className={row.original.stockQuantity < 10 ? "text-destructive font-bold" : ""}>
          {row.original.stockQuantity}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        
        <div className="flex items-center gap-2">

          <UpdateMedicineSheet medicine={row.original} />
          <Button
            variant="outline"
            size="icon"
            className="size-8 text-destructive hover:bg-destructive/10"
            disabled={isPending}
            onClick={() => handleDelete(row.original.medicineId)}
          >
            {isPending ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <IconTrash className="size-4" />
            )}
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  console.log('medicine table', table);

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card mx-4 lg:mx-6 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  {/* console.log(row); */}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-32 text-muted-foreground">
                  No Medicines Found in Inventory.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-2">
        <p className="text-sm text-muted-foreground">
          Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft className="size-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <IconChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}