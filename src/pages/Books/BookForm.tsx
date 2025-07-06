import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBookMutation,
  useUpdateBookMutation,
} from "@/redux/features/api/bookApi";
import type { IBook } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";

interface BookFormProps {
  book?: IBook;
}

const BookForm = ({ book }: BookFormProps) => {
  const { pathname } = useLocation();
  const [createBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<IBook>>({
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
    description: book?.description || "",
    copies: book?.copies || 0,
    available: book?.available ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (pathname.includes("create-book")) {
        console.log(formData);
        const res = await createBook(formData).unwrap();

        if (res.success) {
          setIsSubmitting(false);
          toast.success("Book added successfully!");
        }
      } else {
        const res = await updateBook({
          id: book?._id,
          updatedBook: formData,
        }).unwrap();

        if (res.success) {
          setIsSubmitting(false);
          toast.success("Book updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof IBook,
    value: string | number | boolean
  ) => {
    setFormData((prev: Partial<IBook>) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-2 sm:mr-4 p-2 sm:px-4">
            <Link to="/books">
              <ArrowLeft className="h-4 w-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>
          <CardTitle className="text-lg sm:text-xl">
            {book ? "Edit Book" : "Add New Book"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN *</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleChange("isbn", e.target.value)}
                required
                className="text-base font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copies">Copies *</Label>
              <Input
                id="copies"
                type="number"
                min="0"
                value={formData.copies}
                onChange={(e) =>
                  handleChange("copies", Number.parseInt(e.target.value) || 0)
                }
                required
                className="text-base"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) =>
                  handleChange("available", checked)
                }
                disabled={formData.copies === 0}
              />
              <Label htmlFor="available" className="text-sm sm:text-base">
                Available
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="text-base resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              asChild
              className="w-full sm:w-auto bg-transparent"
            >
              <Link to="/books">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : pathname === "/create-book"
                ? "Add Book"
                : "Update Book"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
