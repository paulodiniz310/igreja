# Como Colocar no Render - Guia Rápido

## 1. Crie uma conta no Render
- Acesse [render.com](https://render.com)
- Faça login com GitHub

## 2. Suba o código para o GitHub
- Crie um repositório no GitHub
- Faça upload de todos os arquivos do projeto

## 3. No Render, crie o banco de dados
- Clique "New +" → "PostgreSQL"
- Nome: `teologico-db`
- Plano: Free
- Anote a "External Database URL" que aparecerá

## 4. No Render, crie o web service
- Clique "New +" → "Web Service"
- Conecte seu repositório GitHub
- Configure:
  - **Name**: `sistema-teologico-cpad`
  - **Environment**: Node
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`

## 5. Adicione as variáveis de ambiente
Na aba "Environment" do web service:

```
NODE_ENV=production
DATABASE_URL=[cole a URL do banco aqui]
OPENROUTER_API_KEY=[sua chave da OpenRouter]
```

## 6. Deploy
- Clique "Create Web Service"
- Aguarde o build (5-10 minutos)
- Sua URL será algo como: `https://sistema-teologico-cpad.onrender.com`

## Importante
- O plano Free suspende após 15 minutos sem uso
- Para usar 24/7, considere o plano pago ($7/mês)
- O primeiro acesso após suspensão pode demorar 30 segundos