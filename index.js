/// Importa o prompt-sync para permitir entrada de dados
const prompt = require("prompt-sync")();


// Importa o colors para colorir textos no terminal
require("colors");


// Vetor com nomes de personagens secundários
const nomesSecundarios = [
    "Marco Zinho de Oliveira",
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
    "Racha Cuca",
    "Alma Negra",
    "Quase Nada",
    "Poucas Trancas",
    "Pompilho Pomposo Pompeu"
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

// Loop principal do jogo
while (jogoAtivo) {

    console.log("\n===== MENU PRINCIPAL =====".green);

    console.log("1. Ver status");
    console.log("2. Ver inventário");
    console.log("3. Ver pistas");
    console.log("4. Alterar status");
    console.log("5. Iniciar missão");
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

            break;


        case "2":

            console.log("\n===== INVENTÁRIO =====".yellow);

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

                    break;


                default:

                    console.log(
                        "\nVocê hesitou e perdeu a oportunidade.".gray
                    );
            }

            verificarDerrota();

            break;


        case "6":

            console.log("\nEncerrando jogo...".red);

            jogoAtivo = false;

            break;


        default:

            console.log("\nOpção inválida.".red);
    }
}