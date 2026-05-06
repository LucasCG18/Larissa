'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, MonitorPlay, PenTool, Layout, Palette, ArrowRight, BrainCircuit, Play, Aperture } from 'lucide-react';
import Link from 'next/link';

const portfolios = [
  { id: 'j7DxByFrf34', title: 'Vídeo Corporativo Shorts' },
  { id: 'Evsj_mUxZLQ', title: 'Edição Dinâmica Reel' },
  { id: '3ibGE1kw_CY', title: 'Bastidores de Evento' },
  { id: 'J-yHHCeLdQI', title: 'Take Criativo Shorts' },
  { id: 'P3kAhhaBWfY', title: 'Cobertura Audiovisual' },
  { id: 'oYP5PElAFCQ', title: 'Video Institucional (Long Form)' },
];

const galleryImages = [
  '/images/_LIV0577-Aprimorado-NR(1).JPG',
  '/images/_LIV0601-Aprimorado-NR.JPG',
  '/images/_LIV0641-Aprimorado-NR.JPG',
  '/images/_LIV0769-Aprimorado-NR.JPG',
  '/images/Cópia de IMG_1519.jpg',
  '/images/Cópia de IMG_1521.jpg'
];

function VideoCard({ video }: { video: { id: string, title: string } }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLong = video.id.includes('oYP5PElAFCQ');
  
  return (
    <div 
      className="group relative aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(`https://youtube.com/${isLong ? 'watch?v=' : 'shorts/'}${video.id}`, '_blank')}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} 
          alt={video.title} 
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 0 : 0.8 }}
          onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`; }}
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
          <div className="w-full h-full transform scale-[1.7] origin-center">
            {isHovered && (
              <iframe 
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${video.id}`}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover border-0"
              ></iframe>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-30 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none">
        <div className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-4 transition-all transform duration-300 ${isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
          <Play size={20} className="text-white ml-1" fill="currentColor" />
        </div>
        <h3 className={`font-bold text-xl text-white drop-shadow-md transition-all duration-300 ${isHovered ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>{video.title}</h3>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLg = windowWidth >= 1024;
  const isMd = windowWidth >= 768;

    const headerHeight = isMd ? 0 : 72;
    const finalLogoHeight = isMd ? 64 : 48;
    const finalLogoTop = `${(headerHeight - finalLogoHeight) / 2}px`;

    const topTransform = useTransform(scrollY, [0, 500], ["200vh", finalLogoTop]);
    const leftTransform = useTransform(scrollY, [0, 500], ["750%", isLg ? "32px" : "20px"]);
    const xTransform = useTransform(scrollY, [0, 500], ["-50%", "0%"]);
    const yTransform = useTransform(scrollY, [0, 500], ["-50%", "0%"]);
    const scaleTransform = useTransform(scrollY, [0, 500], [isMd ? 3.4 : 2.6, 1]);

  return (
    <main className="flex-1 w-full overflow-x-hidden bg-[#202020] text-white min-h-screen">
      {/* Logo Animado (Substitui o da nav estática) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
        <motion.div 
          style={{ 
            position: "absolute",
            top: topTransform,
            left: leftTransform,
            x: xTransform,
            y: yTransform,
            scale: scaleTransform,
            transformOrigin: "top left"
          }}
          className="pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/images/sem fundo 2.png"
            alt="Luma Produções"
            className="h-30 md:h-36 w-auto object-contain drop-shadow-2xl"
            />
        </motion.div>
      </div>

      {/* NavBar Fixa e com Fundo Escuro para Leitura */}
      <nav className="fixed top-0 left-0 w-full h-16 md:h-[72px] px-6 lg:px-24 flex justify-end items-center z-[90] bg-[#202020]/95 backdrop-blur-xl border-b border-white/5 shadow-lg">
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider mt-1">
          <a href="#sobre" className="hover:text-white transition-colors drop-shadow-md">SOBRE</a>
          <a href="#habilidades" className="hover:text-white transition-colors drop-shadow-md">HABILIDADES</a>
          <a href="#portfolio" className="hover:text-white transition-colors drop-shadow-md">PORTFÓLIO</a>
          <a href="#contato" className="hover:text-white transition-colors drop-shadow-md">CONTATO</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-24 overflow-hidden pt-20">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#563b8b] rounded-full blur-[150px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#563b8b] rounded-full blur-[120px] opacity-30 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="z-10 max-w-4xl mx-auto text-center mt-32 md:mt-40 w-full flex flex-col items-center justify-center">
          <div className="h-32 md:h-40 w-full" /> 
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Produtora de <span className="text-[#563b8b] italic">Impacto</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-10 font-playfair italic"
          >
            Pronto para criar algo incrível?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#portfolio" className="inline-flex items-center gap-2 bg-[#563b8b] text-white px-8 py-4 rounded-full font-medium hover:bg-[#462d73] transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(86,59,139,0.5)]">
              Ver Trabalhos <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Nossa Jornada */}
      <section id="sobre" className="py-24 bg-white text-[#202020] px-6 lg:px-24 relative z-20 pt-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#563b8b]"></div>
              <h2 className="font-playfair text-4xl font-bold text-[#563b8b]">Nossa História</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Olá! Eu sou a Larissa, a pessoa por trás da Luma Filmes. E por aqui eu acredito que cada história merece ser contada de um jeito único.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sou apaixonada por transformar momentos em memórias que realmente fazem sentido, sabe daquelas que você sente de novo toda vez que vê?
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Trabalhamos com fotografia, filmagem e edição de vídeos para casamentos, eventos e pequenos negócios que querem se mostrar de forma autêntica, sem perder a essência.
            </p>
            <p className="text-xl text-gray-800 leading-relaxed font-playfair italic font-bold">
              Pronto para criar algo incrível?
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-200 rounded-[2rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-[#563b8b]/10 mix-blend-multiply z-10 transition-opacity hover:opacity-0 pointer-events-none"></div>
              <img src="/images/_LIV0702-Aprimorado-NR.JPG" alt="Nossa Jornada - Claquete" className="object-cover w-full h-full grayscale-0 hover:scale-105 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#563b8b] rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#202020] rounded-full mix-blend-multiply filter blur-2xl opacity-10 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Habilidades & Experiência */}
      <section id="habilidades" className="py-24 px-6 lg:px-24 bg-zinc-50 text-[#202020] relative z-20 pt-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Expertise <span className="text-[#563b8b]">&</span> Skills</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tudo que é necessário para construir uma marca forte e presencial do planejamento à execução audiovisual.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Camera, title: "Gravação Corporativa", desc: "Gravação de vídeos corporativos e cobertura de eventos com olhar estratégico." },
              { icon: Layout, title: "Gestão de Redes Sociais", desc: "Planejamento e gerenciamento, garantindo posicionamento adequado da marca." },
              { icon: MonitorPlay, title: "Design & Edição", desc: "Design e edição de vídeos focado em performance, dinamismo e audiência." },
              { icon: PenTool, title: "Criação & Roteiros", desc: "Roteiros criativos para plataformas sociais e vídeos comerciais." },
              { icon: Palette, title: "Storymaker", desc: "Registro de eventos e produção de conteúdo em tempo real pronto para postar." },
              { icon: BrainCircuit, title: "Planejamento de Marketing", desc: "Imersão, análise de mercado e execução estratégica baseada em StoryBrand." }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col transition-all cursor-default"
              >
                <div className="w-14 h-14 bg-[#563b8b]/10 rounded-2xl flex items-center justify-center mb-6 text-[#563b8b]">
                  <skill.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl mb-3">{skill.title}</h3>
                <p className="text-gray-600 flex-1">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos Adicional */}
      <section className="py-24 px-6 lg:px-24 bg-white text-[#202020] border-t border-zinc-100 relative z-20 pt-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Galeria de <span className="text-[#563b8b]">Imagens</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Olhares por trás das câmeras e frames de nossas produções e coberturas.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, idx) => (
              <motion.div 
                key={idx} 
                className="break-inside-avoid relative rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => window.open(src, '_blank')}
              >
                <img src={src} key={idx} alt="Galeria Luma Produções" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#563b8b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trabalhos Video Section */}
      <section id="portfolio" className="py-24 px-6 lg:px-24 bg-[#202020] relative z-20 pt-32">
        <div className="max-w-6xl mx-auto z-10 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white">Últimos <span className="text-[#563b8b]">Trabalhos</span></h2>
              <p className="text-gray-400">Passe o mouse por cima para reproduzir a prévia.</p>
            </div>
            <Link href="https://youtube.com/shorts/j7DxByFrf34" target="_blank" className="text-white hover:text-[#563b8b] flex items-center gap-2 border-b border-white/30 hover:border-[#563b8b] pb-1 transition-all w-max py-2">
              Ver no YouTube <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((video, idx) => (
              <VideoCard key={idx} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-24 px-6 lg:px-24 bg-[#563b8b] text-white relative z-20 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/images/Logo 2.jpeg" alt="Luma Logo Inverted" className="mx-auto mb-8 w-100 h-100 object-cover rounded-full shadow-2xl mix-blend-lighten" />
          <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-8">Vamos Trabalhar <br /> <span className="italic font-light">Juntos!</span></h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light">
            Nós estamos sempre prontos para novos desafios e para aplicar nossa criatividade em projetos inovadores.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:contatolumafilmes1@gmail.com" className="bg-white text-[#563b8b] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform w-full sm:w-auto shadow-xl">
              contatolumafilmes1@gmail.com
            </a>
            <a href="https://wa.me/5512996696301" target="_blank" className="bg-[#202020] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform border border-transparent hover:border-white/20 w-full sm:w-auto shadow-xl">
              (12) 99669-6301
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#202020] text-white/50 text-center py-8 text-sm font-medium border-t border-white/5 relative z-20">
        <p>&copy; 2026 Luma Produções. Todos os direitos reservados.</p>
        <p className="mt-2 text-white/30">Nós damos vida à sua visão.</p>
      </footer>
    </main>
  );
}
