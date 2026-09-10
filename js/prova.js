// ======================================================
// PROVA — NEUROGAME
// ======================================================


// ======================================================
// 1. LER PARÂMETROS DA URL
// ======================================================

const parametros =
    new URLSearchParams(
        window.location.search
    );

const quantidadeSolicitada =
    Number(
        parametros.get("quantidade")
    );

const modoProva =
    parametros.get("modo");


console.log(
    "📝 Modo prova iniciado"
);

console.log(
    "Quantidade solicitada:",
    quantidadeSolicitada
);

console.log(
    "Modo da prova:",
    modoProva
);

console.log(
    "Catálogo:",
    catalogoMapas
);


// ======================================================
// 2. ELEMENTOS HTML
// ======================================================

const imagem =
    document.getElementById(
        "imagemAnatomica"
    );

const svg =
    document.getElementById(
        "camadaHotspots"
    );

const pergunta =
    document.getElementById(
        "pergunta"
    );

const pontosElemento =
    document.getElementById(
        "pontos"
    );

const errosElemento =
    document.getElementById(
        "erros"
    );

const numeroQuestao =
    document.getElementById(
        "numeroQuestao"
    );

const totalQuestoes =
    document.getElementById(
        "totalQuestoes"
    );

const feedback =
    document.getElementById(
        "feedback"
    );


// ======================================================
// 3. ESTADO DA PROVA
// ======================================================

let pontos = 0;

let erros = 0;

let questaoAtual = 0;

let inicioQuestao = 0;

let tentativasQuestao = 0;

let bloqueado = false;

let questaoEmAndamento = null;


// ======================================================
// 4. EMBARALHAR
// ======================================================

function embaralhar(lista) {

    const copia =
        [...lista];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];

    }


    return copia;
}


// ======================================================
// 5. CRIAR BANCO COM TODOS OS MAPAS
// ======================================================

function criarBancoQuestoes() {

    const banco = [];


    catalogoMapas.forEach(
        function(mapa) {

            mapa.estruturas.forEach(
                function(estrutura) {

                    banco.push({

                        mapaId:
                            mapa.id,

                        mapaTitulo:
                            mapa.titulo,

                        imagem:
                            mapa.imagem,

                        estrutura:
                            estrutura,

                        estruturasDoMapa:
                            mapa.estruturas

                    });

                }
            );

        }
    );


    return banco;
}


// ======================================================
// 6. CRIAR PROVA
// ======================================================

const bancoQuestoes =
    criarBancoQuestoes();


const bancoEmbaralhado =
    embaralhar(
        bancoQuestoes
    );


const quantidadeReal =
    Math.min(
        quantidadeSolicitada,
        bancoEmbaralhado.length
    );


const questoesProva =
    bancoEmbaralhado.slice(
        0,
        quantidadeReal
    );


totalQuestoes.textContent =
    questoesProva.length;


console.log(
    "Questões sorteadas:",
    questoesProva
);


// ======================================================
// 7. CRIAR HOTSPOTS DO MAPA ATUAL
// ======================================================

function criarHotspots(
    estruturas
) {

    svg.innerHTML =
        "";


    svg.setAttribute(
        "viewBox",
        `0 0 ${imagem.naturalWidth} ${imagem.naturalHeight}`
    );


    estruturas.forEach(
        function(estrutura) {

            const poligono =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "polygon"
                );


            poligono.setAttribute(
                "class",
                "estrutura"
            );


            poligono.setAttribute(
                "points",
                estrutura.pontos
            );


            poligono.dataset.id =
                estrutura.id;


            poligono.dataset.nome =
                estrutura.nome;


            poligono.dataset.info =
                estrutura.info || "";


            svg.appendChild(
                poligono
            );

        }
    );

}


// ======================================================
// 8. NOVA QUESTÃO
// ======================================================

function novaQuestao() {

    if (
        questaoAtual >=
        questoesProva.length
    ) {

        finalizarProva();

        return;
    }


    bloqueado =
        false;


    tentativasQuestao =
        0;


    questaoEmAndamento =
        questoesProva[
            questaoAtual
        ];


    numeroQuestao.textContent =
        questaoAtual + 1;


    feedback.textContent =
        "";


    pergunta.textContent =
        `Clique em: ${questaoEmAndamento.estrutura.nome}`;


    imagem.onload =
        function() {

            criarHotspots(
                questaoEmAndamento
                    .estruturasDoMapa
            );


            ativarCliques();


            inicioQuestao =
                performance.now();

        };


    imagem.src =
        questaoEmAndamento.imagem;

}


