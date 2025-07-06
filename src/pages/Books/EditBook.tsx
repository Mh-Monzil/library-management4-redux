import { useGetBookByIdQuery } from "@/redux/features/api/bookApi";
import { useParams } from "react-router";
import BookForm from "./BookForm";

const EditBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading } = useGetBookByIdQuery(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-lg">Loading edit book details...</p>
      </div>
    );
  }

  const book = bookData?.data;

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold ">Edit Book</h1>
        <p className="text-gray-200 mt-1 sm:mt-2">Update book information</p>
      </div>

      <BookForm book={book} />
    </div>
  );
};

export default EditBook;
