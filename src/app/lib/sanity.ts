import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// Define um tipo local para imagem do Sanity
type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
} | string | null | undefined;

export function urlFor(source: SanityImage) {
  if (!source) return null;
  return builder.image(source);
}

// Função auxiliar para imagens otimizadas
export function getOptimizedImageUrl(
  source: SanityImage,
  width?: number,
  height?: number,
  quality?: number
) {
  if (!source) return null;
  
  let imageBuilder = builder.image(source);
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (quality) imageBuilder = imageBuilder.quality(quality);
  
  return imageBuilder.url();
}