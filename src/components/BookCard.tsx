import type { IBook } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { BookOpen, Edit, Eye } from "lucide-react";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="h-full bg-transparent">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight truncate">
              {book.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1 truncate">
              by {book.author}
            </p>
          </div>
          <Badge
            variant={book.available ? "default" : "secondary"}
            className="ml-2 shrink-0"
          >
            {book.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex">
            <span className="text-gray-200">Genre:</span>
            <span className="font-medium truncate ml-2">{book.genre}</span>
          </div>
          <div className="flex">
            <span className="text-gray-200">ISBN:</span>
            <span className="font-mono text-xs truncate ml-2">{book.isbn}</span>
          </div>
          <div className="flex">
            <span className="text-gray-200">Copies:</span>
            <span className="font-medium">{book.copies}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0 bg-transparent"
          >
            <Link to={`/books/${book._id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0 bg-transparent"
          >
            <Link to={`/edit-book/${book._id}`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>
          {book.available && book.copies > 0 && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 min-w-0 bg-transparent"
            >
              <Link to={`/borrow/${book._id}`}>
                <BookOpen className="h-3 w-3 mr-1" />
                Borrow
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
