// ======================================================
// 1. LER URL
// ======================================================

const parametros =
    new URLSearchParams(
        window.location.search
    );

const mapaSelecionado =
    parametros.get("mapa");

const modoSelecionado =
    parametros.get("modo");


console.log(
    "URL completa:",
    window.location.href
);

console.log(
    "Mapa selecionado:",
    mapaSelecionado
);

console.log(
    "Modo selecionado:",
    modoSelecionado
);


// ======================================================
// 2. ELEMENTOS HTML
// ======================================================

const imagem =
    document.getElementById(
        "imagemAnatomica"
    );

const pergunta =
    document.getElementById(
        "pergunta"
    );

const svg =
    document.getElementById(
        "camadaHotspots"
    );


// ======================================================
// 3. LOCALIZAR MAPA
// ======================================================

console.log(
    "Catálogo recebido pelo game:",
    catalogoMapas
);


const mapaAtual =
    catalogoMapas.find(
        function(mapa) {

            return (
                mapa.id ===
                mapaSelecionado
            );

        }
    );


// ======================================================
// 4. VERIFICAR MAPA
// ======================================================

if (!mapaAtual) {

    pergunta.textContent =
        "Erro: mapa não encontrado.";

    console.error(
        "Mapa não encontrado:",
        mapaSelecionado
    );

    throw new Error(
        "Mapa não encontrado."
    );

}


console.log(
    "Mapa atual:",
    mapaAtual
);

console.log(
    "Estruturas recebidas:",
    mapaAtual.estruturas
);

console.log(
    "Quantidade recebida:",
    mapaAtual.estruturas.length
);


// ======================================================
// 5. CRIAR HOTSPOTS
// ======================================================

function criarHotspots(mapa) {

    // Limpa qualquer estrutura antiga
    svg.innerHTML = "";


    // Usa exatamente as dimensões naturais
    // da imagem como sistema de coordenadas
    svg.setAttribute(
        "viewBox",
        `0 0 ${imagem.naturalWidth} ${imagem.naturalHeight}`
    );


    mapa.estruturas.forEach(
        function(estrutura) {

            let elemento;


            // ==========================================
            // SE FOR LINHA
            // ==========================================

            if (
                estrutura.tipo ===
                "linha"
            ) {

                elemento =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "polyline"
                    );


                elemento.classList.add(
                    "estrutura",
                    "estrutura-linha"
                );


                elemento.setAttribute(
                    "fill",
                    "none"
                );

            }


            // ==========================================
            // SE FOR ÁREA
            // ==========================================

            else {

                elemento =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "polygon"
                    );


                elemento.classList.add(
                    "estrutura",
                    "estrutura-area"
                );

            }


            // ==========================================
            // DADOS COMUNS
            // ==========================================

            elemento.setAttribute(
                "id",
                estrutura.id
            );


            elemento.setAttribute(
                "points",
                estrutura.pontos
            );


            elemento.dataset.id =
                estrutura.id;


            elemento.dataset.nome =
                estrutura.nome;


            elemento.dataset.info =
                estrutura.info || "";


            elemento.dataset.tipo =
                estrutura.tipo || "area";


            svg.appendChild(
                elemento
            );

        }
    );


    console.log(
        "Hotspots criados:",
        document.querySelectorAll(
            ".estrutura"
        ).length
    );

}

// ======================================================
// 6. INICIAR MODO
// ======================================================

function iniciarModo() {

    document.body.classList.remove(
        "modo-clicar",
        "modo-digitar"
    );

    if (modoSelecionado === "clicar") {

        document.body.classList.add(
            "modo-clicar"
        );

        iniciarModoClicar(
            mapaAtual
        );

    }

    else if (modoSelecionado === "digitar") {

        document.body.classList.add(
            "modo-digitar"
        );

        iniciarModoDigitar(
            mapaAtual
        );

    }

}


// ======================================================
// 7. CARREGAR IMAGEM
// ======================================================

imagem.onload =
    function() {

        console.log(
            "Imagem carregada:",
            imagem.naturalWidth,
            imagem.naturalHeight
        );


        // PRIMEIRO cria os polígonos
        criarHotspots(
            mapaAtual
        );


        console.log(
            "Polígonos antes do modo:",
            document.querySelectorAll(
                ".estrutura"
            ).length
        );


        // SÓ DEPOIS inicia o jogo
        iniciarModo();

    };


// Essa linha deve ficar depois de definir o onload
imagem.src =
    mapaAtual.imagem;