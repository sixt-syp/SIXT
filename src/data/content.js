import pedroImg from '../assets/team/pedro.jpg'
import gabrielImg from '../assets/team/gabriel.jpg'
import sarahImg from '../assets/team/sarah.jpg'
import jardelImg from '../assets/team/jardel.jpg'
import amandaImg from '../assets/team/amanda.jpg'
import alissonImg from '../assets/team/alisson.jpg'

export const TAGLINE = 'Entender antes de criar.'

export const PROMISE =
  'Criamos uma presença digital profissional, alinhada ao seu negócio e preparada para gerar oportunidades.'

export const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
]

export const HERO = {
  titleLine1: 'CRIAR A COISA CERTA',
  titleLine2Plain: 'É O QUE IMPORTA PRA GENTE.',
  description:
    'A SIXT transforma necessidades de negócios em soluções digitais. Antes de criar, a gente entende o problema, encontra o que realmente importa e constrói a solução certa.',
  ctaPrimary: { label: 'Vamos conversar', href: '#contato' },
  ctaSecondary: { label: 'Ver metodologia', href: '#movimento' },
}

export const SERVICES_HEADER = {
  titlePlain: 'Nem todo negócio ',
  titleAccent: 'precisa de tudo.',
  description:
    'Não vendemos aquilo que sabemos fazer. Primeiro entendemos o que a sua empresa realmente precisa, depois definimos a solução.',
}

export const SERVICES = [
  {
    number: '01',
    icon: 'strategy',
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
    price: 'Consultoria técnica — R$ 800',
  },
  {
    number: '02',
    icon: 'palette',
    title: 'Identidade Visual',
    tagline: 'Uma marca que transmite confiança.',
    description:
      'Da identidade essencial ao rebranding completo: criamos ou reformulamos a forma como a sua empresa se apresenta: coerente, profissional e alinhada ao negócio.',
    items: [
      'Essencial — R$ 1.800',
      'Completa — R$ 3.500',
      'Rebranding — R$ 4.500',
    ],
  },
  {
    number: '03',
    icon: 'browser',
    title: 'Criação de Sites',
    tagline: 'Presença digital pronta para gerar oportunidades.',
    description:
      'Nosso produto de entrada. Mais do que páginas bonitas: uma estrutura digital clara e profissional, compatível com o tamanho do seu negócio.',
    items: [
      'Landing Page — R$ 2.200',
      'Site Institucional — R$ 4.500',
      'Catálogo Digital — R$ 6.500',
      'E-commerce — sob escopo',
    ],
  },
  {
    number: '04',
    icon: 'refresh',
    title: 'Automações & Integrações',
    tagline: 'Tecnologia que devolve tempo.',
    description:
      'Automatizamos apenas o que faz sentido: tarefas repetitivas, retrabalho e processos que consomem tempo e travam o crescimento.',
    items: [
      'Captação & atendimento',
      'Agendamento & follow-up',
      'Integrações entre ferramentas',
    ],
  },
]

export const MOVEMENT_HEADER = {
  titlePlain: 'O problema vem ',
  titleAccent: 'antes da solução.',
  description:
    'Entender → Diagnosticar → Definir → Construir → Evoluir. Cinco etapas que evitam a solução errada.',
}

export const MOVEMENT_STEPS = [
  {
    id: 'entender',
    label: 'Entender',
    state: 'dot',
    text: 'Conhecer o negócio, os objetivos, o público e o momento atual. Nenhuma solução começa sem isso.',
  },
  {
    id: 'diagnosticar',
    label: 'Diagnosticar',
    state: 'pair',
    text: 'Encontrar problemas, gargalos e oportunidades. Nem todo problema é o que parece à primeira vista.',
  },
  {
    id: 'definir',
    label: 'Definir',
    state: 'core',
    text: 'Decidir o que realmente faz sentido para este negócio. Nem todo cliente precisa de tudo.',
  },
  {
    id: 'construir',
    label: 'Construir',
    state: 'ring',
    text: 'Executar com escopo claro, prazo definido e qualidade de quem assina embaixo.',
  },
  {
    id: 'evoluir',
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
  titlePlain: 'Pessoas que pensam ',
  titleAccent: 'junto com você.',
  description:
    'Diferentes conhecimentos, um mesmo jeito de trabalhar: entender primeiro, criar depois.',
}

export const CONTACT = {
  titlePlain: 'VAMOS ',
  titleAccent: 'CONVERSAR.',
  description:
    'Conte como o seu negócio funciona hoje. A gente ajuda a descobrir o que realmente precisa ser resolvido — e a melhor forma de resolver.',
  cta: 'Começar meu projeto',
}

export const FOOTER = {
  description:
    'Soluções digitais orientadas ao negócio: branding, sites e tecnologia para micro e pequenas empresas.',
  signature: 'Entender antes de criar.',
}

export const TEAM = [
  {
    name: 'Pedro Brito de Matos',
    photo: pedroImg,
    bio: 'Responsável por definir a estrutura dos projetos, organizar as prioridades e garantir a qualidade do desenvolvimento da equipe.',
    linkedin: 'https://www.linkedin.com/in/pedropepeuhenrique/',
    github: 'https://github.com/PedroPEPEUHenrique',
  },
  {
    name: 'Gabriel Caravalho de Souza',
    photo: gabrielImg,
    bio: 'Responsável pela criação de automações e organização de dados para melhorar processos e apoiar as análises do negócio.',
    linkedin: 'https://www.linkedin.com/in/xubous/',
    github: 'https://github.com/xubous',
  },
  {
    name: 'Sarah Eliziário de Brito',
    photo: sarahImg,
    bio: 'Responsável pelo atendimento aos clientes e pela organização das informações e documentos dos projetos.',
    linkedin:
      'https://www.linkedin.com/in/saraheliziariobrito?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/SarahEliziario',
  },
  {
    name: 'Luiz Jardel do Nascimento',
    photo: jardelImg,
    bio: 'Responsável pelo desenvolvimento das funcionalidades dos projetos e pelo apoio na edição de vídeos para o marketing.',
    linkedin: 'https://www.linkedin.com/in/luiz-jardel/',
    github: 'https://github.com/luizjardel',
  },
  {
    name: 'Amanda Inagaki',
    photo: amandaImg,
    bio: 'Responsável pelo desenvolvimento visual dos projetos, identidade da marca e criação de materiais para redes sociais e apresentação.',
    linkedin: 'https://www.linkedin.com/in/amanda-inagaki',
    github: 'https://github.com/inagakidev',
  },
  {
    name: 'Alisson Gonçalves Costa',
    photo: alissonImg,
    bio: 'Responsável pelo desenvolvimento e estrutura dos projetos, contribuindo na construção e revisão das soluções digitais.',
    linkedin: 'https://www.linkedin.com/in/alisson-costa-129015193/',
    github: 'https://github.com/AlissonGCosta',
  },
]

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
