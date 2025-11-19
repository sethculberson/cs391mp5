"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";

export default async function createNewUrl(
    url: string,
    shortened_url: string,
) {
    // Backend validation using encodeURIComponent - REQUIRED
    try {
        encodeURIComponent(url);
        encodeURIComponent(shortened_url);
    } catch {
        throw new Error("Invalid URL or alias");
    }
    
    // Additional check: URL should be valid
    try {
        const urlObj = new URL(url);
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
            throw new Error("Invalid URL. URL must start with http:// or https://");
        }
    } catch {
        throw new Error("Invalid URL format");
    }
    
    const urlCollection = await getCollection(URL_COLLECTION);
    
    // Check if alias already exists
    const existing = await urlCollection.findOne({ shortened_url: shortened_url });
    if (existing) {
        throw new Error("This alias is already taken. Please choose a different one.");
    }
    
    console.log("Creating new URL:", url);
    const p: UrlProps = {
        url: url,
        shortened_url: shortened_url,
    };
    
    const res = await urlCollection.insertOne({...p});
    if (!res.acknowledged) {
        throw new Error("Failed to create new URL");
    }
    return {...p, id: res.insertedId.toHexString()};
}