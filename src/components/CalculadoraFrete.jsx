import React, { useState } from 'react';
import { Package, MapPin, Truck, Clock, AlertCircle, Loader } from 'lucide-react';
import { calcularFrete, validarCEP } from '../services/freteService';

export default function CalculadoraFrete({ carrinho, onFreteCalculado }) {
  const [cep, setCep] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [freteSelecionado, setFreteSelecionado] = useState(null);
  const [erro, setErro] = useState('');
  const [endereco, setEndereco] = useState(null);

  const formatarCEP = (valor) => {
    const apenas_numeros = valor.replace(/\D/g, '');
    if (apenas_numeros.length <= 5) {
      return apenas_numeros;
    }
    return apenas_numeros.slice(0, 5) + '-' + apenas_numeros.slice(5, 8);
  };

  const handleCepChange = (e) => {
    const formatado = formatarCEP(e.target.value);
    setCep(formatado);
    setErro('');
  };

  const handleCalcular = async () => {
    try {
      setErro('');
      setCarregando(true);
      setOpcoesFrete([]);
      setFreteSelecionado(null);

      // Valida CEP
      const validacao = await validarCEP(cep);
      
      if (!validacao.valido) {
        setErro(validacao.erro);
        setCarregando(false);
        return;
      }

      setEndereco(validacao.endereco);

      // Calcula frete
      const opcoes = await calcularFrete(cep, carrinho);
      setOpcoesFrete(opcoes);
      setCarregando(false);
    } catch (error) {
      setErro('Erro ao calcular frete. Tente novamente.');
      setCarregando(false);
      console.error(error);
    }
  };

  const handleSelecionarFrete = (opcao) => {
    setFreteSelecionado(opcao);
    onFreteCalculado(opcao);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Package className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Calcular Frete</h3>
      </div>

      {/* Input de CEP */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <label htmlFor="cep-frete" className="block text-sm font-bold text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            CEP de entrega
          </label>
          <input
            id="cep-frete"
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={handleCepChange}
            onKeyPress={(e) => e.key === 'Enter' && handleCalcular()}
            maxLength={9}
            disabled={carregando}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalcular}
            disabled={carregando || cep.length < 9}
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {carregando ? (
              <>
                <Loader size={20} className="animate-spin" />
                Calculando...
              </>
            ) : (
              <>
                <Truck size={20} />
                Calcular
              </>
            )}
          </button>
        </div>
      </div>

      {/* Erro */}
      {erro && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span className="text-sm font-medium">{erro}</span>
        </div>
      )}

      {/* Endereço */}
      {endereco && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3 mb-4">
          <p className="text-sm text-gray-700">
            <strong>Entrega em:</strong> {endereco.cidade}/{endereco.estado}
          </p>
        </div>
      )}

      {/* Opções de Frete */}
      {opcoesFrete.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-700 mb-3">Selecione a forma de envio:</p>
          
          {opcoesFrete.map((opcao, index) => (
            <button
              key={index}
              onClick={() => handleSelecionarFrete(opcao)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                freteSelecionado?.codigo === opcao.codigo
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={18} className="text-purple-600" />
                    <span className="font-bold text-gray-800">{opcao.nome}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{opcao.prazo}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">
                    R$ {opcao.valor.toFixed(2)}
                  </p>
                </div>
              </div>
              
              {freteSelecionado?.codigo === opcao.codigo && (
                <div className="mt-2 text-sm text-purple-700 font-semibold">
                  ✓ Frete selecionado
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Informação */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 O frete será calculado com base no seu CEP e na quantidade de itens
      </p>
    </div>
  );
}