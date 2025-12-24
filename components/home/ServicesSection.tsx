// /components/home/ServicesSection.tsx
import { FiPenTool, FiFileText, FiMonitor, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      icon: <FiPenTool className="text-sky-600 dark:text-sky-400 text-xl sm:text-2xl" />,
      title: "Graphic Design",
      description: "Logo, flyer, poster, banner, and social media content with attractive and professional designs.",
      features: ["Logo & Brand Identity", "Social Media Design", "Print Materials"],
      gradient: "from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30"
    },
    {
      icon: <FiFileText className="text-sky-600 dark:text-sky-400 text-xl sm:text-2xl" />,
      title: "Microsoft Office",
      description: "Document processing, spreadsheets, and presentations with Microsoft Office.",
      features: ["Word Document Formatting", "Excel Data Analysis", "PowerPoint Presentation"],
      gradient: "from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30"
    },
    {
      icon: <FiMonitor className="text-sky-600 dark:text-sky-400 text-xl sm:text-2xl" />,
      title: "IT Support",
      description: "Computer maintenance, troubleshooting, system setup, and technology solutions for your business.",
      features: ["Computer Maintenance", "Software Installation", "Troubleshooting"],
      gradient: "from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30"
    }
  ];

  return (
    <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-slate-100">
          Professional Services
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
          Complete solutions for your graphic design and technology needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>

      <div className="text-center mt-8 sm:mt-12">
        <Link
          href="/about"
          className="inline-flex items-center text-sm sm:text-base text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium group"
        >
          Learn more about my services
          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

function ServiceCard({ service }: any) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg 
    dark:shadow-slate-900/50 hover:shadow-xl dark:hover:shadow-slate-900 
      transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group border border-slate-100 dark:border-slate-700">
      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {service.icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-slate-100">
        {service.title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6">
        {service.description}
      </p>
      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {service.features.map((feature: string, idx: number) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}