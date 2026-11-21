import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../components/nav/navMachine';

export type Photo = CollectionEntry<'photos'>;

export async function photosNewestFirst(): Promise<Photo[]> {
  const photos = await getCollection('photos');
  return photos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const photosIndexHref = (lang: Lang) => `/photos/${lang}/`;
export const photoHref = (lang: Lang, photo: Photo) => `/photos/${lang}/${photo.slug}/`;
export const photoTransitionName = (photo: Photo) => `photo-${photo.slug}`;
/** What a photo is called on the page: its title, else its place, else nothing yet. */
export const photoLabel = (photo: Photo, lang: Lang): string | undefined =>
  photo.data.title?.[lang] ?? photo.data.place?.[lang];

/** Photos are a numbered series, oldest first, so a plate keeps its number as new ones arrive. */
export const plateNumber = (photos: Photo[], photo: Photo) =>
  String(photos.length - photos.findIndex((p) => p.slug === photo.slug)).padStart(2, '0');

/** Frontmatter dates are calendar days; format them in UTC so Brazil's offset can't shift the day. */
export const calendarDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { timeZone: 'UTC', dateStyle: 'long' });
