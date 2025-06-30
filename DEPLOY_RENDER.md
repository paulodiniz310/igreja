# Deploy no Render - Sistema Teológico CPAD

## Passo a Passo para Deploy

### 1. Preparação do Repositório

Certifique-se de que seu código está em um repositório Git (GitHub, GitLab ou Bitbucket).

### 2. Configuração no Render

1. **Acesse o Render**
   - Vá para [render.com](https://render.com)
   - Faça login ou crie uma conta

2. **Criar o Banco de Dados PostgreSQL**
   - Clique em "New +"
   - Selecione "PostgreSQL"
   - Nome: `postgres-teologico`
   - Database Name: `teologico_db`
   - User: `teologico_user`
   - Plano: Free
   - Clique em "Create Database"

3. **Criar o Web Service**
   - Clique em "New +"
   - Selecione "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
     - **Name**: `sistema-teologico-cpad`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

### 3. Variáveis de Ambiente

No painel do Web Service, vá para "Environment" e adicione:

```
NODE_ENV=production
DATABASE_URL=[URL do PostgreSQL criado]
OPENROUTER_API_KEY=[Sua chave da OpenRouter API]
```

**Como obter a DATABASE_URL:**
1. Vá no banco PostgreSQL criado
2. Copie a "External Database URL"
3. Cole em DATABASE_URL

### 4. Configuração de Porta

O Render automaticamente fornece a porta via variável `PORT`. O código já está configurado para usar `process.env.PORT || 5000`.

### 5. Deploy Automático

- O Render fará deploy automaticamente quando você fizer push para o branch principal
- O build levará alguns minutos na primeira vez
- Você receberá uma URL como: `https://sistema-teologico-cpad.onrender.com`

## Configurações Importantes

### Build Command
```bash
npm install && npm run build
```

### Start Command
```bash
npm start
```

### Health Check
O sistema tem um endpoint `/health` que o Render pode usar para verificar se está funcionando.

## Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que o comando `npm run build` funciona localmente

### Erro de Conexão com Banco
- Verifique se a `DATABASE_URL` está correta
- Confirme que o banco PostgreSQL está rodando

### Erro de API Key
- Verifique se `OPENROUTER_API_KEY` está configurada
- Teste a chave em uma requisição manual

## Custos

- **PostgreSQL Free**: 0.1 GB de armazenamento, 100 horas/mês
- **Web Service Free**: 512MB RAM, suspende após inatividade
- Para uso contínuo, considere upgrade para planos pagos

## Monitoramento

- Use o painel do Render para ver logs em tempo real
- Configure alertas para falhas de deploy
- Monitore o uso de recursos

## Backup

O Render faz backup automático dos bancos PostgreSQL, mas recomenda-se:
- Configurar backup adicional dos dados importantes
- Manter cópia local das configurações