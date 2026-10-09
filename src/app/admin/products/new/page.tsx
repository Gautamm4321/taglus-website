import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#050B17] text-white p-8 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#E8DCC8]">Add New Product</h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill the fields below to add a new product directly into the MySQL database.
          </p>
        </div>
        <ProductForm />
      </div>
    </div>
  );
}