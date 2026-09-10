// ======================================================
// CATÁLOGO DE MAPAS — NEUROGAME
// ======================================================


// ======================================================
// VERIFICAÇÃO DOS MAPAS CARREGADOS
// ======================================================

console.log(
    "Lateral:",
    typeof mapaTelencefaloLateral
);

console.log(
    "Medial:",
    typeof mapaTelencefaloMedial
);

console.log(
    "Cadáver lateral:",
    typeof mapaCadaverSulcosTelencefaloLateral
);


// ======================================================
// CATÁLOGO
// ======================================================

const catalogoMapas = [

    // ==================================================
    // TELENCÉFALO — VISTA LATERAL
    // ==================================================

    {
        id:
            "telencefalo-lateral",

        titulo:
            "Telencéfalo — Vista Lateral",

        imagem:
            "../imagens/PalcoTelencefalo.png",

        estruturas:
            mapaTelencefaloLateral
    },


    // ==================================================
    // TELENCÉFALO — VISTA MEDIAL
    // ==================================================

    {
        id:
            "telencefalo-medial",

        titulo:
            "Telencéfalo — Vista Medial",

        imagem:
            "../imagens/PalcoTelencefaloMedial.png",

        estruturas:
            mapaTelencefaloMedial
    },


    // ==================================================
    // CADÁVER — SULCOS TELENCÉFALO LATERAL
    // ==================================================

    {
        id:
            "cadavertelencefalo-lateral",

        titulo:
            "Sulcos Telencéfalo — Vista Lateral",

        imagem:
            "../imagens/CadaverTelencefaloLateral.png",

        estruturas:
            mapaCadaverSulcosTelencefaloLateral
    }

];


// ======================================================
// VERIFICAÇÕES
// ======================================================

console.log(
    "Catálogo carregado:",
    catalogoMapas
);


console.log(
    "Qtd lateral:",
    mapaTelencefaloLateral.length
);


console.log(
    "Qtd medial:",
    mapaTelencefaloMedial.length
);


console.log(
    "Qtd cadáver lateral:",
    mapaCadaverSulcosTelencefaloLateral.length
);


console.log(
    "Qtd de mapas no catálogo:",
    catalogoMapas.length
);
