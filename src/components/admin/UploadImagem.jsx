import React, { useState } from 'react';
import { Upload, X, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadImageToCloudinary, validarImagem } from "../../config/cloudinary";

export default function UploadImagem({ onImagemUpload, imagemAtual }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(imagemAtual || null);
  const [erro, setErro] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Valida imagem
    const validacao = validarImagem(file);
    if (!validacao.valido) {
      setErro(validacao.erro);
      return;
    }

    try {
      setUploading(true);
      setErro('');

      // Cria preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Faz upload para Cloudinary
      const result = await uploadImageToCloudinary(file);
      
      // Callback com a URL da imagem
      onImagemUpload(result.url);
      
      setUploading(false);
    } catch (error) {
      setErro(error.message || 'Erro ao fazer upload da imagem');
      setPreview(null);
      setUploading(false);
    }
  };

  const handleRemover = () => {
    setPreview(null);
    onImagemUpload('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-gray-700">
        📷 Imagem do Produto *
      </label>

      {/* Preview da Imagem */}
{preview ? (
  <div className="relative bg-gray-50 rounded-xl overflow-hidden">
    <img 
      src={preview} 
      alt="Preview do produto" 
      className="w-full h-64 object-contain rounded-xl border-2 border-purple-200"
    />
    {!uploading && (
      <button
        type="button"
        onClick={handleRemover}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
        title="Remover imagem"
      >
        <X size={20} />
      </button>
    )}
  </div>
      ) : (
        /* Área de Upload */
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-xl cursor-pointer hover:bg-purple-50 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader className="w-12 h-12 text-purple-500 animate-spin mb-3" />
                <p className="text-sm text-purple-600 font-semibold">Enviando imagem...</p>
                <p className="text-xs text-gray-500 mt-1">Aguarde um momento</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-purple-500 mb-3" />
                <p className="mb-2 text-sm text-gray-700 font-semibold">
                  Clique para fazer upload
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG ou JPEG (Máximo 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}

      {/* Mensagem de Erro */}
      {erro && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="text-sm">{erro}</span>
        </div>
      )}

      {/* Sucesso */}
      {preview && !uploading && !erro && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
          <CheckCircle size={20} className="flex-shrink-0" />
          <span className="text-sm font-medium">Imagem carregada com sucesso!</span>
        </div>
      )}
    </div>
  );
}