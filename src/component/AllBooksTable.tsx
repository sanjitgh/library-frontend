import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { HandCoins, SquarePen, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { Link } from "react-router";
import type { RootState } from "@/redux/store";
import { setCurrentPage } from "@/redux/features/books/bookSlice";

export default function AllBooksTable() {
  const dispatch = useDispatch();
  const { currentPage, limit } = useSelector((state: RootState) => state.book);

  const { data, isLoading } = useGetBooksQuery({
    page: currentPage,
    limit,
  });
  const [deleteBook] = useDeleteBookMutation();

  // Handle delete
  const handleDelete = async (bookId: string) => {
    try {
      const res = await deleteBook(bookId).unwrap();
      console.log(res);
      if (res?.success === true) {
        return toast.success(res.message, {
          position: "top-center",
        });
      }
    } catch (error: any) {
      return toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  if (isLoading) return <Skeleton className="w-full h-40" />;

  return (
    <div className="overflow-x-auto rounded">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Copies</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((book: any) => (
            <tr key={book._id}>
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">
                {book.available === false ? "Unavailable" : "Available"}
              </td>
              <td className="px-4 py-2 border flex justify-evenly items-center gap-2">
                <button className="cursor-pointer text-green-600">
                  <Link to={`/update-book/${book._id}`}>
                    <SquarePen />
                  </Link>
                </button>

                {/* Delete modal */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="cursor-pointer text-red-600">
                      <Trash2 />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete or remove your database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(book?._id)}
                        className="cursor-pointer"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {book.copies === 0 ? (
                  <button className="text-gray-600">
                    <HandCoins />
                  </button>
                ) : (
                  <button className="cursor-pointer text-cyan-600">
                    <Link to={`/borrow-book/${book._id}`}>
                      <HandCoins />
                    </Link>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Simple Pagination - works with your existing API */}
      <div className="mt-8">
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className={
                  data && data.length < limit
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
