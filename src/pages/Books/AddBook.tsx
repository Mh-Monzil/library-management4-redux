import BookForm from "./BookForm";

const AddBook = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold ">Add New Book</h1>
        <p className="text-gray-200 mt-2">
          Add a new book to the library collection
        </p>
      </div>

      <BookForm />
    </div>
  );
};

export default AddBook;
