// Definisikan tipe untuk Project
export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  category: string;
  client: string;
  year: string;
  longDescription: string;
  deliverables: string[];
  
  website?: string
  demoUrl?: string
  socialLinks?: {
    website?: string
    instagram?: string 
    facebook?: string
    twitter?: string
    linkedin?:string
    [key: string]: string | undefined
  }
  testimonial?: string
  testimonialAuthor?: string
  testimonialRole?: string; // Contoh: "Marketing Director", "CEO"
  testimonialCompany?: string; // Contoh: "Company XYZ", "Project ABC"
  testimonialDate?: string; // Contoh: "Jan 2024"
  stats?: Array<{
    label: string
    value: string
  }>
}

// Definisikan tipe untuk Project Summary (untuk halaman daftar)
export interface ProjectSummary {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  client: string;
  year: string;
}

// Definisikan tipe untuk Project Statistics
export interface ProjectStats {
  totalProjects: number;
  totalClients: number;
  yearsOfExperience: string;
}

export interface CustomStatsOptions {
  manualYearsOfExperience?: string;
}

// Fungsi untuk mendapatkan ringkasan proyek terbaru
export function getLatestProjectSummaries(count: number = 3): ProjectSummary[] {
  return getLatestProjects(count).map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.images[0] || '',
    technologies: project.technologies,
    category: project.category,
    client: project.client,
    year: project.year
  }));
}

// Fungsi untuk mendapatkan proyek terbaru (berdasarkan id atau tahun)
export function getLatestProjects(count: number = 3): Project[] {
  // Sort by id descending (asumsi id terbaru adalah yang terbesar)
  return [...allProjects]
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
}

// Fungsi untuk mendapatkan semua proyek
export function getAllProjects(): Project[] {
  return [...allProjects];
}

// Fungsi untuk mendapatkan ringkasan proyek (untuk halaman daftar)
export function getProjectSummaries(): ProjectSummary[] {
  return allProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.images[0] || '',
    technologies: project.technologies,
    category: project.category,
    client: project.client,
    year: project.year
  }));
}

// Fungsi untuk mendapatkan proyek berdasarkan kategori
export function getProjectsByCategory(category: string): Project[] {
  return allProjects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
}

// Fungsi untuk mendapatkan proyek berdasarkan ID
export function getProjectById(id: number | string): Project | undefined {
  // Convert id to number if it's a string
  const projectId = typeof id === 'string' ? Number(id) : id;
  return allProjects.find(project => project.id === projectId);
}

