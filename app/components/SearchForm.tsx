"use client";

import { useState } from "react";
import createNewUrl from "@/lib/createNewUrl";

export default function SearchForm() {
    const [fullUrl, setFullUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      setError(null);
      setResult(null);
      
      const trimmedFull = fullUrl.trim();
      const trimmedShort = shortUrl.trim();
      
      if (!trimmedFull || !trimmedShort) {
        setError("Both fields are required");
        return;
      }
      
      // Frontend validation using encodeURIComponent (optional but helpful)
      try {
        encodeURIComponent(trimmedFull);
        encodeURIComponent(trimmedShort);
      } catch {
        setError("Invalid URL or alias");
        return;
      }
      
      try {
        const newUrl = await createNewUrl(trimmedFull, trimmedShort);
        const shortenedLink = `${window.location.origin}/${newUrl.shortened_url}`;
        setResult(shortenedLink);
        // Clear form on success
        setFullUrl("");
        setShortUrl("");
      } catch (error: any) {
        console.error("Error creating URL:", error);
        // Display the specific error message from the backend
        setError(error.message || "Failed to create shortened URL");
      }
    }

    return (
      <div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
            <input
              aria-label="enter-full-url"
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="Full URL (e.g. https://example.com)"
              className="border border-orange-400 bg-transparent text-black placeholder-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <input
              type="text"
              aria-label="enter-short-code"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              placeholder="Short code (e.g. abc123)"
              className="border border-orange-400 bg-transparent text-black placeholder-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
              Shorten URL
            </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 border border-red-500 bg-red-50">
            <p className="font-semibold text-red-700">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-4 p-4 border border-green-500 bg-green-50">
            <p className="font-semibold text-green-700">Shortened URL created:</p>
            <a href={result} className="text-blue-600 underline break-all">{result}</a>
          </div>
        )}
      </div>
    );
}