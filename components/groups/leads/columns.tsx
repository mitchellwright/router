"use client";

import { Lead } from "@/lib/db/db";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import OptionsDropdown from "./options-dropdown";

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Link
          className="text-xs underline underline-offset-4 hover:opacity-70 transition-all"
          href={`/leads/${id}`}
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "endpoint",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Endpoint" />;
    },
    cell: ({ row }) => {
      const endpoint: string = row.getValue("endpoint");
      return (
        <Link
          className="underline underline-offset-4 hover:opacity-70 transition-all"
          href={`/endpoints/${row.original.endpointId}`}
        >
          {endpoint}
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const date = new Date(createdAt);
      return (
        <p className="text-xs">
          {date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "options",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Options" />;
    },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return <OptionsDropdown id={id} />;
    },
    enableSorting: false,
  },
];
