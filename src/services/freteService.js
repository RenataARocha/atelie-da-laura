import axios from 'axios';

// ============================================================================
// SERVIÇO DE CÁLCULO DE FRETE
// ============================================================================

// CEP de origem (Laura - São Gonçalo do Amarante/RN)
const CEP_ORIGEM = '59296889'; // Ajuste para o CEP exato da Laura

// Função para calcular frete usando API dos Correios
export const calcularFrete = async (cepDestino, produtos) => {
    try {
        // Remove formatação do CEP
        const cepLimpo = cepDestino.replace(/\D/g, '');

        // Validação de CEP
        if (cepLimpo.length !== 8) {
            throw new Error('CEP inválido');
        }

        // Calcula peso e dimensões totais
        const pesoTotal = calcularPesoTotal(produtos);
        const dimensoes = calcularDimensoes(produtos);

        // Chamada para API pública dos Correios (via proxy)
        const response = await axios.post('https://api.correios.com.br/frete/v1/calcular', {
            cepOrigem: CEP_ORIGEM,
            cepDestino: cepLimpo,
            peso: pesoTotal,
            formato: 1, // Caixa/pacote
            comprimento: dimensoes.comprimento,
            altura: dimensoes.altura,
            largura: dimensoes.largura,
            diametro: 0,
            servicos: ['04510', '04014'] // PAC e SEDEX
        });

        return processarResposta(response.data);
    } catch (error) {
        console.error('Erro ao calcular frete:', error);

        // Fallback: retorna estimativa manual
        return calcularFreteManual(cepDestino, produtos);
    }
};

// Calcula peso total baseado nos produtos
const calcularPesoTotal = (produtos) => {
    const tabelaPeso = {
        P: 0.015, // 15g
        M: 0.025, // 25g
        G: 0.045  // 45g
    };

    return produtos.reduce((total, item) => {
        const peso = tabelaPeso[item.tamanho] || 0.025;
        return total + (peso * item.quantidade);
    }, 0);
};

// Calcula dimensões da embalagem
const calcularDimensoes = (produtos) => {
    const totalItens = produtos.reduce((sum, item) => sum + item.quantidade, 0);

    // Dimensões baseadas na quantidade de itens
    if (totalItens <= 2) {
        return { comprimento: 20, altura: 5, largura: 15 }; // Envelope
    } else if (totalItens <= 5) {
        return { comprimento: 25, altura: 8, largura: 18 }; // Caixa pequena
    } else {
        return { comprimento: 30, altura: 10, largura: 20 }; // Caixa média
    }
};

// Calcula frete manual como fallback
const calcularFreteManual = (cepDestino, produtos) => {
    const cepLimpo = cepDestino.replace(/\D/g, '');
    const totalItens = produtos.reduce((sum, item) => sum + item.quantidade, 0);

    // Calcula baseado na região (primeiros 2 dígitos do CEP)
    const regiao = parseInt(cepLimpo.substring(0, 2));

    let valorPAC = 0;
    let valorSEDEX = 0;

    // Rio Grande do Norte (59)
    if (regiao === 59) {
        valorPAC = 8 + (totalItens * 2);
        valorSEDEX = 15 + (totalItens * 3);
    }
    // Nordeste (50-59, exceto 59)
    else if (regiao >= 50 && regiao <= 58) {
        valorPAC = 12 + (totalItens * 2.5);
        valorSEDEX = 20 + (totalItens * 4);
    }
    // Sudeste (01-39)
    else if (regiao >= 1 && regiao <= 39) {
        valorPAC = 18 + (totalItens * 3);
        valorSEDEX = 30 + (totalItens * 5);
    }
    // Sul (80-99)
    else if (regiao >= 80 && regiao <= 99) {
        valorPAC = 20 + (totalItens * 3.5);
        valorSEDEX = 35 + (totalItens * 6);
    }
    // Centro-Oeste (70-79)
    else {
        valorPAC = 22 + (totalItens * 4);
        valorSEDEX = 38 + (totalItens * 6.5);
    }

    return [
        {
            nome: 'PAC',
            valor: valorPAC,
            prazo: '8 a 12 dias úteis',
            codigo: 'PAC'
        },
        {
            nome: 'SEDEX',
            valor: valorSEDEX,
            prazo: '3 a 5 dias úteis',
            codigo: 'SEDEX'
        }
    ];
};

// Processa resposta da API
const processarResposta = (data) => {
    if (!data || !data.servicos) {
        throw new Error('Resposta inválida da API');
    }

    return data.servicos.map(servico => ({
        nome: servico.nome,
        valor: parseFloat(servico.valor),
        prazo: `${servico.prazo} dias úteis`,
        codigo: servico.codigo
    }));
};

// Valida CEP
export const validarCEP = async (cep) => {
    try {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            return { valido: false, erro: 'CEP deve ter 8 dígitos' };
        }

        // Consulta CEP via ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

        if (response.data.erro) {
            return { valido: false, erro: 'CEP não encontrado' };
        }

        return {
            valido: true,
            endereco: {
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                estado: response.data.uf
            }
        };
    } catch (error) {
        return { valido: false, erro: 'Erro ao validar CEP' };
    }
};