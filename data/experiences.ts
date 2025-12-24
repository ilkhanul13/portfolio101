// data/experiences.ts
export interface Experience {
  year: string;
  company: string;
  companyUrl?: string;
  position: string;
  period: string;
  role?: string;
  description: string | string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    year: "2022",
    company: "PT. Gemalindo Kreasi Indonesia",
    companyUrl: "https://gemalindokreasiindonesia.com/",
    position: "Part Time",
    period: "November 23 – May 28, 2022",
    role: "Streaming Crew",
    description: [
      "Served as part of the streaming team for the G20 Bali 2022 during the Global Platform for Disaster Risk Reduction (GPDRR) session.",
      "Responsibilities included managing presentation flow, monitoring and coordinating speaker timing, and handling technical coordination via Zoom."
    ],
    tags: ["Pinner Zoom", "Timer", "PPT Operator"]
  },
  {
    year: "2023",
    company: "Spirit of Aqsa (SoA)",
    companyUrl: "https://spiritofaqsa.or.id/",
    position: "Intern",
    period: "Maret 2023 - Mei 2023",
    role: "Administrative & Designer Intern",
    description: [
      "Assisted senior designers in creating visual materials such as flyers and banners related to humanitarian issues in Palestine.",
      "Provided administrative support to the data management team, including donor data recording, verification, and reporting for humanitarian programs."
    ],
    tags: ["Data Entry", "Graphic Design", "Banner/flyer printing"]
  },
  {
    year: "Present",
    company: "Freelance",
    position: "Freelance",
    period: "2022 - Present",
    role: "Graphic Designer",
    description: "Freelance graphic designer specializing in visual identity (logo design) and promotional materials (flyers, posters, banners, and social media content) to support the branding and marketing needs of individuals, organizations, and businesses.",
    tags: ["Logo", "Flyer", "Poster", "Banner", "Social Media Content"]
  }
];