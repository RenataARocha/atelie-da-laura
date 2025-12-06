import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

// ============================================================================
// PRODUTOS ANTIGOS PARA MIGRAR
// ============================================================================
const produtosAntigos = [
    {
        nome: "Laço Festa Rosa Claro",
        preco: 25.00,
        imagem: "https://images.unsplash.com/photo-1522512115668-c09775d6f424?w=400",
        categoria: "Laços",
        tamanho: "M",
        material: "Gorgurão",
        detalhes: "Com bordado em pérola",
        descricao: "Laço festa tamanho M, bordado em pérola. Perfeito para ocasiões especiais!",
        promocao: false
    },
    {
        nome: "Tiara Floral Delicada",
        preco: 30.00,
        imagem: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
        categoria: "Tiaras",
        tamanho: "M",
        material: "Cetim com flores",
        detalhes: "Acabamento premium",
        descricao: "Tiara delicada com flores de tecido. Ideal para festas e eventos.",
        promocao: false
    },
    {
        nome: "Kit Laços Coloridos",
        preco: 45.00,
        imagem: "https://images.unsplash.com/photo-1522512115668-c09775d6f424?w=400",
        categoria: "Kits",
        tamanho: "P",
        material: "Gorgurão variado",
        detalhes: "Kit com 3 laços",
        descricao: "Kit com 3 laços em cores diferentes. Ótimo custo-benefício!",
        promocao: true
    },
    {
        nome: "Presilha Estrela",
        preco: 15.00,
        imagem: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
        categoria: "Presilhas",
        tamanho: "P",
        material: "Metal com tecido",
        detalhes: "Formato de estrela",
        descricao: "Presilha em formato de estrela, super fofa para o dia a dia.",
        promocao: false
    },
    {
        nome: "Faixa Floral Baby",
        preco: 20.00,
        imagem: "https://images.unsplash.com/photo-1522512115668-c09775d6f424?w=400",
        categoria: "Faixas",
        tamanho: "M",
        material: "Meia de seda",
        detalhes: "Confortável e delicada",
        descricao: "Faixa macia para bebês, super confortável e linda!",
        promocao: false
    },
    {
        nome: "Laço Gigante Festa",
        preco: 35.00,
        imagem: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
        categoria: "Laços",
        tamanho: "G",
        material: "Gorgurão premium",
        detalhes: "Laço grande e volumoso",
        descricao: "Laço tamanho G perfeito para festas especiais. Muito charme!",
        promocao: true
    }
];

// ============================================================================
// FUNÇÃO DE MIGRAÇÃO
// ============================================================================
export const migrarProdutosParaFirebase = async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 INICIANDO MIGRAÇÃO DE PRODUTOS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        const produtosRef = collection(db, 'produtos');
        let contador = 0;

        for (const produto of produtosAntigos) {
            await addDoc(produtosRef, {
                ...produto,
                criadoEm: Timestamp.now(),
                atualizadoEm: Timestamp.now()
            });

            contador++;
            console.log(`✅ ${contador}/${produtosAntigos.length} - ${produto.nome}`);
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!');
        console.log(`📦 ${contador} produtos migrados para o Firebase`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return {
            success: true,
            mensagem: `${contador} produtos migrados com sucesso!`
        };
    } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ ERRO NA MIGRAÇÃO');
        console.error('Mensagem:', error.message);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        return {
            success: false,
            error: error.message
        };
    }
};