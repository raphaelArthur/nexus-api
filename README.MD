# Nexus Application - Diagnóstico de Eixos da Vida

Este projeto é uma API RESTful desenvolvida em **Node.js** e **MongoDB**, que coleta e armazena informações sobre o diagnóstico de diferentes eixos da vida de um usuário, como segurança energética, hídrica, alimentar e socioambiental. A aplicação segue os princípios de **SOLID** e boas práticas de programação, estruturada para ser facilmente extensível e de manutenção simples.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação e Execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Executando a aplicação](#executando-a-aplicação)
- [Rotas da API](#rotas-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o lado do servidor.
- **Express**: Framework minimalista para construir APIs em Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js.
- **Jest**: Framework de testes em JavaScript.
- **Typescript**: Superset de JavaScript que adiciona tipagem estática.
- **JWT (JSON Web Token)**: Para autenticação e autorização de usuários.

## Funcionalidades

A API permite:
- Criar e atualizar diagnósticos sobre segurança energética, hídrica, alimentar e socioambiental.
- Buscar e deletar diagnósticos de usuários autenticados.
- Autenticação de usuários usando **JWT**.
- Validação e controle de permissões para acesso aos dados.

## Instalação e Execução

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:
- **Node.js** (versão 14.x ou superior)
- **npm** ou **yarn** (gerenciador de pacotes do Node.js)
- **MongoDB Atlas** (ou uma instância local do MongoDB)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/raphaelArthur/nexus-api.git
   cd nexus-api

2. Instale as dependências do projeto:

    ```bash
    npm install

### Configuração

1. Crie um arquivo .env na raiz do projeto para configurar as variáveis de ambiente necessárias:
    ```bash
    touch .env

2. O conteúdo do arquivo .env deve conter as seguintes variáveis de ambiente:
    ```bash
    PORT=3000
    MONGO_URI=<sua-url-do-mongodb-atlas-ou-local>
    JWT_SECRET=<sua-chave-secreta-jwt>

### Executando a aplicação

1. Inicie o servidor:
    ```bash
    npm start

2. Para iniciar o servidor em modo de desenvolvimento (com hot-reload):
    ```bash
    npm run dev


