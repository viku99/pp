import React from 'react';

// Fix: Define and export interfaces to be used across the application. This resolves all type-related errors.

export type HeroMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string };

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  thumbnailVideo?: string;
  heroMedia: HeroMedia;
  client: string;
  year: number;
  tools: string[];
  description: string;
  gallery?: string[];
}

export interface Skill {
  name: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface About {
  bio: string;
  imageUrl: string;
}

export interface SocialLink {
  name:string;
  // Using React.ReactNode allows us to pass icon components directly
  icon?: React.ReactNode; 
  href: string;
}

export interface Content {
  lastUpdated: string;
  about: About;
  skills: Skill[];
  testimonials: Testimonial[];
  projects: Project[];
  socialLinks: SocialLink[];
}