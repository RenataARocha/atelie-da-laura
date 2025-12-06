# 🎀 Ateliê da Laura - Catálogo Interativo com Carrinho e Frete Automático

<p align="center">
  <a href="https://atelie-da-laura.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20o%20Site-Online-%23FF69B4?style=for-the-badge&logo=vercel" alt="Link para o site online" />
  </a>
  <img src="https://img.shields.io/badge/Status-Concluído-%234caf50?style=for-the-badge" alt="Status do projeto" />
</p>

## ✨ Sobre o Projeto

O **Ateliê da Laura** é um e-commerce fofo e elegante especializado na venda de laços, tiaras, presilhas e acessórios artesanais infantis.

Este projeto nasceu para **solucionar um problema real de atendimento**: centralizar informações, automatizar o cálculo de frete e agilizar o processo de orçamento, permitindo que a cliente monte o pedido completo (com frete e total) e o envie diretamente para o WhatsApp da Laura em um único clique.

Com um **design moderno, responsivo e otimizado para redes sociais**, o site oferece uma experiência de compra simples e rápida.

---

## 🎯 Objetivo Principal

- **Agilizar o Atendimento:** Eliminar perguntas repetidas sobre valores, tamanhos e disponibilidade.
- **Automatizar o Processo:** Permitir que o cliente monte o carrinho e calcule o frete de forma autônoma.
- **Melhorar a Experiência:** Gerar um orçamento completo e claro, enviado instantaneamente via WhatsApp.

---

## 🛠️ Principais Funcionalidades

| Ícone | Funcionalidade             | Descrição                                                                                                      |
| :---: | :------------------------- | :------------------------------------------------------------------------------------------------------------- |
|  🛍️   | **Catálogo Interativo**    | Produtos com foto, detalhes, tamanho e preço, com filtros e busca.                                             |
|  🧮   | **Frete Automático**       | Cálculo de frete em tempo real via API, adicionado automaticamente ao total.                                   |
|  📦   | **Carrinho Inteligente**   | Adição e ajuste de quantidade de produtos com soma total dinâmica.                                             |
|  📲   | **Orçamento via WhatsApp** | Envio de um resumo completo do pedido (lista, quantidades, total e frete) diretamente para o contato da Laura. |
|  🔧   | **Painel Administrativo**  | CRUD completo (Cadastro, Edição, Exclusão e Preview) para gerenciamento de produtos e estoque.                 |
|  📱   | **Responsividade**         | Layout otimizado para mobile, tablet e desktop.                                                                |
|  🌐   | **SEO Otimizado**          | Configuração de Open Graph e Twitter Cards para melhor compartilhamento em redes sociais.                      |

---

## 🚀 Tecnologias Utilizadas

### Frontend & UI

- **React** + **Vite:** Para uma aplicação web rápida e moderna.
- **TailwindCSS:** Para estilização utilitária e responsiva.
- **React Router:** Para gerenciamento de rotas.
- **Lucide Icons:** Para os ícones da interface.
- **Animações:** CSS Transitions, Animação Escalada e Borboletas flutuantes (para um toque delicado).

### Backend & Serviços

- **Firebase:** Para gerenciamento de dados e autenticação (futura).
- **Cloudinary:** Para hospedagem e otimização de imagens.
- **API de Frete:** Para o cálculo automático baseado no CEP.

### Hospedagem

- **Vercel:** Plataforma de deploy contínuo.

---

## 🧭 Como Rodar o Projeto Localmente

Siga os passos abaixo para clonar o repositório e rodar a aplicação em seu ambiente de desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/Renata-Rocha/atelie-da-laura.git](https://github.com/Renata-Rocha/atelie-da-laura.git)
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd atelie-da-laura
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```

A aplicação estará acessível em `http://localhost:5173` (ou porta similar).

---

## 🗂️ Estrutura de Pastas Simplificada

## 📂 Estrutura de Pastas

```
├── dist/
├── node_modules/
├── public/                     # Arquivos estáticos e configuração (ex: favicon, robots.txt)
└── src/
    ├── admin/                  # Lógica e componentes exclusivos do Painel Administrativo.
    ├── assets/                 # Imagens, ícones, fontes e outros recursos estáticos.
    ├── components/             # Componentes React reutilizáveis por toda a aplicação.
    ├── config/                 # Arquivos de configuração (ex: Firebase, API Keys, Rotas).
    ├── data/                   # Mockups de dados ou dados estáticos da aplicação.
    ├── hooks/                  # Custom Hooks para lógica reutilizável e estados complexos.
    ├── pages/                  # Páginas/rotas da aplicação (ex: Home, Produto, Carrinho).
    ├── services/               # Comunicação com APIs externas (ex: Frete, Firebase).
    ├── utils/                  # Funções utilitárias independentes de React.
    ├── App.css
    ├── App.jsx                 # Componente principal.
    ├── index.css
    └── main.jsx                # Ponto de entrada da aplicação (montagem do React e Router).

```

---

## 📈 Melhorias Futuras (Roadmap)

* Login/Autenticação real para o Painel Admin.
* Implementação de um **Checkout** completo com diferentes formas de pagamento.
* **Área do Cliente** para acompanhamento de pedidos.
* Sistema de **Avaliações** e Reviews dos produtos.

---

## ❤️ Desenvolvido por

**Renata Rocha** — Desenvolvedora Front-end
Apaixonada por interfaces bonitas e funcionais.

* **LinkedIn:** [https://linkedin.com/in/renatarocha-dev](https://linkedin.com/in/renatarocha-dev)
* **GitHub:** [https://github.com/Renata-Rocha](https://github.com/Renata-Rocha)

---
