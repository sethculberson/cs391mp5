import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
        <p className="mb-6 text-gray-600">Enter a full URL and a short code to create a shortened link.</p>
        <SearchForm />
      </div>
    </div>
  );
}