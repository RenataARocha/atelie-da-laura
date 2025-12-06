import React, { useState, useEffect } from "react";
import { Save, X, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { adicionarProduto, atualizarProduto } from "../services/produtoService";
import UploadImagem from "../components/admin/UploadImagem";

export default function ProdutoForm({ produto, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    imagem: "",
    categoria: "Laços",
    tamanho: "M",
    material: "",
    detalhes: "",
    descricao: "",
    promocao: false,
  });

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

  const categorias = ["Laços", "Tiaras", "Kits", "Presilhas", "Faixas"];
  const tamanhos = ["P", "M", "G"];

  // Preenche form se estiver editando
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || "",
        preco: produto.preco || "",
        imagem: produto.imagem || "",
        categoria: produto.categoria || "Laços",
        tamanho: produto.tamanho || "M",
        material: produto.material || "",
        detalhes: produto.detalhes || "",
        descricao: produto.descricao || "",
        promocao: produto.promocao || false,
      });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagemUpload = (url) => {
    setFormData((prev) => ({ ...prev, imagem: url }));
  };

  const validarForm = () => {
    if (!formData.nome.trim()) {
      setMensagem({ texto: "Nome do produto é obrigatório", tipo: "erro" });
      return false;
    }
    if (!formData.preco || formData.preco <= 0) {
      setMensagem({ texto: "Preço deve ser maior que zero", tipo: "erro" });
      return false;
    }
    if (!formData.imagem) {
      setMensagem({ texto: "Imagem é obrigatória", tipo: "erro" });
      return false;
    }
    if (!formData.material.trim()) {
      setMensagem({ texto: "Material é obrigatório", tipo: "erro" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ texto: "", tipo: "" });

    if (!validarForm()) {
      return;
    }

    setCarregando(true);

    try {
      // Prepara dados
      const dadosProduto = {
        ...formData,
        preco: parseFloat(formData.preco),
      };

      // Salva ou atualiza
      const result = produto
        ? await atualizarProduto(produto.id, dadosProduto)
        : await adicionarProduto(dadosProduto);

      if (result.success) {
        setMensagem({ texto: result.mensagem, tipo: "sucesso" });
        setTimeout(() => {
          onSalvar();
        }, 1500);
      } else {
        setMensagem({ texto: result.error, tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: "Erro ao salvar produto", tipo: "erro" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {produto ? "Editar Produto" : "Novo Produto"}
        </h2>
        <button
          onClick={onCancelar}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <X size={24} />
        </button>
      </div>

      {/* Mensagem */}
      {mensagem.texto && (
        <div
          className={`flex items-center gap-2 p-4 rounded-xl mb-6 ${
            mensagem.tipo === "sucesso"
              ? "bg-green-50 text-green-700 border-2 border-green-200"
              : "bg-red-50 text-red-700 border-2 border-red-200"
          }`}
        >
          {mensagem.tipo === "sucesso" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-semibold">{mensagem.texto}</span>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload de Imagem */}
        <UploadImagem
          onImagemUpload={handleImagemUpload}
          imagemAtual={formData.imagem}
        />

        {/* Grid de Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="md:col-span-2">
            <label
              htmlFor="nome"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Nome do Produto *
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Laço Festa Rosa"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Preço */}
          <div>
            <label
              htmlFor="preco"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Preço (R$) *
            </label>
            <input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              min="0"
              value={formData.preco}
              onChange={handleChange}
              placeholder="0.00"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Categoria *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100 bg-white cursor-pointer"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tamanho */}
          <div>
            <label
              htmlFor="tamanho"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Tamanho *
            </label>
            <select
              id="tamanho"
              name="tamanho"
              value={formData.tamanho}
              onChange={handleChange}
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100 bg-white cursor-pointer"
            >
              {tamanhos.map((tam) => (
                <option key={tam} value={tam}>
                  {tam} -{" "}
                  {tam === "P" ? "7-8cm" : tam === "M" ? "10-12cm" : "14-16cm"}
                </option>
              ))}
            </select>
          </div>

          {/* Material */}
          <div>
            <label
              htmlFor="material"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Material *
            </label>
            <input
              id="material"
              name="material"
              type="text"
              value={formData.material}
              onChange={handleChange}
              placeholder="Ex: Gorgurão, Cetim, Linho"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Detalhes - AGORA OPCIONAL */}
          <div className="md:col-span-2">
            <label
              htmlFor="detalhes"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Detalhes <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              id="detalhes"
              name="detalhes"
              type="text"
              value={formData.detalhes}
              onChange={handleChange}
              placeholder="Ex: Com bordado em pérola (opcional)"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Descrição - AGORA OPCIONAL */}
          <div className="md:col-span-2">
            <label
              htmlFor="descricao"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Descrição Completa{" "}
              <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Ex: Laço festa tamanho G, bordado em pérola. Perfeito para ocasiões especiais! (opcional)"
              rows="3"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100 resize-none"
            />
          </div>

          {/* Promoção */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="promocao"
                checked={formData.promocao}
                onChange={handleChange}
                disabled={carregando}
                className="w-5 h-5 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-700">
                Este produto está em promoção
              </span>
            </label>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">

  {/* Cancelar */}
  <button
    type="button"
    onClick={onCancelar}
    disabled={carregando}
    className="
      w-full sm:flex-1 
      bg-gray-200 text-gray-700 
      py-3 rounded-xl font-bold 
      hover:bg-gray-300 
      transition-all 
      disabled:opacity-50
    "
  >
    Cancelar
  </button>

  {/* Salvar / Atualizar */}
  <button
    type="submit"
    disabled={carregando}
    className="
      w-full sm:flex-1 
      min-h-[52px] 
      bg-gradient-to-r from-purple-600 to-purple-400
      text-white py-3 rounded-xl font-bold 
      hover:shadow-xl transition-all 
      disabled:opacity-50 disabled:cursor-not-allowed 
      flex items-center justify-center gap-2
      text-sm sm:text-base
    "
  >
    {carregando ? (
      <>
        <Loader className="animate-spin" size={20} />
        Salvando...
      </>
    ) : (
      <>
        <Save size={20} />
        {produto ? 'Atualizar' : 'Salvar'} Produto
      </>
    )}
  </button>
        </div>
      </form>
    </div>
  );
}
