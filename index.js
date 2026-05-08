/// Importa o prompt-sync para permitir entrada de dados
const prompt = require("prompt-sync")();


// Importa o colors para colorir textos no terminal
require("colors");


// Vetor com nomes de personagens secundários
const nomesSecundarios = [

  "Lucas Trado",
  "Sheylla Saco",
  "Déssio Pinto",
  "Eva Dias",
  "Deide Costa",
  "Silas Cando",
  "Vanessa Fadinha",
  "Zeca Gado",
  "Thiago Zado",
  "Giuseppe Camolli",
  "Tripa Seca",
  "Quase Nada",
  "Poucas Trancas"
];


// Nome do jogo
const nomeJogo = "Ponto de Ignição";


// Pergunta o nome do jogador
let nomeJogador = prompt("Digite o nome do seu agente temporal: ");


// Título do jogo
console.log(`\n===== ${nomeJogo} =====\n`.red);


// Introdução inicial
console.log(
  `O agente ${nomeJogador} é de um universo paralelo imune ao tempo e habitado apenas pelos conhecidos como Guardiões do Tempo.`.magenta
);

console.log(
  "Os Guardiões trabalham para a Comissão, agência responsável pela manutenção temporal do multiverso.".magenta
);

console.log(
  "Durante uma missão no universo 6592, ele descobriu que, em algum momento no futuro, o sistema democrático mundial sucumbiu ao autoritarismo.".magenta
);

console.log(
  "Nessa versão da Terra, todos os países entraram em uma nova guerra mundial que resultou na extinção da espécie humana.".magenta
);

console.log(
  "Contrariando o seu dever como Guardião do Tempo, ele decidiu entrar em uma busca para impedir a extinção da humanidade nesse universo.".magenta
);

console.log(
  "Porém, até o momento, as informações que possui revelam apenas o que aconteceu, mas não dizem como.".magenta
);

console.log(
  "Para descobrir onde tudo começou, ele precisará viajar por diferentes épocas e reunir 7 pistas antes que a Comissão o encontre.".magenta
);


// ===============================
// RECURSOS INICIAIS DO JOGADOR
// ===============================


// Total de pontos disponíveis
let pontosRestantes = 1000;


// Recursos do jogador
let saude = 0;
let dinheiro = 0;
let energiaTemporal = 0;
let suspeitaComissao = 0;
let sanidade = 0;
let estabilidadeTemporal = 0;


// Exibe a tela inicial de distribuição
console.log("\n===== DISTRIBUIÇÃO DE RECURSOS =====".green);

console.log(`Pontos disponíveis: ${pontosRestantes}\n`.yellow);

console.log("Recursos disponíveis:");
console.log("1. Saúde");
console.log("2. Dinheiro");
console.log("3. Energia Temporal");
console.log("4. Sanidade");
console.log("5. Estabilidade Temporal");


// ===============================
// DISTRIBUIÇÃO DOS PONTOS COM VALIDAÇÃO
// ===============================

function escolherValorDoRecurso(nomeRecurso) {

  let valor = -1;

  while (valor < 0 || valor > pontosRestantes || isNaN(valor)) {

    console.log(`\nPontos restantes: ${pontosRestantes}`.yellow);

    valor = Number(
      prompt(`Quantos pontos deseja colocar em ${nomeRecurso}? `)
    );

    if (isNaN(valor)) {

      console.log("Digite apenas números.".red);

    } else if (valor < 0) {

      console.log("O valor não pode ser negativo.".red);

    } else if (valor > pontosRestantes) {

      console.log("Você não tem pontos suficientes.".red);
    }
  }

  pontosRestantes -= valor;

  return valor;
}


// Função responsável por distribuir os recursos
function distribuirRecursos(totalDePontos) {

  // Define quantos pontos poderão ser distribuídos
  pontosRestantes = totalDePontos;

  // Zera os atributos atuais
  saude = 0;
  dinheiro = 0;
  energiaTemporal = 0;
  sanidade = 0;
  estabilidadeTemporal = 0;

  console.log("\n===== DISTRIBUIÇÃO DE RECURSOS =====".green);

  saude = escolherValorDoRecurso("Saúde");

  dinheiro = escolherValorDoRecurso("Dinheiro");

  energiaTemporal = escolherValorDoRecurso("Energia Temporal");

  sanidade = escolherValorDoRecurso("Sanidade");

  estabilidadeTemporal = escolherValorDoRecurso("Estabilidade Temporal");
}


// Primeira distribuição do jogo
distribuirRecursos(1000);


// ===============================
// STATUS INICIAL DO JOGADOR
// ===============================

console.log("\n===== STATUS INICIAL =====".green);

console.log(`Saúde: ${saude}`);
console.log(`Dinheiro: ${dinheiro}`);
console.log(`Energia Temporal: ${energiaTemporal}`);
console.log(`Sanidade: ${sanidade}`);
console.log(`Estabilidade Temporal: ${estabilidadeTemporal}`);
console.log(`Suspeita da Comissão: ${suspeitaComissao}`);
console.log(`\nPontos restantes: ${pontosRestantes}`.yellow);


