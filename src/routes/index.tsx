import App from "@/App";
import BookDetails from "@/pages/Books/BookDetails";
import Books from "@/pages/Books/Books";
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
    ],
  },
]);

export default router;
