import AddBook from "@/component/AddBook";
import AllBook from "@/component/AllBook";
import BorrowSummary from "@/component/BorrowSummary";
import Home from "@/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/all-book",
        Component: AllBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
