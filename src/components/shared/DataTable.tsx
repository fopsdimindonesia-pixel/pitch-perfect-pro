import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Download, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: DataTableColumn<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  enableSelection?: boolean;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  className?: string;
}

/**
 * Reusable DataTable Component
 * Provides sorting, pagination, search, column selection, export, and row selection
 */
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  description,
  searchPlaceholder = "Search...",
  enableSelection = true,
  pageSize = 10,
  onRowClick,
  className = "",
}: DataTableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<keyof T>>(
    new Set(columns.map((c) => c.key))
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter((row) => {
      return columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.key];
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [data, searchText, columns]);

  // Sort and paginate data
  const paginatedData = useMemo(() => {
    let sorted = [...filteredData];

    if (sortKey) {
      sorted.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    const totalPages = Math.ceil(sorted.length / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    return {
      data: sorted.slice(startIdx, endIdx),
      total: sorted.length,
      pages: totalPages,
    };
  }, [filteredData, sortKey, sortOrder, currentPage, pageSize]);

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const toggleRowSelection = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.data.length) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set(paginatedData.data.map((row) => row.id));
      setSelectedRows(allIds);
    }
  };

  const toggleColumnVisibility = (key: keyof T) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(key)) {
      newVisible.delete(key);
    } else {
      newVisible.add(key);
    }
    setVisibleColumns(newVisible);
  };

  const exportToCSV = () => {
    const headers = Array.from(visibleColumns)
      .map((key) => columns.find((c) => c.key === key)?.label || key)
      .join(",");

    const rows = paginatedData.data.map((row) =>
      Array.from(visibleColumns)
        .map((key) => {
          const value = row[key];
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data-export-${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const visibleColumnsList = columns.filter((c) => visibleColumns.has(c.key));

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </CardHeader>
      )}

      <CardContent className="space-y-4">
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1 max-w-xs">
            <Input
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search data"
            />
          </div>

          <div className="flex gap-2">
            {/* Column Visibility */}
            <div className="flex items-center gap-2">
              <Label className="text-xs">Columns:</Label>
              <Select>
                <SelectTrigger className="w-48" aria-label="Select visible columns">
                  <SelectValue placeholder="Toggle columns" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((col) => (
                    <div key={String(col.key)} className="flex items-center gap-2 p-2">
                      <Checkbox
                        id={`col-${String(col.key)}`}
                        checked={visibleColumns.has(col.key)}
                        onCheckedChange={() => toggleColumnVisibility(col.key)}
                        aria-label={`Toggle ${col.label} column`}
                      />
                      <label
                        htmlFor={`col-${String(col.key)}`}
                        className="text-sm cursor-pointer"
                      >
                        {col.label}
                      </label>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              aria-label="Export data as CSV"
              title="Export visible data to CSV"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Results info */}
        <div className="text-sm text-muted-foreground">
          Showing {paginatedData.data.length} of {paginatedData.total} results
          {selectedRows.size > 0 && ` • ${selectedRows.size} selected`}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {enableSelection && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.size === paginatedData.data.length && paginatedData.data.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all rows"
                    />
                  </TableHead>
                )}
                {visibleColumnsList.map((col) => (
                  <TableHead
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className={col.sortable ? "cursor-pointer hover:bg-muted transition-colors" : ""}
                    onClick={() => col.sortable && toggleSort(col.key)}
                    role={col.sortable ? "button" : undefined}
                    tabIndex={col.sortable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (col.sortable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        toggleSort(col.key);
                      }
                    }}
                    aria-sort={
                      sortKey === col.key
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && (
                        <ArrowUpDown
                          className={`w-4 h-4 ${
                            sortKey === col.key
                              ? "text-primary"
                              : "text-muted-foreground/50"
                          }`}
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumnsList.length + (enableSelection ? 1 : 0)}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No data found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.data.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  >
                    {enableSelection && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${row.id}`}
                        />
                      </TableCell>
                    )}
                    {visibleColumnsList.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {paginatedData.pages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {paginatedData.pages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(paginatedData.pages, p + 1))}
                disabled={currentPage === paginatedData.pages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