// ===============================
// MENU PRINCIPAL
// ===============================


// Controla se o jogo continua rodando
let jogoAtivo = true;


// Inventário inicial
let inventario = [];


// Vetor de pistas
let pistas = [];

let conspiradores = [
  "Alma Negra",
  "Racha Cuca",
  "Dr. Pompilho Pomposo Pompeu",
  "Marco Zinho de Oliveira"
];

// Variáveis de inventário
let remedios = 0;
let pecas = 0;

// ===============================
// FUNÇÕES AUXILIARES
// ===============================

// Gera um nome aleatório para personagens secundários
function gerarNomeSecundario() {

  let indiceAleatorio = Math.floor(
    Math.random() * nomesSecundarios.length
  );

  return nomesSecundarios[indiceAleatorio];
}


// Controla se a primeira missão já foi concluída
let missao1Concluida = false;
let missao2Concluida = false;

let rodadaAtual = 1;
let pistasNecessarias = 7;

// ===============================
// VERIFICAÇÃO DE DERROTA
// ===============================

function verificarDerrota() {

  if (saude <= 0) {
    console.log("\nSua saúde chegou a zero. Seu corpo não resistiu às viagens temporais.".red);
    jogoAtivo = false;
  }

  if (energiaTemporal <= 0) {
    console.log("\nSua energia temporal acabou. Você ficou preso fora da linha do tempo.".red);
    jogoAtivo = false;
  }

  if (sanidade <= 0) {
    console.log("\nSua sanidade chegou a zero. Sua mente se fragmentou entre realidades paralelas.".red);
    jogoAtivo = false;
  }

  if (estabilidadeTemporal <= 0) {
    console.log("\nA estabilidade temporal chegou a zero. O paradoxo se tornou irreversível.".red);
    jogoAtivo = false;
  }

  if (suspeitaComissao >= 100) {

    console.log(
      "\nA Comissão rastreou sua assinatura temporal. Você foi capturado.".red
    );

    jogoAtivo = false;
  }
}

// ===============================
// EVENTOS ALEATÓRIOS
// ===============================

function executarEventoAleatorio() {

  // Gera número aleatório entre 0 e 1
  let chanceEvento = Math.random();

  // 5% de chance de evento acontecer
  if (chanceEvento <= 0.7) {

    // Escolhe se o evento será positivo ou negativo
    let tipoEvento = Math.floor(Math.random() * 2);

    // EVENTO POSITIVO
    if (tipoEvento === 0) {

      console.log(
        "\nEVENTO ALEATÓRIO: Você encontrou suprimentos médicos escondidos.".green
      );

      saude += 50;

      console.log("+50 saúde");

    } else {

      // EVENTO NEGATIVO
      console.log(
        "\nEVENTO ALEATÓRIO: Um agente da Comissão identificou uma anomalia temporal próxima.".red
      );

      suspeitaComissao += 15;

      console.log("+15 suspeita da Comissão");
    }

    // Verifica derrota após evento
    verificarDerrota();
  }
}

// ===============================
// PERGUNTA COM TEMPO LIMITE
// ===============================

function perguntarComTempo(pergunta, tempoLimite) {

  console.log(
    `\nVocê tem ${tempoLimite} segundos para responder.`.yellow
  );

  // Marca o momento inicial
  let inicio = Date.now();

  // Faz a pergunta
  let resposta = prompt(pergunta);

  // Marca o momento final
  let fim = Date.now();

  // Calcula quantos segundos passaram
  let tempoDecorrido = (fim - inicio) / 1000;

  // Verifica se passou do limite
  if (tempoDecorrido > tempoLimite) {

    console.log(
      "\nVocê demorou demais. O Comerciante Temporal desapareceu.".red
    );

    return null;
  }

  return resposta;
}

// ===============================
// COMERCIANTE TEMPORAL
// ===============================

