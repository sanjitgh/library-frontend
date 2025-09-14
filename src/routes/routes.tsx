import AddBook from "@/component/AddBook";
import AllBook from "@/component/AllBook";
import BorrowBook from "@/component/BorrowBook";
import BorrowSummary from "@/component/BorrowSummary";
import UpdateBook from "@/component/UpdateBook";
import Home from "@/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        element: (
          <section className="py-10">
            <h1 className="text-2xl font-semibold">Home Page</h1>
          </section>
        ),
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/all-book",
        Component: AllBook,
      },
      {
        path: "/update-book/:id",
        Component: UpdateBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/borrow-book/:id",
        Component: BorrowBook,
      },
    ],
  },
]);

export default router;
