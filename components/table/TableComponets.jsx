import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function TableComponets({ columns }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const data = [
    {
      id: 1,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 2,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 3,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 4,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 5,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 6,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 7,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 8,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 9,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 10,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
    {
      id: 11,
      email: "0iM5S@example.com",
      name: "John Doe",
      age: 30,
      role: "Admin",
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const dataIds = React.useMemo(() => data.map((d) => d.id.toString()), []);
  return (
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {table.getRowModel().rows?.length ? (
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No Results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
