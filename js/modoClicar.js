function iniciarModoClicar(mapaAtual) {

    // =============================
    // ELEMENTOS HTML
    // =============================

    const pontosElemento =
        document.getElementById("pontos");

    const errosElemento =
        document.getElementById("erros");

    const numeroQuestao =
        document.getElementById("numeroQuestao");

    const totalQuestoes =
        document.getElementById("totalQuestoes");

    const pergunta =
        document.getElementById("pergunta");

    const feedback =
        document.getElementById("feedback");

    const acoesPartida =
        document.getElementById("acoesPartida");

    const botaoReiniciar =
        document.getElementById("reiniciarPartida");

    const botaoVoltar =
        document.getElementById("voltarMenu");


    // =============================
    // POLÍGONOS
    // =============================

    const estruturasSVG =
        Array.from(
            document.querySelectorAll(".estrutura")
        );


    console.log(
        "Modo clicar iniciado"
    );

    console.log(
        "Quantidade de polígonos:",
        estruturasSVG.length
    );


    // =============================
    // ESTADO DO JOGO
    // =============================

    let pontos = 0;

    let erros = 0;

    let questaoAtual = 0;

    let estruturaAtual = null;

    let bloqueado = false;

    let primeiraResposta = false;

    let inicioQuestao = 0;

    let tentativasQuestao = 0;


    // =============================
    // EMBARALHAR
    // =============================

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


    // =============================
    // ORDEM DAS QUESTÕES
    // =============================

    const ordemQuestoes =
        embaralhar(
            estruturasSVG
        );


    totalQuestoes.textContent =
        ordemQuestoes.length;


    // =============================
    // MOSTRAR AÇÕES
    // =============================

    function mostrarAcoesPartida() {

        if (primeiraResposta) {
            return;
        }


        primeiraResposta = true;


        if (acoesPartida) {

            acoesPartida
                .classList
                .add("visivel");

        }

    }


    // =============================
    // NOVA QUESTÃO
    // =============================

    function novaQuestao() {

        if (
            questaoAtual >=
            ordemQuestoes.length
        ) {

            finalizarJogo();

            return;
        }


        estruturaAtual =
            ordemQuestoes[
                questaoAtual
            ];


        pergunta.textContent =
            `Clique em: ${estruturaAtual.dataset.nome}`;


        numeroQuestao.textContent =
            questaoAtual + 1;


        feedback.textContent =
            "";


        bloqueado =
            false;


        // Reinicia as tentativas
        // da nova estrutura

        tentativasQuestao =
            0;


        // Inicia o cronômetro
        // da questão

        inicioQuestao =
            performance.now();


        console.log(
            "Estrutura atual:",
            estruturaAtual.dataset.nome
        );

    }


    // =============================
    // VERIFICAR RESPOSTA
    // =============================

    function verificarResposta(
        estruturaClicada
    ) {

        if (bloqueado) {
            return;
        }


        // Conta a tentativa

        tentativasQuestao++;


        // Tempo desde o início
        // da pergunta

        const tempoResposta =
            performance.now() -
            inicioQuestao;


        mostrarAcoesPartida();


        // =========================
        // ACERTO
        // =========================

        if (
            estruturaClicada ===
            estruturaAtual
        ) {

            bloqueado =
                true;


            // Primeiro atualiza pontos

            pontos +=
                100;


            pontosElemento.textContent =
                pontos;


            // Depois registra analytics

            registrarResposta({

                mapa:
                    mapaAtual.id,

                modo:
                    "clicar",

                estruturaId:
                    estruturaAtual.dataset.id,

                estruturaNome:
                    estruturaAtual.dataset.nome,

                resposta:
                    estruturaClicada.dataset.nome,

                acertou:
                    true,

                tentativas:
                    tentativasQuestao,

                tempoResposta:
                    tempoResposta,

                pontos:
                    pontos

            });


            feedback.textContent =
                "✅ Correto!";


            estruturaClicada
                .classList
                .add("correto");


            setTimeout(
                function() {

                    estruturaClicada
                        .classList
                        .remove("correto");


                    questaoAtual++;


                    novaQuestao();

                },

                1000
            );

        }


        // =========================
        // ERRO
        // =========================

        else {

            erros++;


            errosElemento.textContent =
                erros;


            registrarResposta({

                mapa:
                    mapaAtual.id,

                modo:
                    "clicar",

                estruturaId:
                    estruturaAtual.dataset.id,

                estruturaNome:
                    estruturaAtual.dataset.nome,

                resposta:
                    estruturaClicada.dataset.nome,

                acertou:
                    false,

                tentativas:
                    tentativasQuestao,

                tempoResposta:
                    tempoResposta,

                pontos:
                    pontos

            });


            feedback.textContent =
                "❌ Tente novamente.";


            estruturaClicada
                .classList
                .add("errado");


            setTimeout(
                function() {

                    estruturaClicada
                        .classList
                        .remove("errado");

                },

                500
            );

        }

    }


    // =============================
    // FINALIZAR JOGO
    // =============================

    function finalizarJogo() {

        bloqueado =
            true;


        pergunta.textContent =
            "🎉 Fim da rodada!";


        feedback.textContent =
            `Pontuação: ${pontos} | Erros: ${erros}`;


        if (acoesPartida) {

            acoesPartida
                .classList
                .add("visivel");

        }

    }


    // =============================
    // CLIQUES NOS POLÍGONOS
    // =============================

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


    // =============================
    // REINICIAR
    // =============================

    if (botaoReiniciar) {

        botaoReiniciar.addEventListener(
            "click",

            function() {

                window.location.reload();

            }
        );

    }


    // =============================
    // VOLTAR AO MENU
    // =============================

    if (botaoVoltar) {

        botaoVoltar.addEventListener(
            "click",

            function() {

                window.location.href =
                    "index.html";

            }
        );

    }


    // =============================
    // COMEÇAR
    // =============================

    novaQuestao();

}