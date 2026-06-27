import { Navbar } from '../components/Navbar';
import { AnimatedSection } from '../components/AnimatedSection';

export default function ServicosPage() {
  const services = [
    {
      title: "Web Design Premium",
      description: "Criação de websites com design exclusivo, focado na experiência do utilizador e na identidade da sua marca.",
      icon: "🎨"
    },
    {
      title: "Desenvolvimento Web",
      description: "Desenvolvimento de sites rápidos, seguros e otimizados com as mais recentes tecnologias (Next.js, React, TypeScript).",
      icon: "💻"
    },
    {
      title: "Landing Pages",
      description: "Páginas de conversão otimizadas para captar leads e promover os seus produtos ou serviços.",
      icon: "🚀"
    },
    {
      title: "Manutenção e Suporte",
      description: "Suporte contínuo, atualizações de segurança e melhorias de performance para o seu site.",
      icon: "🔧"
    },
    {
      title: "SEO & Performance",
      description: "Otimização para motores de busca e melhoria da velocidade de carregamento do seu site.",
      icon: "📈"
    },
    {
      title: "Integrações API",
      description: "Integração com ferramentas externas, Google Sheets, CMS e outras APIs.",
      icon: "🔗"
    }
  ];

  return (
    <main className="bg-[#F5F0E8] min-h-screen">  {/* ← FUNDO ADICIONADO */}
      <Navbar />  {/* ← NAVBAR ADICIONADA */}
      <section className="pt-24 max-w-6xl mx-auto px-4 py-12">
        <AnimatedSection direction="up">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A2744] text-center mb-4">
            Meus Serviços
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Ofereço soluções digitais para o seu negócio.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-serif text-xl text-[#1A2744] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
}