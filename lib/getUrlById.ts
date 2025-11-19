"use server";
import getCollection, { URL_COLLECTION } from '../db';
import { ObjectId } from 'mongodb';
import { UrlProps } from '../types/UrlProps';

export default async function getUrl(shortened_url: string): Promise<UrlProps | null> {
    const collection = await getCollection(URL_COLLECTION);
    const url = await collection.findOne({ shortened_url: shortened_url });
    if (url === null) {
        return null;
    }
    return {
        url: url.url,
        shortened_url: url.shortened_url,
    } as UrlProps;
}