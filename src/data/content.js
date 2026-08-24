import pedroImg from '../assets/team/pedro.jpg'
import gabrielImg from '../assets/team/gabriel.jpg'
import sarahImg from '../assets/team/sarah.jpg'
import jardelImg from '../assets/team/jardel.jpg'
import amandaImg from '../assets/team/amanda.jpg'
import alissonImg from '../assets/team/alisson.jpg'

export const TAGLINE = 'Entender antes de criar.'

export const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Método', href: '#movimento' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
]

export const HERO = {
  eyebrow: 'Estúdio de tecnologia e design',
  titleLine1: 'CRIAR A COISA CERTA',
  titleLine2Plain: 'É O QUE IMPORTA PRA GENTE.',
  description:
    'A SIXT transforma necessidades de negócio em soluções digitais. Antes de criar, a gente entende o problema, encontra o que realmente importa e constrói a solução certa.',
  ctaPrimary: { label: 'Vamos conversar', href: '#contato' },
  ctaSecondary: { label: 'Ver metodologia', href: '#movimento' },
  stats: [
    { value: '06', label: 'especialistas' },
    { value: '05', label: 'etapas de método' },
    { value: '04', label: 'frentes de solução' },
  ],
}

/* Faixa de pilares — seis círculos sobre a dobra do hero */
export const PILLARS = [
  { id: 'estrategia', icon: 'compass', label: 'Estratégia' },
  { id: 'branding', icon: 'palette', label: 'Branding' },
  { id: 'design', icon: 'layout', label: 'Design' },
  { id: 'dev', icon: 'code', label: 'Desenvolvimento' },
  { id: 'automacao', icon: 'refresh', label: 'Automação' },
  { id: 'dados', icon: 'chart', label: 'Dados' },
]

export const SERVICES_HEADER = {
  label: '01 — Serviços',
  titlePlain: 'Nem todo negócio ',
  titleAccent: 'precisa de tudo.',
  description:
    'Não vendemos aquilo que sabemos fazer. Primeiro entendemos o que a sua empresa realmente precisa, depois definimos a solução.',
}

export const SERVICES = [
  {
    number: '01',
    icon: 'strategy',
    visual: 'scan',
    title: 'Diagnóstico da Marca',
    tagline: 'Antes da solução, o problema.',
    description:
      'Analisamos marca, comunicação, presença digital e processos para revelar onde está o problema, quais oportunidades existem e o que deve ser priorizado.',
    items: [
      'Marca & posicionamento',
      'Site & presença digital',
      'Jornada do cliente',
      'Processos & eficiência',
    ],
    cta: { label: 'Quero um diagnóstico', href: '#contato' },
  },
  {
    number: '02',
    icon: 'palette',
    visual: 'brand',
    title: 'Identidade Visual',
    tagline: 'Uma marca que transmite confiança.',
    description:
      'Da identidade essencial ao rebranding completo: criamos ou reformulamos a forma como a sua empresa se apresenta — coerente, profissional e alinhada ao negócio.',
    items: ['Essencial', 'Completa', 'Rebranding'],
    cta: { label: 'Construir minha marca', href: '#contato' },
  },
  {
    number: '03',
    icon: 'browser',
    visual: 'site',
    title: 'Criação de Sites',
    tagline: 'Presença digital pronta para gerar oportunidades.',
    description:
      'Nosso produto de entrada. Mais do que páginas bonitas: uma estrutura digital clara e profissional, compatível com o tamanho do seu negócio.',
    items: [
      'Landing Page',
      'Site Institucional',
      'Catálogo Digital',
      'E-commerce',
    ],
    cta: { label: 'Quero meu site', href: '#contato' },
  },
  {
    number: '04',
    icon: 'refresh',
    visual: 'flow',
    title: 'Automações & Integrações',
    tagline: 'Tecnologia que devolve tempo.',
    description:
      'Automatizamos apenas o que faz sentido: tarefas repetitivas, retrabalho e processos que consomem tempo e travam o crescimento.',
    items: [
      'Captação & atendimento',
      'Agendamento & follow-up',
      'Integrações entre ferramentas',
    ],
    cta: { label: 'Automatizar processos', href: '#contato' },
  },
]

export const MOVEMENT_HEADER = {
  label: '02 — Metodologia',
  titlePlain: 'O problema vem ',
  titleAccent: 'antes da solução.',
  description:
    'Cinco etapas que evitam a solução errada — do primeiro contato à evolução contínua.',
  cta: { label: 'Começar pelo diagnóstico', href: '#contato' },
}

export const MOVEMENT_STEPS = [
  {
    id: 'entender',
    step: '01',
    label: 'Entender',
    state: 'dot',
    text: 'Conhecer o negócio, os objetivos, o público e o momento atual. Nenhuma solução começa sem isso.',
  },
  {
    id: 'diagnosticar',
    step: '02',
    label: 'Diagnosticar',
    state: 'pair',
    text: 'Encontrar problemas, gargalos e oportunidades. Nem todo problema é o que parece à primeira vista.',
  },
  {
    id: 'definir',
    step: '03',
    label: 'Definir',
    state: 'core',
    text: 'Decidir o que realmente faz sentido para este negócio. Nem todo cliente precisa de tudo.',
  },
  {
    id: 'construir',
    step: '04',
    label: 'Construir',
    state: 'ring',
    text: 'Executar com escopo claro, prazo definido e qualidade de quem assina embaixo.',
  },
  {
    id: 'evoluir',
    step: '05',
    label: 'Evoluir',
    state: 'solid',
    text: 'Manter, melhorar, automatizar e expandir. Entregar o projeto é começar a relação.',
  },
]

