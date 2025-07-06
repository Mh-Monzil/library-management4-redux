import App from "@/App";
import BookDetails from "@/pages/Books/BookDetails";
import Books from "@/pages/Books/Books";
import BorrowBook from "@/pages/Books/BorrowBook";
import EditBook from "@/pages/Books/EditBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: `/books/:id`,
        element: <BookDetails />,
      },
      {
        path: `/edit-book/:id`,
        element: <EditBook />,
      },
      {
        path: `/borrow/:id`,
        element: <BorrowBook />,
      },
    ],
  },
]);

export default router;
