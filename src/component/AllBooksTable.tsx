import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { HandCoins, SquarePen, Trash2 } from "lucide-react";
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
import { toast } from "sonner";

export default function AllBooksTable() {
  const { data, isLoading } = useGetBooksQuery(undefined);
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

  if (isLoading) return <Skeleton className="w-full h-40" />;
  return (
    <div className="overflow-x-auto rounded shadow">
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
              <td className="px-4 py-2 border flex justify-evenly items-center">
                <button className="cursor-pointer text-green-600">
                  <SquarePen />
                </button>
                <button className="cursor-pointer text-cyan-600">
                  <HandCoins />
                </button>

                {/* modal */}
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(book?._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
