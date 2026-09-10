function iniciarModoDigitar() {

    console.log(
        "Modo digitar iniciado"
    );

}

function iniciarModoDigitar(mapaAtual) {

    // ==================================================
    // ELEMENTOS HTML
    // ==================================================

    const pergunta =
        document.getElementById(
            "pergunta"
        );

    const feedback =
        document.getElementById(
            "feedback"
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

    const areaDigitar =
        document.getElementById(
            "areaDigitar"
        );

    const campoResposta =
        document.getElementById(
            "respostaDigitada"
        );

    const botaoResponder =
        document.getElementById(
            "confirmarResposta"
        );

    const caixaInfo =
        document.getElementById(
            "infoEstrutura"
        );

    const acoesPartida =
        document.getElementById(
            "acoesPartida"
        );

    const botaoReiniciar =
        document.getElementById(
            "reiniciarPartida"
        );

    const botaoVoltar =
        document.getElementById(
            "voltarMenu"
        );


    // ==================================================
    // POLÍGONOS
    // ==================================================

    const estruturasSVG =
        Array.from(
            document.querySelectorAll(
                ".estrutura"
            )
        );


    console.log(
        "Modo digitar iniciado"
    );

    console.log(
        "Estruturas disponíveis:",
        estruturasSVG.length
    );


    // ==================================================
    // ESTADO
    // ==================================================

    let pontos = 0;

    let erros = 0;

    let questaoAtual = 0;

    let estruturaAtual = null;

    let bloqueado = false;

    let primeiraResposta = false;


    // ==================================================
    // NORMALIZAR TEXTO
    // ==================================================

    function normalizar(texto) {

        return texto
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .replace(
                /[-_]/g,
                " "
            )
            .replace(
                /\s+/g,
                " "
            )
            .trim();

    }


    // ==================================================
    // EMBARALHAR
    // ==================================================

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


    // ==================================================
    // ORDEM DAS QUESTÕES
    // ==================================================

    let ordemQuestoes =
        embaralhar(
            estruturasSVG
        );


    totalQuestoes.textContent =
        ordemQuestoes.length;


    // Mostrar campo de digitação
    areaDigitar
        .classList
        .add("visivel");


    // ==================================================
    // MOSTRAR BOTÕES DA PARTIDA
    // ==================================================

    function mostrarAcoesPartida() {

        if (primeiraResposta) {
            return;
        }


        primeiraResposta =
            true;


        if (acoesPartida) {

            acoesPartida
                .classList
                .add("visivel");

        }

    }


    // ==================================================
    // LIMPAR DESTAQUES
    // ==================================================

    function limparDestaques() {

        estruturasSVG.forEach(
            function(estrutura) {

                estrutura.classList.remove(
                    "destacada",
                    "correto",
                    "errado"
                );

            }
        );

    }


    // ==================================================
    // NOVA QUESTÃO
    // ==================================================

    function novaQuestao() {

        if (
            questaoAtual >=
            ordemQuestoes.length
        ) {

            finalizarJogo();

            return;

        }


        limparDestaques();


        estruturaAtual =
            ordemQuestoes[
                questaoAtual
            ];


        estruturaAtual
            .classList
            .add("destacada");


        pergunta.textContent =
            "Qual é a estrutura destacada?";


        numeroQuestao.textContent =
            questaoAtual + 1;


        feedback.textContent =
            "";


        if (caixaInfo) {

            caixaInfo.textContent =
                "";

        }


        campoResposta.value =
            "";


        campoResposta.disabled =
            false;


        botaoResponder.disabled =
            false;


        bloqueado =
            false;


        campoResposta.focus();


        console.log(
            "Resposta correta:",
            estruturaAtual.dataset.nome
        );

    }


    // ==================================================
    // VERIFICAR RESPOSTA
    // ==================================================

    function verificarResposta() {

        if (bloqueado) {
            return;
        }


        const respostaAluno =
            normalizar(
                campoResposta.value
            );


        if (!respostaAluno) {

            feedback.textContent =
                "Digite uma resposta.";

            return;

        }


        mostrarAcoesPartida();


        const respostaCorreta =
            normalizar(
                estruturaAtual.dataset.nome
            );


        // ==============================================
        // ACERTO
        // ==============================================

        if (
            respostaAluno ===
            respostaCorreta
        ) {

            bloqueado =
                true;


            pontos +=
                100;


            pontosElemento.textContent =
                pontos;


            feedback.textContent =
                "✅ Correto!";


            estruturaAtual
                .classList
                .remove(
                    "destacada"
                );


            estruturaAtual
                .classList
                .add(
                    "correto"
                );


            if (
                caixaInfo &&
                estruturaAtual.dataset.info
            ) {

                caixaInfo.textContent =
                    estruturaAtual.dataset.info;

            }


            campoResposta.disabled =
                true;


            botaoResponder.disabled =
                true;


            setTimeout(
                function() {

                    questaoAtual++;

                    novaQuestao();

                },

                1500
            );

        }


        // ==============================================
        // ERRO
        // ==============================================

        else {

            erros++;


            errosElemento.textContent =
                erros;


            feedback.textContent =
                "❌ Resposta incorreta. Tente novamente.";


            campoResposta.select();

        }

    }


    // ==================================================
    // FINALIZAR
    // ==================================================

    function finalizarJogo() {

        bloqueado =
            true;


        limparDestaques();


        pergunta.textContent =
            "🎉 Fim da rodada!";


        feedback.textContent =
            `Pontuação: ${pontos} | Erros: ${erros}`;


        campoResposta.disabled =
            true;


        botaoResponder.disabled =
            true;


        if (acoesPartida) {

            acoesPartida
                .classList
                .add("visivel");

        }

    }


    // ==================================================
    // BOTÃO RESPONDER
    // ==================================================

    botaoResponder.addEventListener(
        "click",
        verificarResposta
    );


    // ==================================================
    // ENTER TAMBÉM RESPONDE
    // ==================================================

    campoResposta.addEventListener(
        "keydown",
        function(evento) {

            if (
                evento.key ===
                "Enter"
            ) {

                verificarResposta();

            }

        }
    );


    // ==================================================
    // REINICIAR
    // ==================================================

    if (botaoReiniciar) {

        botaoReiniciar.addEventListener(
            "click",
            function() {

                window.location.reload();

            }
        );

    }


    // ==================================================
    // VOLTAR AO MENU
    // ==================================================

    if (botaoVoltar) {

        botaoVoltar.addEventListener(
            "click",
            function() {

                window.location.href =
                    "index.html";

            }
        );

    }


    // ==================================================
    // COMEÇAR
    // ==================================================

    novaQuestao();

}