// ======================================================
// 9. ATIVAR CLIQUES
// ======================================================

function ativarCliques() {

    const estruturasSVG =
        Array.from(
            document.querySelectorAll(
                ".estrutura"
            )
        );


    estruturasSVG.forEach(
        function(estrutura) {

            estrutura.addEventListener(
                "click",

                function() {

                    verificarResposta(
                        estrutura
                    );

                }
            );

        }
    );

}


// ======================================================
// 10. VERIFICAR RESPOSTA
// ======================================================

function verificarResposta(
    estruturaClicada
) {

    if (bloqueado) {
        return;
    }


    // No modo prova só existe
    // uma tentativa por questão

    tentativasQuestao++;


    const tempoResposta =
        performance.now() -
        inicioQuestao;


    const acertou =
        estruturaClicada.dataset.id ===
        questaoEmAndamento.estrutura.id;


    // ==================================================
    // ACERTO
    // ==================================================

    if (acertou) {

        bloqueado =
            true;


        pontos +=
            100;


        pontosElemento.textContent =
            pontos;


        feedback.textContent =
            "✅ Correto!";


        estruturaClicada
            .classList
            .add(
                "correto"
            );


        // ==============================
        // ANALYTICS
        // ==============================

        if (
            typeof registrarResposta ===
            "function"
        ) {

            registrarResposta({

                mapa:
                    questaoEmAndamento
                        .mapaId,

                modo:
                    "prova-clicar",

                estruturaId:
                    questaoEmAndamento
                        .estrutura.id,

                estruturaNome:
                    questaoEmAndamento
                        .estrutura.nome,

                resposta:
                    estruturaClicada
                        .dataset.nome,

                acertou:
                    true,

                tentativas:
                    tentativasQuestao,

                tempoResposta:
                    tempoResposta,

                pontos:
                    pontos

            });

        }


        // ==============================
        // PRÓXIMA QUESTÃO
        // ==============================

        setTimeout(
            function() {

                estruturaClicada
                    .classList
                    .remove(
                        "correto"
                    );


                questaoAtual++;


                novaQuestao();

            },

            1000
        );

    }


    // ==================================================
    // ERRO
    // ==================================================

    else {

        bloqueado =
            true;


        erros++;


        errosElemento.textContent =
            erros;


        feedback.textContent =
            "❌ Errado!";


        estruturaClicada
            .classList
            .add(
                "errado"
            );


        // ==============================
        // ANALYTICS
        // ==============================

        if (
            typeof registrarResposta ===
            "function"
        ) {

            registrarResposta({

                mapa:
                    questaoEmAndamento
                        .mapaId,

                modo:
                    "prova-clicar",

                estruturaId:
                    questaoEmAndamento
                        .estrutura.id,

                estruturaNome:
                    questaoEmAndamento
                        .estrutura.nome,

                resposta:
                    estruturaClicada
                        .dataset.nome,

                acertou:
                    false,

                tentativas:
                    tentativasQuestao,

                tempoResposta:
                    tempoResposta,

                pontos:
                    pontos

            });

        }


        // ==============================
        // PRÓXIMA QUESTÃO
        // ==============================

        setTimeout(
            function() {

                estruturaClicada
                    .classList
                    .remove(
                        "errado"
                    );


                questaoAtual++;


                novaQuestao();

            },

            1000
        );

    }

}


// ======================================================
// 11. FINALIZAR PROVA
// ======================================================

function finalizarProva() {

    bloqueado =
        true;


    pergunta.textContent =
        "🎉 Prova concluída!";


    feedback.textContent =
        `Pontuação: ${pontos} | Erros: ${erros}`;


    svg.innerHTML =
        "";

}


// ======================================================
// 12. INICIAR
// ======================================================

if (
    modoProva !== "clicar"
) {

    pergunta.textContent =
        "Modo de prova ainda não implementado.";


    console.warn(
        "Modo solicitado:",
        modoProva
    );

}

else {

    // Permite hover apenas
    // no modo clicar

    document.body
        .classList
        .add(
            "modo-clicar"
        );


    novaQuestao();

}