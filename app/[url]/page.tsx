import { redirect } from 'next/navigation';
import getUrl from '@/lib/getUrlById';

export default async function UrlRedirect({ params }: { params: any }) {
  const p = await params;
  const shortUrl = p.url;
  
  if (!shortUrl) {
    redirect('/');
  }
  
  const urlData = await getUrl(shortUrl);
  
  if (!urlData) {
    return (
      <div className="p-4">
        <h1>URL not found</h1>
        <p>The shortened URL "{shortUrl}" does not exist.</p>
      </div>
    );
  }
  
  redirect(urlData.url);
}