import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============================================================================
// SERVIÇO DE PRODUTOS - CRUD COMPLETO
// ============================================================================

const COLLECTION_NAME = 'produtos';

/**
 * Busca todos os produtos
 * @returns {Promise<Array>} - Lista de produtos
 */
export const buscarProdutos = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('nome', 'asc')
        );

        const snapshot = await getDocs(q);

        const produtos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return { success: true, produtos };
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Adiciona um novo produto
 * @param {Object} produto - Dados do produto
 * @returns {Promise<Object>} - Resultado da operação
 */
export const adicionarProduto = async (produto) => {
    try {
        // Adiciona timestamp de criação
        const produtoComData = {
            ...produto,
            criadoEm: Timestamp.now(),
            atualizadoEm: Timestamp.now()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), produtoComData);

        return {
            success: true,
            id: docRef.id,
            mensagem: 'Produto adicionado com sucesso!'
        };
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        return {
            success: false,
            error: 'Erro ao adicionar produto. Tente novamente.'
        };
    }
};

/**
 * Atualiza um produto existente
 * @param {string} id - ID do produto
 * @param {Object} dadosAtualizados - Dados para atualizar
 * @returns {Promise<Object>} - Resultado da operação
 */
export const atualizarProduto = async (id, dadosAtualizados) => {
    try {
        const produtoRef = doc(db, COLLECTION_NAME, id);

        // Adiciona timestamp de atualização
        const dados = {
            ...dadosAtualizados,
            atualizadoEm: Timestamp.now()
        };

        await updateDoc(produtoRef, dados);

        return {
            success: true,
            mensagem: 'Produto atualizado com sucesso!'
        };
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return {
            success: false,
            error: 'Erro ao atualizar produto. Tente novamente.'
        };
    }
};

/**
 * Exclui um produto
 * @param {string} id - ID do produto
 * @returns {Promise<Object>} - Resultado da operação
 */
export const excluirProduto = async (id) => {
    try {
        const produtoRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(produtoRef);

        return {
            success: true,
            mensagem: 'Produto excluído com sucesso!'
        };
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return {
            success: false,
            error: 'Erro ao excluir produto. Tente novamente.'
        };
    }
};

/**
 * Alterna status de promoção
 * @param {string} id - ID do produto
 * @param {boolean} promocao - Novo status
 * @returns {Promise<Object>} - Resultado da operação
 */
export const alternarPromocao = async (id, promocao) => {
    try {
        const produtoRef = doc(db, COLLECTION_NAME, id);

        await updateDoc(produtoRef, {
            promocao,
            atualizadoEm: Timestamp.now()
        });

        return {
            success: true,
            mensagem: promocao ? 'Produto em promoção!' : 'Promoção removida!'
        };
    } catch (error) {
        console.error('Erro ao alterar promoção:', error);
        return {
            success: false,
            error: 'Erro ao alterar promoção. Tente novamente.'
        };
    }
};