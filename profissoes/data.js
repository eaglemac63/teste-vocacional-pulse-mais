// Dados do Teste Vocacional de Profissão — Pulse Mais
// Extraído do documento original (20 perguntas + perfis A/B/C/D)

const TEST = {
  letters: ["a", "b", "c", "d"],
  colors: { a: "#f0574d", b: "#f0a83d", c: "#3dbf7e", d: "#4472f0" },

  meta: {
    testName: "Teste Vocacional - Profissões",
    subtitle: "Descubra as áreas e profissões mais afins à sua personalidade. Leva cerca de 10 minutos.",
    pdfHeading: "Teste Vocacional de Profissão",
    fileBase: "teste-vocacional-profissoes",
    homeHref: "../index.html",
    otherHref: "../carreiras/index.html",
    otherLabel: "Fazer o Teste de Carreiras"
  },

  questions: [
    { n: 1, text: "Na escola você prefere/preferia assuntos ligados a:", options: {
      a: "Arte, esportes e atividades extracurriculares",
      b: "Biologia e genética",
      c: "Ciências humanas, idiomas",
      d: "Ciências exatas"
    }},
    { n: 2, text: "Você prefere levar sua vida:", options: {
      a: "Com pouca rotina e poucas regras",
      b: "Com regras definidas e disciplina",
      c: "Interagindo com todo tipo de pessoa",
      d: "Com muita autonomia: “na sua”"
    }},
    { n: 3, text: "Você se descreveria como uma pessoa:", options: {
      a: "Impulsiva e um tanto aventureira",
      b: "Cautelosa e responsável",
      c: "Entusiasmada e muito amiga",
      d: "Calma e diferente da maioria"
    }},
    { n: 4, text: "Você se considera uma pessoa:", options: {
      a: "Prática e hábil para improvisar",
      b: "Batalhadora que sabe o que quer",
      c: "Preocupada com questões humanas",
      d: "Capacitada para criar e inventar"
    }},
    { n: 5, text: "De quais características suas sente orgulho:", options: {
      a: "Audácia e facilidade para lidar com o inesperado",
      b: "Senso de dever e capacidade de dar o exemplo",
      c: "Idealismo e disposição para compreender os outros",
      d: "Engenhosidade e rapidez mental"
    }},
    { n: 6, text: "Costuma confiar mais em:", options: {
      a: "Percepção imediata",
      b: "Costumes e tradições",
      c: "Intuição",
      d: "Razão e lógica"
    }},
    { n: 7, text: "Quase sempre você gosta de:", options: {
      a: "Causar impacto: os “holofotes” o atraem",
      b: "Ser visto como membro valioso de um grupo",
      c: "Sonhar em transformar o mundo",
      d: "Desvendar um enigma ou inventar algo útil"
    }},
    { n: 8, text: "A vida é mais interessante quando você tem:", options: {
      a: "Desafios, situações cambiantes",
      b: "Segurança, emprego garantido, integração social",
      c: "Possibilidade de fazer algo para mudar o mundo",
      d: "Possibilidade de ir além do que já é conhecido"
    }},
    { n: 9, text: "Você gostaria de ser:", options: {
      a: "Um craque na profissão que escolher",
      b: "Um executivo bem-sucedido",
      c: "Um profissional de prestígio",
      d: "Um especialista ou cientista"
    }},
    { n: 10, text: "Você é muito bom lidando com:", options: {
      a: "Ferramentas, instrumentos e equipamentos",
      b: "Controle do tempo, comando e execução",
      c: "Pessoas de todos os níveis culturais e sociais",
      d: "Sistemas e construção (material ou mental)"
    }},
    { n: 11, text: "Antes de agir, você analisa:", options: {
      a: "As vantagens imediatas",
      b: "As experiências já vividas",
      c: "As possibilidades futuras",
      d: "As condições e consequências"
    }},
    { n: 12, text: "Gosta quando as pessoas:", options: {
      a: "O surpreendem com um presente",
      b: "Expressam gratidão por algo que fez",
      c: "Reconhecem sua personalidade singular",
      d: "Reconhecem sua inteligência"
    }},
    { n: 13, text: "Você costuma abraçar um novo projeto:", options: {
      a: "Com a cara e a coragem",
      b: "Guiado pela experiência",
      c: "Confiando na intuição e na criatividade",
      d: "Depois de verificar todas as variáveis"
    }},
    { n: 14, text: "Geralmente você prefere agir:", options: {
      a: "No calor do momento",
      b: "Com segurança, conforme o costume",
      c: "Quando está inspirado",
      d: "Quando um problema o desafia"
    }},
    { n: 15, text: "Você fica motivado quando:", options: {
      a: "Tem oportunidade de superar obstáculos",
      b: "Experimenta estabilidade na vida profissional, sabe em que terreno está pisando",
      c: "Harmonia e inspiração guiam a atividade",
      d: "Há liberdade para projetar o futuro"
    }},
    { n: 16, text: "Em atividades de grupo, você prefere:", options: {
      a: "As desafiadoras que exigem ação rápida",
      b: "Administrar os recursos disponíveis",
      c: "Motivar pessoas para darem o melhor de si",
      d: "Descartar algo que não funciona"
    }},
    { n: 17, text: "Liderar é uma atividade que gosta de exercer:", options: {
      a: "Por pouco tempo, dependendo da situação",
      b: "Quando pode comandar do começo ao fim",
      c: "Quando é preciso identificar e reunir talentos",
      d: "Quando o raciocínio estratégico é necessário"
    }},
    { n: 18, text: "Em uma escola, você gostaria de ser:", options: {
      a: "Professor de educação física",
      b: "Diretor",
      c: "Professor de literatura",
      d: "Professor de matemática ou física"
    }},
    { n: 19, text: "É um elogio quando se referem a você como:", options: {
      a: "Corajoso, otimista e divertido",
      b: "Cauteloso, responsável e aplicado",
      c: "Harmonizador, íntegro e sábio",
      d: "Uma mente brilhante"
    }},
    { n: 20, text: "Frases que tem a ver com você:", options: {
      a: "“Deixo a vida me levar”",
      b: "“Manda quem pode, obedece quem tem juízo”",
      c: "“Para seu próprio interesse, seja verdadeiro”",
      d: "“Penso, logo existo”"
    }}
  ],

  profiles: {
    A: {
      label: "Tipo A",
      title: "Ação e Movimento",
      text: "A principal característica dos tipos A é o movimento. Gostam de ação e de novidades. Apresentam destreza física e boa expressão corporal. Se forem mais propensos ao raciocínio lógico, terão mais êxito em profissões que requeiram precisão e acuidade. Se forem mais inclinados aos sentimentos e à emoção, as profissões relacionadas ao trato com pessoas são as mais indicadas. Pessoas do tipo A não gostam de rotina e veem o trabalho como uma grande fonte de prazer.",
      careers: ["Esportista","Anestesista","Artista plástico","Ator","Chef de cozinha","Cineasta","Cirurgião","Coreógrafo","Dançarino","Dermatologista","Estilista","Fotógrafo","Guia de turismo","Instrumentador cirúrgico","Instrutor de voo","Jornalista","Médico clínico","Músico","Paisagista","Personal trainer","Personal stylist","Piloto","Publicitário","Relações públicas","Roteirista"]
    },
    B: {
      label: "Tipo B",
      title: "Comando e Responsabilidade",
      text: "Comando e responsabilidade são duas palavras que definem as pessoas do tipo B. Elas gostam de lidar com fatos, quantidades, análise, organização e planejamento, trabalham duro e preferem profissões que lhes proporcionem status e possibilidade de crescimento. São as mais presentes do mundo corporativo.",
      careers: ["Administrador de empresas","Advogado","Assistente social","Bibliotecário","Delegado","Engenheiro","Mecânico/Químico","Juiz de direito","Pastor/Padre/Rabino","Policial","Promotor público"]
    },
    C: {
      label: "Tipo C",
      title: "Relações Humanas e Intuição",
      text: "Facilmente reconhecíveis por seu entusiasmo e interesse nas relações humanas, as pessoas do tipo C têm na intuição o seu ponto forte. Muitas endereçam seu esforço e talento para o desenvolvimento intelectual de alunos e discípulos e o conforto psicológico de pacientes e colegas de trabalho. No grupo dos tipos C, estão as personalidades mais laureadas com o Nobel da Paz e de Literatura.",
      careers: ["Artista plástico","Dramaturgo","Educador","Escritor","Filósofo","Jornalista","Pedagogo","Professor","Psicólogo","Sociólogo","Terapeuta ocupacional","Tradutor"]
    },
    D: {
      label: "Tipo D",
      title: "Ciência e Tecnologia",
      text: "São intuitivos como os C, mas, em vez de se preocupar com pessoas, costumam focar seus interesses em grandes áreas do conhecimento, como ciência e tecnologia. Apresentam notável capacidade para identificar problemas concretos e resolvê-los, bem como para o raciocínio abstrato.",
      careers: ["Analista de sistemas","Antropólogo","Arquiteto","Astrônomo","Criador de software","Designer industrial","Economista","Engenheiro","Físico","Líder de uma corporação","Matemático","Militar","Oceanógrafo","Pesquisador","Químico","Músico","Urbanista","Zoólogo"]
    }
  }
};
