import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBorrowSummaryQuery } from "@/redux/api/baseApi";

interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export default function BorrowSummary() {
  const { data, isLoading, isError } = useBorrowSummaryQuery(undefined);

  const borrowData: BorrowSummaryItem[] = data || [];

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4">📚 Borrow Summary</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-right">
              Total Quantity Borrowed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                Loading borrow summary...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-red-500">
                Failed to load data ❌
              </TableCell>
            </TableRow>
          ) : borrowData.length > 0 ? (
            borrowData.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50">
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell className="text-right font-semibold">
                  {item.totalQuantity}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                No borrowed books found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