function comercianteTemporal() {

  // 10% de chance de aparecer
  let chanceComerciante = Math.random();

  if (chanceComerciante <= 0.40) {

    let comerciante = gerarNomeSecundario();

    console.log(
      `\nO Comerciante Temporal ${comerciante} surgiu entre as distorções temporais.`.yellow
    );

    console.log(
      "\nEle parece nervoso e observa constantemente os arredores.".gray
    );

    console.log(
      "Negociações temporais clandestinas atraem a atenção da Comissão.".gray
    );

    // Sorteia qual oferta aparecerá
    let oferta = Math.floor(Math.random() * 3);

    // =========================================
    // OFERTA 1
    // =========================================
    if (oferta === 0) {

      console.log(
        "\nOFERTA: reduzir 20 pontos de suspeita da Comissão.".cyan
      );

      console.log(
        "CUSTO: 100 pontos de energia temporal.".cyan
      );

      console.log("\n1. Aceitar troca");
      console.log("2. Recusar");

      let escolha = perguntarComTempo(
        "\nEscolha uma opção: ",
        10
      );

      // Jogador demorou demais
      if (escolha === null) {
        return;
      }

      switch (escolha) {

        case "1":

          if (energiaTemporal < 100) {

            console.log(
              "\nVocê não possui energia temporal suficiente.".red
            );

            break;
          }

          energiaTemporal -= 100;

          suspeitaComissao -= 20;

          // Impede suspeita negativa
          if (suspeitaComissao < 0) {
            suspeitaComissao = 0;
          }

          console.log(
            "\nA transação foi concluída.".green
          );

          console.log("-100 energia temporal");
          console.log("-20 suspeita da Comissão");

          break;


        case "2":

          console.log(
            "\nVocê recusou a oferta.".gray
          );

          break;


        default:

          console.log(
            "\nO comerciante desapareceu antes da negociação.".gray
          );
      }
    }

    // =========================================
    // OFERTA 2
    // =========================================
    else if (oferta === 1) {

      console.log(
        "\nOFERTA: 1 remédio temporal.".cyan
      );

      console.log(
        "CUSTO: 50 pontos de dinheiro.".cyan
      );

      console.log("\n1. Comprar");
      console.log("2. Recusar");

      let escolha = perguntarComTempo(
        "\nEscolha uma opção: ",
        10
      );

      // Jogador demorou demais
      if (escolha === null) {
        return;
      }

      switch (escolha) {

        case "1":

          if (dinheiro < 50) {

            console.log(
              "\nVocê não possui dinheiro suficiente.".red
            );

            break;
          }

          dinheiro -= 50;

          remedios += 1;

          console.log(
            "\nCompra realizada.".green
          );

          console.log("-50 dinheiro");
          console.log("+1 remédio");

          break;


        case "2":

          console.log(
            "\nVocê recusou a oferta.".gray
          );

          break;


        default:

          console.log(
            "\nO comerciante desapareceu antes da negociação.".gray
          );
      }
    }

    // =========================================
    // OFERTA 3
    // =========================================
    else {

      console.log(
        "\nOFERTA: 2 peças de estabilização temporal.".cyan
      );

      console.log(
        "CUSTO: +10 suspeita da Comissão.".cyan
      );

      console.log("\n1. Aceitar");
      console.log("2. Recusar");

      let escolha = perguntarComTempo(
        "\nEscolha uma opção: ",
        10
      );

      // Jogador demorou demais
      if (escolha === null) {
        return;
      }

      switch (escolha) {

        case "1":

          pecas += 2;

          suspeitaComissao += 10;

          console.log(
            "\nTroca concluída.".green
          );

          console.log("+2 peças");
          console.log("+10 suspeita da Comissão");

          break;


        case "2":

          console.log(
            "\nVocê recusou a oferta.".gray
          );

          break;


        default:

          console.log(
            "\nO comerciante desapareceu antes da negociação.".gray
          );
      }
    }

    verificarDerrota();
  }
}