// Fungsi untuk mendapatkan statistik proyek
export function getProjectStats(options?: CustomStatsOptions): ProjectStats {
  const totalProjects = allProjects.length;
  
  // Hitung total klien unik - Perbaikan untuk TypeScript
  const uniqueClients = new Set<string>(allProjects.map(project => project.client));
  const totalClients = uniqueClients.size;
  
  // Gunakan tahun manual jika disediakan, jika tidak hitung otomatis
  let yearsOfExperience: string;
  
  if (options?.manualYearsOfExperience) {
    yearsOfExperience = options.manualYearsOfExperience;
  } else {
    // Hitung tahun pengalaman (berdasarkan tahun pertama dan terakhir)
    const years = allProjects.map(p => {
      const yearStr = p.year;
      if (yearStr.includes('-')) {
        return parseInt(yearStr.split('-')[0]);
      }
      return parseInt(yearStr);
    }).filter(year => !isNaN(year));
    
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const yearsOfExp = maxYear - minYear + 1;
    yearsOfExperience = `${yearsOfExp}+`;
  }
  
  return {
    totalProjects,
    totalClients,
    yearsOfExperience
  };
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: 'Organization Agenda Logo Design',
    description: 'Logo design for a student organization\'s annual agenda, with regeneration as the main visual concept.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765721773/Frame_5_n6bdaj.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765721784/Frame_6_wv8qry.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765721781/Frame_7_f2ylkc.jpg',
    ],
    technologies: ['Illustrator', 'Vector Art'],
    category: 'Logo Design',
    client: 'Formalis',
    year: '2022',
    longDescription: 'The theme of regeneration is expressed through shapes, lines, and symbols that represent growth, continuity, and the transition of roles from one generation to the next. The logo serves not only as a visual identity for the event, but also as a symbol of renewal, unity, and the sustainability of the organization\'s values.',
    deliverables: ['Logo Design', 'Social Media posts'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      instagram: 'https://www.instagram.com/formalis_lipia/'
    }
  },

  {
    id: 2,
    title: 'Alumni Logo Design',
    description: 'Complete visual identity design with the history and philosophy of the logo for a pesantren alumni community',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765795981/Logo_Alumni_Pesantren-01_Large_c7cdzv.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765636154/guide1_rathyf.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765636154/guide2_ajjsds.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765636154/guide3_hw73mm.jpg',
    ],
    technologies: ['Illustrator', 'Shape Builder', 'Typography'],
    category: 'Logo Design',
    client: "KAMI (Keluarga Alumni Ma'had Ibnu Abbas Lombok)",
    year: '2024',
    longDescription: 'A complete brand identity design project including a logo, color palette, typography, and brand guidelines. Focused on a modern aesthetic that reflects the values of a local community brand.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Social Media posts'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      instagram: 'https://www.instagram.com/reels/DR0mUXpgYbK/'
    }
  },

  {
    id: 3,
    title: 'Car Wash Logo Design',
    description: 'Complete visual identity design for a car wash service business',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765641303/cw1_ymwl61.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765641304/cw2_mx7fnv.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765641305/cwgd_zobboa.jpg',
    ],
    technologies: ['Illustrator', 'Vector Art'],
    category: 'Logo Design',
    client: 'Absoora Car Wash',
    year: '2025',
    longDescription: 'This logo is designed to represent a car wash service business that is clean, fast, and reliable. The simple yet strong visual form is combined with elements of water and vehicles, reflecting a commitment to service quality and customer satisfaction.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Social Media posts', 'Poster Design', 'Banner Ads'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      instagram: 'https://www.instagram.com/absoora.coffee/'
    }
  },

  {
    id: 4,
    title: 'Social Media Logo',
    description: 'Social media campaign to explore the world of farming, with a focus on durian cultivation.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765642521/barudr3_vh7y60.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765642523/barudr2_tcujfj.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765642521/barudr1_kxccqs.jpg',
    ],
    technologies: ['Illustrator', 'Shape Builder'],
    category: 'Logo Design',
    client: 'Baru Durian',
    year: '2025',
    longDescription: 'The logo design embraces a nature-inspired concept, featuring a symbol that represents the durian fruit. This visual identity aims to create a friendly, modern, simple, and easily recognizable impression for customers.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Social Media Posts'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      tiktok: 'https://www.tiktok.com/@barudurian0'
    }
  },

  {
    id: 5,
    title: 'Organizational T-shirt Design',
    description: 'Organizational t-shirt design with Islamic touches, minimalist, and modern style.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653005/wts_l9jq6j.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653002/bts_ttsyos.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653005/backw_t3ia8g.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653004/backb_otuz3v.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653003/frontw_wz00pp.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765653002/frontb_v1q8xj.jpg',
    ],
    technologies: ['Illustrator', 'Photoshop', 'Typography'],
    category: 'T-Shirt Design',
    client: 'Formalis',
    year: '2024',
    longDescription: 'This organizational t-shirt design adopts a black-and-white monochrome concept with a modern visual approach. Arabic typography and Islamic-inspired symbols are treated in a minimalist style to create an elegant, bold, and contemporary identity that reflects the organization\'s values.',
    deliverables: ['T-Shirt Design', 'Social Media Posts', 'Print Design', 'Mockup Design'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      instagram: 'https://www.instagram.com/formalis_lipia/'
    }
  },

  {
    id: 6,
    title: 'Flyer Design',
    description: 'A curated collection of selected flyer designs created from 2022 to the present.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723804/Flyer_BC_Without_Rek_Feed_Large_mokep6.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723377/Cover1-02_Large_nqcgkr.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765725677/Socmed-01_Large_aw2oxs.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723966/Marhaban_Ya_Ramadhan_1080x1080_Large_sbmid4.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724186/Flyer_Bukber_16_April-01_Large_qrpcuz.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724404/Flyer-01_Large_dm9jqp.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723785/RDF_Feed_IG-01_Large_bfn5mq.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723107/1to1_Large_qb4j0u.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765723806/Flyer_BC_Feed_-01_Large_qdr3wv.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724496/munaskmb25-90d4b534-368f-4fde-8969-ae41d10e2eec_Large_hgbo68.jpg',
    ],
    technologies: ['Illustrator', 'Photoshop', "Canva", "Figma", "Affinity"],
    category: 'Flyer Design',
    client: 'Organization',
    year: '2022-Now',
    longDescription: 'A collection of flyer designs created from 2022 to the present, showcasing the evolution of visual style, creativity, and design approach across various projects, while adhering to client directions and requirements.',
    deliverables: ['Flyer Design', 'Social Media Posts', 'Print Design', 'Story Template', 'Twibbon'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      instagram: 'https://www.instagram.com/formalis_lipia/',
      facebook: 'https://web.facebook.com/kmbulukumba/?_rdc=1&_rdr#'
    }
  },

  {
    id: 7,
    title: 'Personal Poster Design',
    description: 'A collection of poster designs that I have shared on social media.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724610/2._Teeneger_Large_pot7hv.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724656/Over_Large_rxeuym.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724633/Ctlya_Large_cd8usq.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724666/Way_too_Heavy_Large_gjupmc.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724700/Logo_Large_kebckp.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724678/Its_not_100_Large_g4hcck.jpg',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724724/Poster2_Large_wlh5pr.jpg',
    ],
    technologies: ['Illustrator', 'Photoshop', "Canva", "Figma", "Affinity"],
    category: 'Poster Design',
    client: 'Personal',
    year: '2022-Now',
    longDescription: 'These posters are shared on social media as a form of visual communication as well as a space for design exploration. Each design represents ideas, style experimentation, and different visual approaches. The creative process reflects the development of design skills over time. These works are then curated as part of a portfolio.',
    deliverables: ['Poster Design', 'Social Media Posts', 'Story Template'],
    // TAMBAHKAN SOCIAL LINKS DI SINI (personal portfolio links)
    socialLinks: {
      instagram: 'https://www.instagram.com/ilkhanul_/',
      linkedin: 'https://www.linkedin.com/in/ilkhanul-khalik-262920391/',
      github: 'https://github.com/ilkhanul13'
    }
  },

  {
    id: 8,
    title: 'Commercial Poster Design',
    description: 'Herbal supplement advertising poster design.',
    images: [
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765725002/Image1_Small_ikx8xa.png',
      'https://res.cloudinary.com/dfovmrebt/image/upload/v1765724999/Image2_Medium_xh6ehv.png',
    ],
    technologies: ['Canva'],
    category: 'Poster Design',
    client: 'FeedBird',
    year: '2025',
    longDescription: 'This advertising poster design was originally created as part of a graphic design recruitment task from FeedBird, which involved producing two advertising posters for the CheongKwanJang Hong Sam Won product. The company operates in the high-quality herbal supplement industry, combining Korean red ginseng, red date extract, red berries, and other natural ingredients. The product is intended to help boost energy, enhance immune endurance, and support overall health.',
    deliverables: ['Product Poster Design', 'Product Advertisement', 'Social Media Posts'],
    // TAMBAHKAN SOCIAL LINKS DI SINI
    socialLinks: {
      website: 'https://feedbird.com',
      instagram: 'https://www.instagram.com/feedbirdcom/',
      facebook: 'https://web.facebook.com/feedbird.co/',
      linkedin: 'http://linkedin.com/company/feedbirdco/'
    },
    // TAMBAHKAN STATS untuk contoh
    stats: [
      { label: "Project Duration", value: "10 hours" },
    ],
    testimonial: "The poster design effectively communicated our product's benefits and increased our social media engagement by 40%.",
    testimonialAuthor: "Marketing Manager, FeedBird"
  },

];