// ======================================================
// MENU DO JOGO — NEUROGAME
// ======================================================


// ======================================================
// ELEMENTOS
// ======================================================

const cardsMapas =
    document.querySelectorAll(
        ".card-mapa"
    );


const menuModos =
    document.getElementById(
        "menuModos"
    );


const botoesModo =
    document.querySelectorAll(
        ".botao-modo"
    );


const botaoIniciarProva =
    document.getElementById(
        "iniciarProva"
    );


const quantidadeProva =
    document.getElementById(
        "quantidadeProva"
    );


const modoRespostaProva =
    document.getElementById(
        "modoRespostaProva"
    );


// ======================================================
// MAPA SELECIONADO
// ======================================================

let mapaSelecionado =
    null;


// ======================================================
// CARDS DOS MAPAS
// ======================================================

cardsMapas.forEach(
    function(card) {

        card.addEventListener(
            "click",

            function() {

                // --------------------------------------
                // Pegar ID do mapa
                // --------------------------------------

                mapaSelecionado =
                    card.dataset.mapa;


                console.log(
                    "Mapa selecionado:",
                    mapaSelecionado
                );


                // --------------------------------------
                // Remover seleção dos outros cards
                // --------------------------------------

                cardsMapas.forEach(
                    function(outroCard) {

                        outroCard
                            .classList
                            .remove(
                                "selecionado"
                            );

                    }
                );


                // --------------------------------------
                // Selecionar card atual
                // --------------------------------------

                card
                    .classList
                    .add(
                        "selecionado"
                    );


                // --------------------------------------
                // Mostrar opções de modo
                // --------------------------------------

                menuModos
                    .classList
                    .add(
                        "visivel"
                    );

            }
        );

    }
);


// ======================================================
// MODOS DE JOGO
// ======================================================

botoesModo.forEach(
    function(botao) {

        botao.addEventListener(
            "click",

            function() {

                if (
                    !mapaSelecionado
                ) {

                    alert(
                        "Escolha um mapa primeiro."
                    );

                    return;

                }


                const modo =
                    botao.dataset.modo;


                console.log(
                    "Abrindo:",
                    mapaSelecionado,
                    modo
                );


                window.location.href =
                    `jogo.html?mapa=${mapaSelecionado}&modo=${modo}`;

            }
        );

    }
);


// ======================================================
// MODO PROVA
// ======================================================

if (
    botaoIniciarProva
) {

    botaoIniciarProva.addEventListener(
        "click",

        function() {

            const quantidade =
                parseInt(
                    quantidadeProva.value
                );


            const modo =
                modoRespostaProva.value;


            if (
                !quantidade ||
                quantidade < 1
            ) {

                alert(
                    "Informe uma quantidade válida de questões."
                );

                return;

            }


            window.location.href =
                `prova.html?quantidade=${quantidade}&modo=${modo}`;

        }
    );

}