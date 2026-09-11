// ======================================================
// MENU DO JOGO
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


let mapaSelecionado =
    null;


// ======================================================
// ESCOLHER MAPA
// ======================================================

cardsMapas.forEach(
    function(card) {

        card.addEventListener(
            "click",
            function() {

                mapaSelecionado =
                    card.dataset.mapa;


                console.log(
                    "Mapa selecionado:",
                    mapaSelecionado
                );


                cardsMapas.forEach(
                    function(outroCard) {

                        outroCard.classList.remove(
                            "selecionado"
                        );

                    }
                );


                card.classList.add(
                    "selecionado"
                );


                if (menuModos) {

                    menuModos.classList.add(
                        "visivel"
                    );

                }

            }
        );

    }
);


// ======================================================
// ESCOLHER MODO
// ======================================================

botoesModo.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                if (!mapaSelecionado) {

                    alert(
                        "Escolha um mapa primeiro."
                    );

                    return;

                }


                const modo =
                    botao.dataset.modo;


                const destino =
                    `./jogo.html?mapa=${encodeURIComponent(mapaSelecionado)}&modo=${encodeURIComponent(modo)}`;


                console.log(
                    "Abrindo:",
                    destino
                );


                window.location.href =
                    destino;

            }
        );

    }
);


// ======================================================
// MODO PROVA
// ======================================================

if (botaoIniciarProva) {

    botaoIniciarProva.addEventListener(
        "click",
        function() {

            const quantidade =
                Number(
                    quantidadeProva.value
                );


            const modo =
                modoRespostaProva.value;


            if (
                !Number.isInteger(quantidade) ||
                quantidade < 1
            ) {

                alert(
                    "Digite uma quantidade válida de questões."
                );

                return;

            }


            window.location.href =
                `./prova.html?quantidade=${quantidade}&modo=${encodeURIComponent(modo)}`;

        }
    );

}
