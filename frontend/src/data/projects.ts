export interface Project {
  id: string;
  title: string;
  websiteUrl: string;
  videoUrl: string;
  description: string;
  thumbnailUrl?: string;
}

export const initialProjects: Project[] = [
  {
    id: 'doc-conv',
    title: 'Document Converter',
    websiteUrl: 'https://www.documentconverter.in/',
    videoUrl: '',
    description: 'A seamless utility platform designed to convert various document formats instantly.'
  },
  {
    id: 'manish-csc',
    title: 'Manish CSC Center',
    websiteUrl: 'https://manish-csc-center.onrender.com/',
    videoUrl: '',
    description: 'A comprehensive service center platform offering digital solutions and e-governance services.'
  },
  {
    id: 'mobile-shop',
    title: 'Mobile Shop',
    websiteUrl: 'https://mobile-shop-1-f23m.onrender.com/',
    videoUrl: '',
    description: 'A modern e-commerce platform for purchasing the latest mobile devices and accessories.'
  },
  {
    id: 'sanctuary-hotel',
    title: 'Sanctuary | Boutique Hotel & Guest House',
    websiteUrl: 'https://boutique-hotel.onrender.com/',
    videoUrl: '',
    description: 'An elegant boutique hotel and guest house offering premium accommodation and experiences.'
  }
];
