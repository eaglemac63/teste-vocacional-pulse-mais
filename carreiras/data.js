// Dados do Teste Vocacional de Carreira — Pulse Mais
// Extraído do documento original (17 perguntas + perfis A/B/C/D/E)

const TEST = {
  letters: ["a", "b", "c", "d", "e"],
  colors: { a: "#f0574d", b: "#f0a83d", c: "#3dbf7e", d: "#4472f0", e: "#9b59b6" },

  meta: {
    testName: "Teste Vocacional - Carreiras",
    subtitle: "Descubra quais carreiras mais combinam com você e com sua personalidade. Leva cerca de 10 minutos.",
    pdfHeading: "Teste Vocacional de Carreira",
    fileBase: "teste-vocacional-carreiras",
    homeHref: "../index.html",
    otherHref: "../profissoes/index.html",
    otherLabel: "Fazer o Teste de Profissões"
  },

  questions: [
    { n: 1, text: "Quando penso numa profissão, o mais importante para mim é:", options: {
      a: "Obter um bom retorno financeiro e ser bem-sucedido.",
      b: "Trabalhar em algo que esteja em evidência no mercado.",
      c: "Fazer algo que gosto, independente do retorno financeiro.",
      d: "Ser muito bem-sucedido financeiramente.",
      e: "Poder atuar em minha comunidade."
    }},
    { n: 2, text: "Das viagens abaixo, qual seria considerada por você como a viagem perfeita?", options: {
      a: "Conhecer os castelos antigos da Europa e visitar os museus.",
      b: "Surf e aventuras radicais na Austrália.",
      c: "Compras e conforto, viajando pelos Estados Unidos.",
      d: "Conhecer as particularidades da cultura asiática no Japão.",
      e: "Descansar com a família em uma ilha paradisíaca."
    }},
    { n: 3, text: "A pessoa da sua família que você mais admira:", options: {
      a: "Estudou bastante e possui uma posição de destaque no mercado de trabalho.",
      b: "É aventureira e viaja bastante.",
      c: "Curte a vida e está sempre descobrindo coisas novas.",
      d: "É bastante criativa e está sempre com novidades.",
      e: "Se dedica a algum trabalho de ajuda ao próximo."
    }},
    { n: 4, text: "Se eu tivesse que montar uma empresa hoje, esta empresa seria:", options: {
      a: "Uma empresa baseada em algo de meu interesse pessoal como um passatempo ou atividade que pratico.",
      b: "Uma empresa direcionada às tendências atuais do mercado, independentemente da área de atividade.",
      c: "Uma empresa familiar onde eu pudesse trabalhar perto de meus amigos e familiares.",
      d: "Uma empresa tradicional, com produtos ou serviços conservadores e de fácil comercialização.",
      e: "Uma empresa criativa onde eu pudesse arriscar e desenvolver novas ideias."
    }},
    { n: 5, text: "Qual país abaixo você desejaria conhecer?", options: {
      a: "Egito.",
      b: "Israel.",
      c: "Nova Zelândia.",
      d: "Tailândia.",
      e: "África do Sul."
    }},
    { n: 6, text: "Qual dos esportes abaixo você mais se identifica?", options: {
      a: "Futebol.",
      b: "Lutas.",
      c: "Natação.",
      d: "Tênis.",
      e: "Não gosto de esportes."
    }},
    { n: 7, text: "Em um ambiente onde você não conhece ninguém, você costuma:", options: {
      a: "Ficar em um lugar isolado.",
      b: "Conversar com alguém que possa lhe introduzir a um grupo.",
      c: "Curtir sozinho.",
      d: "Se socializar e conquistar amigos.",
      e: "Se sentir incomodado por estar sozinho e vai embora."
    }},
    { n: 8, text: "Em quais destes ambientes você se sente mais à vontade?", options: {
      a: "Em um hospital.",
      b: "Em centros esportivos.",
      c: "Em uma floresta.",
      d: "Em shoppings.",
      e: "Em lugares isolados."
    }},
    { n: 9, text: "Dentre estas personalidades, a que mais admiro é:", options: {
      a: "Bill Gates.",
      b: "Steve Jobs.",
      c: "Ronaldo.",
      d: "Angelina Jolie.",
      e: "Madre Tereza."
    }},
    { n: 10, text: "Estou fazendo este teste vocacional pois:", options: {
      a: "Não tenho ideia de qual profissão escolher.",
      b: "Estou na dúvida entre duas profissões.",
      c: "Estou na dúvida entre 3 profissões ou mais.",
      d: "Sei qual profissão me interessa, mas não tenho certeza.",
      e: "Estou certo de qual profissão eu quero, apenas pretendo conferir."
    }},
    { n: 11, text: "Procuro fazer amigos que:", options: {
      a: "Possuem status e são influentes.",
      b: "Possuem os mesmos interesses que eu.",
      c: "Compartilham das mesmas ideias.",
      d: "São bastante diferentes de mim.",
      e: "Não me preocupo com características quando procuro uma amizade."
    }},
    { n: 12, text: "Na escola eu geralmente me destacava por:", options: {
      a: "Ser um aluno dedicado e tirar notas boas.",
      b: "Ser atencioso e ajudar meus colegas.",
      c: "Ser bastante dedicado aos esportes.",
      d: "Não prestar atenção nas aulas e ser repreendido.",
      e: "Ser engraçado e contar piadas."
    }},
    { n: 13, text: "Se eu ganhasse na loteria eu:", options: {
      a: "Guardaria parte do dinheiro e investiria em um negócio.",
      b: "Dividiria meu dinheiro entre diversas opções de investimento.",
      c: "Guardaria o dinheiro e me dedicaria a atividades que me interessam.",
      d: "Usaria o dinheiro para uma causa nobre.",
      e: "Aposentaria e viveria viajando."
    }},
    { n: 14, text: "Se eu tivesse que escolher uma atividade para exercer por 6 meses seria:", options: {
      a: "Reformar uma casa.",
      b: "Me colocar em contato com pessoas bem-sucedidas.",
      c: "Algo que pudesse ser realizado em equipe.",
      d: "Uma atividade com boa remuneração.",
      e: "Uma atividade voluntária e com a qual eu pudesse ajudar o maior número de pessoas."
    }},
    { n: 15, text: "Eu certamente gastaria uma boa parte do meu primeiro salário com:", options: {
      a: "Um jantar para a(o) namorada(o) ou familiares.",
      b: "Investiria em meu desenvolvimento profissional.",
      c: "Uma viagem.",
      d: "Gastaria o mínimo possível.",
      e: "Compraria algum produto caro de meu interesse."
    }},
    { n: 16, text: "Se eu tivesse que abrir um destes negócios seria:", options: {
      a: "Uma empresa de internet.",
      b: "Uma fábrica de computadores.",
      c: "Um restaurante.",
      d: "Uma academia.",
      e: "Uma clínica médica."
    }},
    { n: 17, text: "Minha maior frustração seria:", options: {
      a: "Não ser bem-sucedido profissionalmente.",
      b: "Não me destacar em minha área de atuação.",
      c: "Não construir uma família.",
      d: "Não ter muito tempo para curtir a vida.",
      e: "Escolher a carreira errada e ter que mudar depois."
    }}
  ],

  profiles: {
    A: {
      label: "Perfil A",
      title: "Sucesso Profissional",
      text: "Você valoriza o sucesso profissional.",
      careers: ["Arquitetura","Artes Cênicas","Artes Plásticas","Astronomia","Ciências Biológicas (Biologia)","Cinema","Engenharia Mecânica","Esporte","Filosofia","Jornalismo","Matemática","Publicidade","Rádio e TV","Turismo","Veterinária","Educação Física","Meteorologia","Oceanografia","Engenharia Ambiental","Engenharia Florestal","Arqueologia"]
    },
    B: {
      label: "Perfil B",
      title: "Ascensão Social",
      text: "Você valoriza a ascensão social.",
      careers: ["Medicina","Direito","Artes Cênicas","Arquitetura","Cinema","Editoração","Engenharia Aeronáutica","Jornalismo","Odontologia","Biomedicina","Farmácia","Artes Plásticas","Artes Visuais","Gastronomia","Relações Internacionais","Relações Públicas"]
    },
    C: {
      label: "Perfil C",
      title: "Segurança",
      text: "Você valoriza a segurança.",
      careers: ["Medicina","Odontologia","Engenharia Civil","Engenharia da Computação","Letras","Nutrição","Pedagogia","Psicologia","Veterinária","Biomedicina","História","Ciência da Computação","Engenharia de Controle e Automação","Engenharia Nuclear","Engenharia de Materiais"]
    },
    D: {
      label: "Perfil D",
      title: "Qualidade de Vida",
      text: "Você valoriza a qualidade de vida.",
      careers: ["Administração","Ciências Contábeis","Análise de Sistemas","Economia","Engenharia da Computação","Farmácia","Física","Comércio Exterior","Engenharia Mecânica","Engenharia Eletrônica","Engenharia Elétrica","Engenharia de Produção","Engenharia de Agrimensura","Biblioteconomia"]
    },
    E: {
      label: "Perfil E",
      title: "Solidariedade",
      text: "Você valoriza a solidariedade.",
      careers: ["Ciências Sociais","Enfermagem","Fonoaudiologia","Engenharia de Alimentos","Jornalismo","Nutrição","Terapia Ocupacional","Psicologia","Serviço Social","Fisioterapia","Odontologia","Decoração","Moda","Farmácia"]
    }
  }
};
