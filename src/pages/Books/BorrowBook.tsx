"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/features/api/bookApi";
import { toast } from "sonner";

const BorrowBook = () => {
  const { id } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook] = useBorrowBookMutation();
  const { data: bookData, refetch } = useGetBookByIdQuery(id as string);

  const book = bookData?.data;

  useEffect(() => {
    refetch();
  });

  // Set default due date to 2 weeks from now
  useState(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 14);
    setDueDate(defaultDate.toISOString().split("T")[0]);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await borrowBook({
        book: id,
        quantity,
        dueDate,
      }).unwrap();

      if (res.success) {
        refetch();
        navigate("/borrow-summary");
        toast.success("Book borrowed successfully!");
      }
    } catch (error) {
      console.error("Failed to borrow book:", error);
      toast.error(error?.data?.message || "Failed to borrow book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mt-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{book?.title}</h3>
            <p className="text-gray-200">by {book?.author}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{book?.copies} copies available</Badge>
              <Badge variant={book?.available ? "default" : "secondary"}>
                {book?.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <CardTitle>Borrow Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={book?.copies}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Number.parseInt(e.target.value) || 1)
                  }
                  required
                />
                <p className="text-sm text-gray-500">
                  Maximum: {book?.copies} copies
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/books">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting || !book?.available || quantity > book?.copies
                }
                className="cursor-pointer"
              >
                {isSubmitting ? "Processing..." : "Borrow Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBook;