export const MANIFESTO = {
  line1Plain: 'CRIAR MAIS NÃO',
  line1Accent: 'SIGNIFICA RESOLVER MAIS.',
  line2Plain: 'PRIMEIRO A GENTE ENTENDE.',
  line2Accent: 'DEPOIS A GENTE CRIA.',
  body: 'A SIXT acredita que criar por criar não resolve nada. Antes de um site, existe um negócio. Antes de uma identidade, existe uma história. Antes de uma ferramenta, existe um problema. Por isso, a gente começa entendendo e usa estratégia, design e tecnologia para transformar isso em algo concreto.',
  principles: ['Entender', 'Criar', 'Evoluir'],
}

export const TEAM_HEADER = {
  label: '03 — Equipe',
  titlePlain: 'Pessoas que pensam ',
  titleAccent: 'junto com você.',
  description:
    'Seis fundadores, seis especialidades e um mesmo jeito de trabalhar: entender primeiro, criar depois.',
  cta: { label: 'Falar com a equipe', href: '#contato' },
}

export const TEAM = [
  {
    name: 'Amanda Inagaki',
    role: 'CEO & Founder',
    area: 'Direção',
    photo: amandaImg,
    bio: 'Lidera a direção da SIXT e o relacionamento com os clientes. Garante que cada projeto nasça alinhado ao negócio — do primeiro diagnóstico à entrega final.',
    linkedin: 'https://www.linkedin.com/in/amanda-inagaki',
    github: 'https://github.com/inagakidev',
  },
  {
    name: 'Pedro Brito de Matos',
    role: 'CTO, Tech Lead & Founder',
    area: 'Tecnologia',
    photo: pedroImg,
    bio: 'Define a arquitetura dos projetos, organiza as prioridades técnicas e sustenta o padrão de qualidade de tudo o que a equipe entrega.',
    linkedin: 'https://www.linkedin.com/in/pedropepeuhenrique/',
    github: 'https://github.com/PedroPEPEUHenrique',
  },
  {
    name: 'Sarah Eliziário de Brito',
    role: 'CMO & Co-founder',
    area: 'Marketing',
    photo: sarahImg,
    bio: 'Conduz a comunicação e o posicionamento da SIXT. Traduz o que fazemos para o mercado e mantém a relação com o cliente próxima e organizada.',
    linkedin:
      'https://www.linkedin.com/in/saraheliziariobrito?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/SarahEliziario',
  },
  {
    name: 'Gabriel Carvalho de Souza',
    role: 'Data Analytics & Co-founder',
    area: 'Dados',
    photo: gabrielImg,
    bio: 'Transforma dado em decisão: cria automações, organiza indicadores e mostra o que realmente move o resultado de cada projeto.',
    linkedin: 'https://www.linkedin.com/in/xubous/',
    github: 'https://github.com/xubous',
  },
  {
    name: 'Luiz Jardel do Nascimento',
    role: 'Software Engineer & Co-founder',
    area: 'Engenharia',
    photo: jardelImg,
    bio: 'Desenvolve as funcionalidades que sustentam os projetos e apoia a produção audiovisual da marca, do roteiro à edição.',
    linkedin: 'https://www.linkedin.com/in/luiz-jardel/',
    github: 'https://github.com/luizjardel',
  },
  {
    name: 'Alisson Gonçalves Costa',
    role: 'Software Engineer & Co-founder',
    area: 'Engenharia',
    photo: alissonImg,
    bio: 'Constrói e revisa a estrutura das soluções digitais, garantindo código sustentável e entregas consistentes a cada ciclo.',
    linkedin: 'https://www.linkedin.com/in/alisson-costa-129015193/',
    github: 'https://github.com/AlissonGCosta',
  },
]

export const CONTACT = {
  label: '04 — Contato',
  titlePlain: 'VAMOS ',
  titleAccent: 'CONVERSAR.',
  description:
    'Conte como o seu negócio funciona hoje. A gente ajuda a descobrir o que realmente precisa ser resolvido — e a melhor forma de resolver.',
  cta: 'Começar meu projeto',
  bullets: [
    'Diagnóstico antes de qualquer proposta',
    'Escopo, prazo e valor definidos por escrito',
    'Acompanhamento depois da entrega',
  ],
}

export const FOOTER = {
  description:
    'Soluções digitais orientadas ao negócio: branding, sites e tecnologia para micro e pequenas empresas.',
  signature: 'Entender antes de criar.',
}

export const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sixtch?igsi=MXdndjI4and1aXprbA==',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/sixt-syp',
    external: true,
  },
  {
    label: 'E-mail',
    href: 'mailto:codesixtech@gmail.com',
    external: false,
  },
]
