"use client";

import { Table as _Table } from "@radix-ui/themes";

type TColumn<T> = {
  key: keyof T;
  name: string;
  renderAs: "text" | "number" | "date" | "currency";
};

interface Props<T> {
  columns: TColumn<T>[];
  items: T[];
  onRowClick?: (rowData: T) => void;
}

export default function Table<T extends { id: string }>({
  columns,
  items,
  onRowClick = () => null,
}: Props<T>) {
  return (
    <_Table.Root variant="surface">
      <_Table.Header>
        <_Table.Row>
          {columns.map(({ key, name }) => (
            <_Table.ColumnHeaderCell key={key as string}>
              {name}
            </_Table.ColumnHeaderCell>
          ))}
        </_Table.Row>
      </_Table.Header>

      <_Table.Body>
        {items.map((row) => {
          return (
            <_Table.Row
              className="hover:bg-[var(--accent-3)] cursor-pointer"
              key={row.id}
              onClick={() => onRowClick(row)}
            >
              {columns.map((column, index) => {
                const rawData = row[column.key];

                let cellData;
                let justify: "start" | "center" | "end" = "start";

                if (column.renderAs === "text") {
                  cellData = rawData as string;
                } else if (column.renderAs === "number") {
                  justify = "end";
                  cellData = rawData as number;
                } else if (column.renderAs === "date") {
                  cellData = new Date(rawData as string).toUTCString();
                } else if (column.renderAs === "currency") {
                  justify = "end";
                  cellData = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(rawData as number);
                }

                return (
                  <_Table.Cell key={index} justify={justify}>
                    {cellData}
                  </_Table.Cell>
                );
              })}
            </_Table.Row>
          );
        })}
      </_Table.Body>
    </_Table.Root>
  );
}
