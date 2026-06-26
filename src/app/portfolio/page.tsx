import { AnimatedSection } from '../components/AnimatedSection';

export default function PortfolioPage() {
  return (
    <main className="pt-16">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <AnimatedSection direction="up">
          <h1 className="font-serif text-4xl text-center text-[#1A2744] mb-8">
            Nosso Portfólio
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para clientes em Portugal.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <AnimatedSection key={item} direction="up" delay={item * 0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-[#1A2744] flex items-center justify-center">
                  <span className="text-white text-sm">Projeto {item}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-[#1A2744]">Projeto {item}</h3>
                  <p className="text-gray-600 text-sm">Descrição do projeto...</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}