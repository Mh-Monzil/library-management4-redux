import BookCard from "@/components/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/features/api/bookApi";
import type { IBook } from "@/types";
import { BookOpen, Edit, Eye, Plus } from "lucide-react";
import { Link } from "react-router";

const Books = () => {
  const { data: books } = useGetBooksQuery({});

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold ">All Books</h1>
          <p className="text-gray-200 mt-1 sm:mt-2">
            Manage your library collection
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/create-book">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books?.data?.map((book: IBook) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block shadow-sm rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.data?.map((book: IBook) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/books/${book.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/edit-book/${book.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    {book.available && book.copies > 0 && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/borrow/${book.id}`}>
                          <BookOpen className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {books?.data?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found.</p>
          <Button asChild className="mt-4">
            <Link to="/create-book">Add your first book</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Books;
