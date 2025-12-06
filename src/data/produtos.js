// ============================================================================
// DADOS DOS PRODUTOS
// ============================================================================
export const produtos = [
    {
        id: 1,
        nome: "Laço festa",
        preco: 44.99,
        imagem: "/produtos/laco-festa.jpeg",
        categoria: "Laços",
        promocao: false,
        tamanho: "G",
        material: "Gorgurão",
        detalhes: "Com bordado em pérola",
        descricao: "Laço festa tamanho G, bordado em pérola. Perfeito para ocasiões especiais!"
    },
    {
        id: 2,
        nome: "Faixa RN festa",
        preco: 35.99,
        imagem: "/produtos/faixa-rn-festa.jpeg",
        categoria: "Faixas",
        promocao: true,
        tamanho: "M",
        material: "Tecido",
        detalhes: "Bordada com pérola e stress",
        descricao: "Faixa delicada para recém-nascidos, bordada com pérola e stress."
    },
    {
        id: 3,
        nome: "Parzinho festa",
        preco: 39.99,
        imagem: "/produtos/parzinho-festa.jpeg",
        categoria: "Kits",
        promocao: false,
        tamanho: "P",
        material: "Linho",
        detalhes: "Em linho",
        descricao: "Par de laços pequenos em linho, ideal para o dia a dia."
    },
    {
        id: 4,
        nome: "Laço festa Jesus",
        preco: 21.99,
        imagem: "/produtos/laco-festa-jesus.jpeg",
        categoria: "Laços",
        promocao: false,
        tamanho: "M",
        material: "Gorgurão",
        detalhes: "Laço em gorgurão",
        descricao: "Laço médio em gorgurão de alta qualidade."
    },
    {
        id: 5,
        nome: "Tiara festa",
        preco: 29.99,
        imagem: "/produtos/tiara-festa.jpeg",
        categoria: "Tiaras",
        promocao: true,
        tamanho: "G",
        material: "Arco com stress",
        detalhes: "No arco em stress",
        descricao: "Tiara grande com arco reforçado em stress. Valor por unidade."
    },
    {
        id: 6,
        nome: "Laço em linho",
        preco: 24.99,
        imagem: "/produtos/laço-em-linho.jpeg",
        categoria: "Laços",
        promocao: false,
        tamanho: "M",
        material: "Linho",
        detalhes: "Em linho natural",
        descricao: "Laço médio confeccionado em linho natural e delicado."
    },
    {
        id: 7,
        nome: "Laço em cetim",
        preco: 29.99,
        imagem: "/produtos/laço-em-cetim.jpeg",
        categoria: "Laços",
        promocao: false,
        tamanho: "G",
        material: "Cetim",
        detalhes: "Em cetim brilhante",
        descricao: "Laço grande em cetim com brilho elegante."
    },
    {
        id: 8,
        nome: "Laço Itiele",
        preco: 19.99,
        imagem: "/produtos/laco-itiele.jpeg",
        categoria: "Laços",
        promocao: true,
        tamanho: "M",
        material: "Gorgurão",
        detalhes: "Modelo Itiele",
        descricao: "Laço médio no estilo Itiele, clássico e elegante."
    },
    {
        id: 9,
        nome: "Laço Itiele cetim",
        preco: 14.99,
        imagem: "/produtos/laco-itiele-cetim.jpeg",
        categoria: "Laços",
        promocao: true,
        tamanho: "M",
        material: "Cetim",
        detalhes: "Modelo Itiele em cetim",
        descricao: "Laço médio Itiele em cetim acetinado."
    },
];

// ============================================================================
// BANNERS ROTATIVOS
// ============================================================================
export const banners = [
    { texto: "🎀 Laços Exclusivos para sua Princesa" },
    { texto: "✨ Frete Grátis acima de R$ 100" },
    { texto: "💕 Feito com Amor e Carinho" }
];

// ============================================================================
// TABELA DE TAMANHOS
// ============================================================================
export const tabelaTamanhos = {
    P: {
        dimensao: "7-8cm",
        peso: "10-15g",
        frete: "Carta simples",
        descricao: "Ideal para bebês e uso diário"
    },
    M: {
        dimensao: "10-12cm",
        peso: "20-30g",
        frete: "Carta registrada",
        descricao: "Perfeito para crianças e eventos"
    },
    G: {
        dimensao: "14-16cm",
        peso: "35-50g",
        frete: "PAC",
        descricao: "Destaque para festas e ocasiões especiais"
    }
};