// Loop principal do jogo
while (jogoAtivo) {

  console.log(`\n===== MENU PRINCIPAL | RODADA ${rodadaAtual} =====`.green);

  console.log(`Pistas encontradas: ${pistas.length}/${pistasNecessarias}`.yellow);
  console.log("1. Ver status");
  console.log("2. Ver inventário");
  console.log("3. Ver pistas");
  console.log("4. Alterar status");
  if (pistas.length >= pistasNecessarias) {
    console.log("5. Iniciar missão final");
  } else {
    console.log("5. Iniciar missão");
  }
  console.log("6. Sair");

  let opcao = prompt("\nEscolha uma opção: ");

  switch (opcao) {

    case "1":

      console.log("\n===== STATUS =====".cyan);

      console.log(`Saúde: ${saude}`);
      console.log(`Dinheiro: ${dinheiro}`);
      console.log(`Energia Temporal: ${energiaTemporal}`);
      console.log(`Sanidade: ${sanidade}`);
      console.log(`Estabilidade Temporal: ${estabilidadeTemporal}`);
      console.log(`Suspeita da Comissão: ${suspeitaComissao}`);

      break;


    case "2":

      console.log("\n===== INVENTÁRIO =====".yellow);

      console.log(`Remédios: ${remedios}`);
      console.log(`Peças: ${pecas}`);

      if (inventario.length === 0) {

        console.log("Seu inventário está vazio.");

      } else {
        console.log(inventario);
      }

      break;


    case "3":

      console.log("\n===== PISTAS =====".magenta);

      if (pistas.length === 0) {

        console.log("Você ainda não encontrou pistas.");

      } else {

        console.log(pistas);
      }

      break;


    case "4":

      console.log("\n===== ALTERAR STATUS =====".green);

      console.log(
        "Todas as alocações atuais serão zeradas.".yellow
      );

      console.log(
        "Você poderá redistribuir os 1000 pontos novamente.".yellow
      );

      // Soma o total atual dos recursos
      let totalAtualDosRecursos =
        saude +
        dinheiro +
        energiaTemporal +
        sanidade +
        estabilidadeTemporal;


      // Redistribui apenas o total atual
      distribuirRecursos(totalAtualDosRecursos);

      console.log("\n===== NOVO STATUS =====".cyan);

      console.log(`Saúde: ${saude}`);
      console.log(`Dinheiro: ${dinheiro}`);
      console.log(`Energia Temporal: ${energiaTemporal}`);
      console.log(`Sanidade: ${sanidade}`);
      console.log(`Estabilidade Temporal: ${estabilidadeTemporal}`);

      console.log(`\nPontos restantes: ${pontosRestantes}`.yellow);

      break;


    case "5":

      // ===============================
      // MISSÃO FINAL
      // ===============================

      if (pistas.length >= pistasNecessarias) {

        console.log(
          "\n===== MISSÃO FINAL: PONTO DE IGNIÇÃO =====".red
        );

        console.log(
          "\nApós reunir as 7 pistas, você finalmente compreende a verdade.".magenta
        );

        console.log(
          "\nA linha temporal do colapso não era a linha original.".magenta
        );

        console.log(
          "\nSeu mentor alterou o destino de Belíndia ao salvar uma menina que deveria morrer naquele dia.".yellow
        );

        console.log(
          "\nEsse ato de compaixão desencadeou uma cadeia de eventos que, décadas depois, levaria ao colapso civilizacional e à extinção humana.".yellow
        );

        console.log(
          "\nAgora, você precisa decidir o que fazer.\n".red
        );

        console.log("1. Entregar seu mentor à Comissão e restaurar a linha original");
        console.log("2. Vazar dados revelem à população a conspiração e seus principais idealizadores");
        console.log("3. Eliminar os conspiradores");

        let escolhaFinal = prompt("\nEscolha uma opção: ");

        switch (escolhaFinal) {

          case "1":

            console.log(
              "\nVocê entrega seu mentor à Comissão.".red
            );

            console.log(
              "Ele será executado por violar a continuidade temporal.".red
            );

            console.log(
              "\nA menina é devolvida à linha original, mesmo sabendo que seu destino será terrível.".yellow
            );

            console.log(
              "O equilíbrio temporal é restaurado e a extinção da humanidade naquele universo é evitada.".green
            );

            console.log(
              "\nFINAL: Restauração Amarga".cyan
            );

            jogoAtivo = false;

            break;


          case "2":

            console.log(
              "\nVocê decide não entregar seu mentor.".yellow
            );

            console.log(
              "Em vez disso, expõe publicamente os arquivos da Comissão, os nomes dos conspiradores e a verdade sobre Belíndia.".yellow
            );

            suspeitaComissao += 15;

            console.log("+15 suspeita da Comissão");

            if (suspeitaComissao >= 100) {

              console.log(
                "\nA exposição pública revelou sua assinatura temporal.".red
              );

              console.log(
                "A Comissão localizou você imediatamente.".red
              );

              console.log(
                "\nFINAL: Verdade Interrompida".red
              );

            } else {

              console.log("\nVoce consegue vazar discretamente dados secretos do plano dos conspiradores".magenta);

              console.log(
                "A verdade se espalha, rapidamente, mas não é o suficiente para garantir que o colapso seja evitado.".magenta
              );
              
              console.log("Os conspiradores gozam de grande reputação e influência nas mais diversas esferas de poder".magenta);

              console.log(
                "Você não entrega seu mentor e não é identificado como suspeito pela Comissão,".magenta
              );

              console.log("mas a sua probabilidade de sucesso é muito baixa".magenta);

              console.log(
                "\nFINAL: A Verdade".cyan
              );
            }

            jogoAtivo = false;

            break;


          case "3":

            console.log(
              "\nVocê decide não entregar seu mentor.".yellow
            );

            console.log(
              `Em vez disso, escolhe eliminar os conspiradores: ${conspiradores.join(", ")}.`.red
            );

            suspeitaComissao += 25;

            console.log("+25 suspeita da Comissão");

            if (suspeitaComissao >= 100) {

              console.log(
                "\nA execução dos conspiradores gerou uma ruptura temporal impossível de esconder.".red
              );

              console.log(
                "A Comissão rastreou você imediatamente.".red
              );

              console.log(
                "\nFINAL: Caçado no Instante Final".red
              );

            } else {

              console.log(
                "\nOs conspiradores morreram e a linha temporal na qual eles deram origem ao conflito.".magenta
              );

              console.log("que resultou no fim da humanidade nesse universo foi sobrescrita por uma nova versão".magenta);

              console.log("A Comissão ainda não sabe o que exatamente aconteceu, mas começou uma investigação".magenta);

              console.log(
                "Como a única assinatura temporal conhecida identificada próxima ao momento do disturbio.".magenta
              );

              console.log("você se tornou o principal suspeito e uma ordem de busca foi emitida pela Comissão contra você")

              console.log("Além disso, ela reforçou a vigilângia da linha temporal de Belíndia do universo 6592".magenta);
         
              console.log("Agora você terá que viver o resto de sua vida como um fugitivo da Comissão sem poder saber".magenta);

              console.log(
                "se enfim teve êxito ou não.".magenta
              );

              console.log(
                "\nFINAL: Sangue Contra o Tempo".cyan
              );
            }

            jogoAtivo = false;

            break;


          default:

            console.log(
              "\nVocê hesitou no único momento em que não poderia hesitar.".red
            );

            console.log(
              "A Comissão percebe a instabilidade criada pela sua indecisão.".red
            );

            console.log(
              "\nFINAL: O Último Segundo Perdido".red
            );

            jogoAtivo = false;
        }

        break;
      }
      ////////////////////////////////////
      if (rodadaAtual === 1) {

        if (missao1Concluida) {

          console.log(
            "\nVocê já concluiu a missão Ecos do Colapso.".yellow
          );

          break;
        }

        let informante = gerarNomeSecundario();

        console.log("\n===== MISSÃO 1: ECOS DO COLAPSO =====".red);

        console.log(
          "\nVocê recebeu informações fragmentadas sobre atividades suspeitas em uma grande metrópole do universo 6592.".magenta
        );

        console.log(
          `O informante ${informante} afirma possuir documentos secretos sobre movimentações políticas incomuns.`.magenta
        );

        console.log(
          "\nO que deseja fazer?\n".yellow
        );

        console.log("1. Negociar discretamente");
        console.log("2. Subornar o informante");
        console.log("3. Invadir o esconderijo");

        let escolhaMissao = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao) {


          case "1":

            if (dinheiro < 50) {

              console.log(
                "\nVocê não possui dinheiro suficiente para negociar.".red
              );

              break;
            }

            console.log(
              "\nVocê negociou discretamente e conseguiu informações parciais.".cyan
            );

            dinheiro -= 50;
            suspeitaComissao += 5;

            pistas.push(
              "Uma figura política importante vinha sendo monitorada secretamente."
            );

            console.log("-50 dinheiro");
            console.log("+1 pista");

            console.log("+5 suspeita da Comissão");

            missao1Concluida = true;
            rodadaAtual++;

            break;


          case "2":

            if (dinheiro < 150) {

              console.log(
                "\nVocê não possui dinheiro suficiente para subornar o informante.".red
              );

              break;
            }

            if (sanidade < 20) {

              console.log(
                "\nSua sanidade está muito baixa para lidar com os documentos.".red
              );

              break;
            }

            console.log(
              `\n${informante} aceitou o suborno e entregou documentos confidenciais.`.yellow
            );

            dinheiro -= 150;
            suspeitaComissao += 10;
            sanidade -= 20;

            pistas.push(
              "Grandes grupos econômicos estavam financiando campanhas extremistas."
            );

            console.log("-150 dinheiro");
            console.log("-20 sanidade");
            console.log("+1 pista");
            console.log("+10 suspeita da Comissão");

            missao1Concluida = true;
            rodadaAtual++;

            break;


          case "3":

            if (energiaTemporal < 50) {

              console.log(
                "\nVocê não possui energia temporal suficiente para a invasão.".red
              );

              break;
            }

            if (estabilidadeTemporal < 30) {

              console.log(
                "\nA estabilidade temporal está muito baixa para arriscar uma invasão.".red
              );

              break;
            }

            console.log(
              "\nVocê invadiu o esconderijo e roubou arquivos criptografados.".red
            );

            energiaTemporal -= 50;

            estabilidadeTemporal -= 30;

            suspeitaComissao += 25;

            pistas.push(
              "A Comissão já investigava possíveis riscos de colapso naquele universo."
            );

            console.log("-50 energia temporal");
            console.log("-30 estabilidade temporal");
            console.log("+1 pista");
            console.log("+25 suspeita da Comissão");

            missao1Concluida = true;
            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê hesitou e perdeu a oportunidade.".gray
            );
        }

      } else if (rodadaAtual === 2) {

        if (missao2Concluida) {

          console.log(
            "\nVocê já concluiu a missão Vozes da Ruptura.".yellow
          );

          break;
        }

        let agente = gerarNomeSecundario();

        console.log("\n===== MISSÃO 2: VOZES DA RUPTURA =====".red);

        console.log(
          "\nVocê viaja para uma época anterior ao colapso, quando discursos autoritários começaram a ganhar força.".magenta
        );

        console.log(
          `O agente da Comissão ${agente} foi visto monitorando arquivos de comunicação política nesse período.`.magenta
        );

        console.log(
          "\nVocê precisa decidir como investigar essa interferência.\n".yellow
        );

        console.log("1. Analisar discursos públicos");
        console.log("2. Rastrear comunicações secretas");
        console.log("3. Confrontar o agente da Comissão");

        let escolhaMissao2 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao2) {

          case "1":

            if (sanidade < 20) {

              console.log(
                "\nSua sanidade está muito baixa para analisar anos de propaganda e manipulação.".red
              );

              break;
            }

            sanidade -= 20;
            suspeitaComissao += 5;

            pistas.push(
              "O colapso foi preparado por anos de manipulação emocional das massas."
            );

            console.log("-20 sanidade");
            console.log("+5 suspeita da Comissão");
            console.log("+1 pista");

            missao2Concluida = true;
            rodadaAtual++;

            break;


          case "2":

            if (energiaTemporal < 40) {

              console.log(
                "\nVocê não possui energia temporal suficiente para rastrear comunicações ocultas.".red
              );

              break;
            }

            energiaTemporal -= 40;
            suspeitaComissao += 15;

            pistas.push(
              "Redes clandestinas coordenavam crises artificiais para enfraquecer instituições democráticas."
            );

            console.log("-40 energia temporal");
            console.log("+15 suspeita da Comissão");
            console.log("+1 pista");

            missao2Concluida = true;
            rodadaAtual++;

            break;


          case "3":

            if (saude < 60) {

              console.log(
                "\nSua saúde está muito baixa para arriscar um confronto direto.".red
              );

              break;
            }

            if (energiaTemporal < 30) {

              console.log(
                "\nVocê não possui energia temporal suficiente para escapar após o confronto.".red
              );

              break;
            }

            saude -= 60;
            energiaTemporal -= 30;
            suspeitaComissao += 25;

            pistas.push(
              "A Comissão não apenas observava a ruptura: alguns agentes pareciam protegê-la."
            );

            console.log("-60 saúde");
            console.log("-30 energia temporal");
            console.log("+25 suspeita da Comissão");
            console.log("+1 pista");

            missao2Concluida = true;
            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê hesitou e perdeu a janela temporal de investigação.".gray
            );
        }

      } else if (rodadaAtual === 3) {

        console.log("\n===== MISSÃO 3: ARQUIVOS CENSURADOS =====".red);

        let arquivista = gerarNomeSecundario();

        console.log(
          "\nVocê chega a uma época em que documentos históricos começaram a desaparecer dos arquivos públicos.".magenta
        );

        console.log(
          `Um arquivista chamado ${arquivista} afirma que registros políticos foram apagados antes de chegarem ao conhecimento da população.`.magenta
        );

        console.log(
          "\nVocê precisa decidir como recuperar essas informações.\n".yellow
        );

        console.log("1. Convencer o arquivista a colaborar");
        console.log("2. Comprar acesso aos arquivos apagados");
        console.log("3. Invadir o banco de dados censurado");

        let escolhaMissao3 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao3) {

          case "1":

            if (sanidade < 15) {

              console.log(
                "\nSua sanidade está muito baixa para conduzir uma negociação cuidadosa.".red
              );

              break;
            }

            sanidade -= 15;
            suspeitaComissao += 5;

            pistas.push(
              "Documentos públicos foram apagados para esconder a origem da ruptura política."
            );

            console.log("-15 sanidade");
            console.log("+5 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "2":

            if (dinheiro < 120) {

              console.log(
                "\nVocê não possui dinheiro suficiente para comprar acesso aos arquivos.".red
              );

              break;
            }

            dinheiro -= 120;
            suspeitaComissao += 10;

            pistas.push(
              "Empresários e líderes políticos financiaram a destruição de registros comprometedores."
            );

            console.log("-120 dinheiro");
            console.log("+10 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "3":

            if (energiaTemporal < 60) {

              console.log(
                "\nVocê não possui energia temporal suficiente para invadir o banco de dados.".red
              );

              break;
            }

            if (estabilidadeTemporal < 25) {

              console.log(
                "\nA estabilidade temporal está muito baixa para manipular arquivos do passado.".red
              );

              break;
            }

            energiaTemporal -= 60;
            estabilidadeTemporal -= 25;
            suspeitaComissao += 20;

            pistas.push(
              "A censura foi coordenada por uma aliança entre agentes políticos, mídia e setores da própria Comissão."
            );

            console.log("-60 energia temporal");
            console.log("-25 estabilidade temporal");
            console.log("+20 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê perdeu tempo demais e os arquivos foram transferidos para outro período.".gray
            );
        }

      } else if (rodadaAtual === 4) {

        console.log("\n===== MISSÃO 4: OS CONSPIRADORES =====".red);

        console.log(
          "\nApós cruzar registros censurados, você encontrou padrões recorrentes entre figuras políticas, empresários e agentes ocultos.".magenta
        );

        console.log(
          "\nTalvez finalmente seja possível identificar os principais articuladores do colapso.".yellow
        );

        console.log("\nO que deseja fazer?\n");

        console.log("1. Investigar movimentações financeiras");
        console.log("2. Interceptar comunicações secretas");
        console.log("3. Invadir arquivos confidenciais da Comissão");

        let escolhaMissao4 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao4) {

          case "1":

            if (dinheiro < 100) {

              console.log(
                "\nVocê não possui dinheiro suficiente para financiar a investigação.".red
              );

              break;
            }

            dinheiro -= 100;
            suspeitaComissao += 10;

            pistas.push(
              `Os principais conspiradores identificados foram: ${conspiradores.join(", ")}`
            );

            console.log("-100 dinheiro");
            console.log("+10 suspeita da Comissão");

            console.log("\nCONSPIRADORES IDENTIFICADOS:".red);
            console.log(conspiradores);

            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "2":

            if (energiaTemporal < 50) {

              console.log(
                "\nVocê não possui energia temporal suficiente.".red
              );

              break;
            }

            energiaTemporal -= 50;
            suspeitaComissao += 20;

            pistas.push(
              `Interceptações revelaram os nomes dos conspiradores: ${conspiradores.join(", ")}`
            );

            console.log("-50 energia temporal");
            console.log("+20 suspeita da Comissão");

            console.log("\nCONSPIRADORES IDENTIFICADOS:".red);
            console.log(conspiradores);

            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "3":

            if (estabilidadeTemporal < 40) {

              console.log(
                "\nA estabilidade temporal está muito baixa para acessar os arquivos da Comissão.".red
              );

              break;
            }

            estabilidadeTemporal -= 40;
            suspeitaComissao += 30;

            pistas.push(
              `Arquivos secretos apontam os conspiradores centrais: ${conspiradores.join(", ")}`
            );

            console.log("-40 estabilidade temporal");
            console.log("+30 suspeita da Comissão");

            console.log("\nCONSPIRADORES IDENTIFICADOS:".red);
            console.log(conspiradores);

            console.log("+1 pista");

            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê perdeu a oportunidade de rastrear os conspiradores.".gray
            );
        }

      } else if (rodadaAtual === 5) {

        console.log("\n===== MISSÃO 5: BELÍNDIA =====".red);

        console.log(
          "\nApós cruzar décadas de registros diplomáticos, crises econômicas e operações clandestinas, um padrão começou a emergir.".magenta
        );

        console.log(
          "\nTodos os caminhos parecem convergir para o mesmo lugar.".yellow
        );

        console.log(
          "\nBelíndia.".red
        );

        console.log(
          "\nO país aparece repetidamente ligado a eventos políticos, manipulações econômicas e anomalias temporais anteriores ao colapso.".magenta
        );

        console.log(
          "\nVocê precisa descobrir qual era o verdadeiro papel de Belíndia na ruptura da civilização.\n".yellow
        );

        console.log("1. Investigar arquivos diplomáticos");
        console.log("2. Espionar uma reunião clandestina");
        console.log("3. Invadir uma instalação governamental");

        let escolhaMissao5 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao5) {

          case "1":

            if (dinheiro < 80) {

              console.log(
                "\nVocê não possui dinheiro suficiente para acessar os arquivos diplomáticos.".red
              );

              break;
            }

            dinheiro -= 80;
            suspeitaComissao += 5;

            pistas.push(
              "O país diretamente ligado ao ponto de ignição era Belíndia."
            );

            console.log("-80 dinheiro");
            console.log("+5 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "2":

            if (energiaTemporal < 45) {

              console.log(
                "\nVocê não possui energia temporal suficiente para realizar a espionagem.".red
              );

              break;
            }

            energiaTemporal -= 45;
            suspeitaComissao += 15;

            pistas.push(
              "Reuniões clandestinas em Belíndia coordenavam respostas artificiais para gerar instabilidade social."
            );

            console.log("-45 energia temporal");
            console.log("+15 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "3":

            if (estabilidadeTemporal < 35) {

              console.log(
                "\nA estabilidade temporal está muito baixa para invadir a instalação governamental.".red
              );

              break;
            }

            if (saude < 40) {

              console.log(
                "\nSua saúde está muito baixa para arriscar uma infiltração direta.".red
              );

              break;
            }

            estabilidadeTemporal -= 35;
            saude -= 40;
            suspeitaComissao += 30;

            pistas.push(
              "Belíndia foi usada como laboratório político para testar mecanismos de controle populacional e manipulação institucional."
            );

            console.log("-35 estabilidade temporal");
            console.log("-40 saúde");
            console.log("+30 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê perdeu a oportunidade de investigar Belíndia mais profundamente.".gray
            );
        }

      } else if (rodadaAtual === 6) {

        console.log("\n===== MISSÃO 6: A DATA DO PONTO DE IGNIÇÃO =====".red);

        console.log(
          "\nAgora que Belíndia foi identificada como epicentro do colapso, resta descobrir quando a primeira alteração ocorreu.".magenta
        );

        console.log(
          "\nVocê acessa registros temporais instáveis, fragmentados por paradoxos e interferências antigas.".magenta
        );

        console.log(
          "\nUma data começa a aparecer repetidamente nos arquivos corrompidos: 17 de março de 2139.\n".yellow
        );

        console.log("1. Cruzar registros históricos");
        console.log("2. Forçar leitura dos arquivos temporais");
        console.log("3. Viajar diretamente para a data suspeita");

        let escolhaMissao6 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao6) {

          case "1":

            if (sanidade < 25) {
              console.log(
                "\nSua sanidade está muito baixa para comparar linhas históricas conflitantes.".red
              );
              break;
            }

            sanidade -= 25;
            suspeitaComissao += 5;

            pistas.push(
              "A data provável do ponto de ignição foi 17 de março de 2139."
            );

            console.log("-25 sanidade");
            console.log("+5 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "2":

            if (energiaTemporal < 70) {
              console.log(
                "\nVocê não possui energia temporal suficiente para forçar a leitura dos arquivos.".red
              );
              break;
            }

            energiaTemporal -= 70;
            estabilidadeTemporal -= 20;
            suspeitaComissao += 15;

            pistas.push(
              "Arquivos temporais corrompidos confirmam que 17 de março de 2139 foi a data do ponto de ignição."
            );

            console.log("-70 energia temporal");
            console.log("-20 estabilidade temporal");
            console.log("+15 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "3":

            if (energiaTemporal < 90) {
              console.log(
                "\nVocê não possui energia temporal suficiente para viajar diretamente até a data suspeita.".red
              );
              break;
            }

            if (estabilidadeTemporal < 40) {
              console.log(
                "\nA estabilidade temporal está muito baixa para uma viagem tão precisa.".red
              );
              break;
            }

            energiaTemporal -= 90;
            estabilidadeTemporal -= 40;
            suspeitaComissao += 30;

            pistas.push(
              "Você presenciou ecos do ponto de ignição em Belíndia no dia 17 de março de 2139."
            );

            console.log("-90 energia temporal");
            console.log("-40 estabilidade temporal");
            console.log("+30 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê perdeu a janela de sincronização dos arquivos temporais.".gray
            );
        }

      } else if (rodadaAtual === 7) {

        console.log("\n===== MISSÃO 7: O PARADOXO ORIGINAL =====".red);

        console.log(
          "\nAo retornar para Belíndia na data do ponto de ignição, você percebe inconsistências impossíveis nos registros temporais.".magenta
        );

        console.log(
          "\nA linha temporal do colapso não parece ser a original.".yellow
        );

        console.log(
          "\nAlguém alterou cuidadosamente os eventos daquele dia e apagou quase todos os rastros.".yellow
        );

        console.log(
          "\nFragmentos recuperados dos arquivos da Comissão apontam para um nome que você jamais esperava encontrar.\n".red
        );

        console.log(
          "Seu mentor.".cyan
        );

        console.log(
          "\nVocê descobre que ele salvou uma menina destinada a morrer brutalmente em Belíndia.".magenta
        );

        console.log(
          "\nA alteração foi escondida durante décadas, mas acabou desencadeando uma reação em cadeia que culminou no colapso civilizacional.".magenta
        );

        console.log(
          "\nO que deseja fazer?\n".yellow
        );

        console.log("1. Confrontar diretamente seu mentor");
        console.log("2. Investigar secretamente a menina");
        console.log("3. Acessar arquivos proibidos da Comissão");

        let escolhaMissao7 = prompt("\nEscolha uma opção: ");

        switch (escolhaMissao7) {

          case "1":

            if (sanidade < 30) {

              console.log(
                "\nSua mente está instável demais para enfrentar essa verdade.".red
              );

              break;
            }

            sanidade -= 30;
            suspeitaComissao += 20;

            pistas.push(
              "Seu mentor alterou a linha temporal original ao salvar uma menina destinada a morrer em Belíndia."
            );

            console.log("-30 sanidade");
            console.log("+20 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "2":

            if (energiaTemporal < 50) {

              console.log(
                "\nVocê não possui energia temporal suficiente para rastrear a garota sem ser detectado.".red
              );

              break;
            }

            energiaTemporal -= 50;
            suspeitaComissao += 10;

            pistas.push(
              "A sobrevivência da menina alterou silenciosamente toda a cadeia causal da humanidade."
            );

            console.log("-50 energia temporal");
            console.log("+10 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          case "3":

            if (estabilidadeTemporal < 50) {

              console.log(
                "\nA estabilidade temporal está muito baixa para acessar arquivos proibidos da Comissão.".red
              );

              break;
            }

            estabilidadeTemporal -= 50;
            suspeitaComissao += 35;

            pistas.push(
              "A Comissão descobriu a alteração temporal décadas atrás, mas parte dela decidiu esconder a verdade."
            );

            console.log("-50 estabilidade temporal");
            console.log("+35 suspeita da Comissão");
            console.log("+1 pista");

            rodadaAtual++;

            break;


          default:

            console.log(
              "\nVocê hesitou diante da verdade e perdeu acesso aos registros proibidos.".gray
            );
        }

      } else {

        console.log(
          "\nAinda não há novas missões programadas nesta versão do protótipo.".yellow
        );
      }

      verificarDerrota();
      executarEventoAleatorio();
      comercianteTemporal();

      break;


    case "6":

      console.log("\nEncerrando jogo...".red);

      jogoAtivo = false;

      break;


    default:

      console.log("\nOpção inválida.".red);
  }
}

