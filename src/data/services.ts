import { ServiceItem } from '@/types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-portraits',
    title: 'Editorial Portraits',
    subtitle: 'Individuals, creatives, and artists looking for depth, not corporate headshots.',
    description: 'A relaxed, guided photography experience designed to create natural, timeless portraits. We focus on clean composition, organic light, and capturing who you really are.',
    startingPrice: 350,
    imageUrl: '/images/srv-1.jpg',
    inclusions: [
      'Comprehensive styling & location consultation',
      'High-resolution retouched digital gallery',
      'Unrestricted personal print release',
      'Expedited 5–7 day turnaround',
    ],
    recommendedPackageId: 'pkg-signature',
  },
  {
    id: 'srv-couples',
    title: 'Couples & Elopements',
    subtitle: 'For love stories that value honesty, movement, and intimacy over stiff posing.',
    description: 'Whether celebrating an anniversary, engagement, or quiet elopement, we create space for you to be yourselves. No forced smiles—just genuine romance against stunning natural backdrops.',
    startingPrice: 550,
    imageUrl: '/images/srv-2.jpg',
    inclusions: [
      'Sunset or golden hour timing for magical light',
      'Up to 2 locations or wardrobe changes',
      'Full private digital gallery with mobile sharing app',
      'Complimentary print ordering credit',
    ],
    recommendedPackageId: 'pkg-signature',
  },
  {
    id: 'srv-branding',
    title: 'Brand & Founder Imagery',
    subtitle: 'Elevate your aesthetic authority across web, press, and editorial channels.',
    description: 'Bespoke commercial visual libraries tailored for founders, creators, designers, and boutique hospitality brands. We craft images that communicate high value and convert attention.',
    startingPrice: 850,
    imageUrl: '/images/srv-3.jpg',
    inclusions: [
      'Pre-shoot creative direction & moodboard development',
      'Mix of candid working shots, detail textures, and portraits',
      'Full commercial licensing & digital marketing release',
      'Web-optimized & full-resolution master TIFF/JPG files',
    ],
    recommendedPackageId: 'pkg-editorial',
  },
  {
    id: 'srv-families',
    title: 'Intentional Families',
    subtitle: 'Capturing the wild, messy, beautiful seasons of growth.',
    description: 'Forget stiff studio setups where everyone looks exhausted. We capture your family running through fields, sharing unscripted hugs, and creating memories your children will cherish.',
    startingPrice: 450,
    imageUrl: '/images/srv-4.jpg',
    inclusions: [
      'Gentle pacing adaptable to kids and pets',
      'Guidance on timeless wardrobe coordination',
      'Online proofing gallery with one-click print orders',
      'Full image rights included',
    ],
    recommendedPackageId: 'pkg-signature',
  },
];
