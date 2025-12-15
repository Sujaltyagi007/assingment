"use client";
import React from "react";
import TableComponets from "../table/TableComponets";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

export default function Clients() {
  const columns = React.useMemo(
    () => [
      {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      },
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
              className={"cursor-pointer"}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("company")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const [open, setOpen] = React.useState(false);
          const [loading, setLoading] = React.useState(false);
          const handleDelete = async (id) => {
            setLoading(true);
            console.log("Deleting section with ID:", id);
            try {
              const response = await fetch(`/api/user/${id}`, {
                method: "Delete",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              if (response.ok) {
                alert(data.message);
                setOpen(false);
              } else {
                alert("Failed to delete section");
              }
            } catch (error) {
              console.error("Error during deletion:", error);
              alert("An error occurred while deleting the section.");
            } finally {
              setLoading(false);
            }
          };
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                    size="icon"
                  >
                    <IconDotsVertical />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Make a copy</DropdownMenuItem>
                  <DropdownMenuItem>Favorite</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete Section</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this section? This action
                    cannot be undone.
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className={"cursor-pointer"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      // variant="destructive"
                      onClick={() => handleDelete(row.original.id)}
                      disabled={loading}
                      className={"cursor-pointer bg-red-400 hover:bg-red-500"}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          );
        },
      },
    ],
    []
  );

  return <TableComponets columns={columns} />;
}
