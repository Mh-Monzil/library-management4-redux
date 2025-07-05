import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBookByIdQuery } from "@/redux/features/api/bookApi";
import { ArrowLeft, BookOpen, Edit } from "lucide-react";
import { Link, useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data: bookData, isLoading } = useGetBookByIdQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-lg">Loading book details...</p>
      </div>
    );
  }

  const book = bookData?.data;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-6 sm:mb-8">
        <Button variant="ghost" asChild className="mr-2 sm:mr-4 p-2 sm:px-4">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-0 sm:mr-2" />
            <span className="hidden sm:inline">Back to Books</span>
          </Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold ">Book Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl sm:text-2xl leading-tight">
                    {book.title}
                  </CardTitle>
                  <p className="text-base sm:text-lg text-gray-200 mt-1 sm:mt-2">
                    by {book.author}
                  </p>
                </div>
                <Badge
                  variant={book.available ? "default" : "secondary"}
                  className="self-start"
                >
                  {book.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-semibold text-gray-200 text-base sm:text-lg">
                  Description
                </h3>
                <p className="text-gray-300 mt-1 text-sm sm:text-base leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-200">Genre</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {book.genre}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">ISBN</h3>
                  <p className="text-gray-300 font-mono text-sm break-all">
                    {book.isbn}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Copies Available
                </h3>
                <p className="text-gray-200 text-sm sm:text-base">
                  {book.copies} copies
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link to={`/edit-book/${book._id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Book
                </Link>
              </Button>

              {book.available && book.copies > 0 && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link to={`/borrow/${book._id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Borrow Book
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
