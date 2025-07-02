# Guia de Deploy no Render - Sistema Teológico CPAD

## Problema Identificado
O erro que você está enfrentando é porque o Vite está em `devDependencies` no `package.json`, mas o Render por padrão não instala essas dependências na fase de build.

## Soluções Implementadas

### 1. Arquivo render.yaml
Criado arquivo `render.yaml` com configuração específica para o Render que força a instalação de todas as dependências:

```yaml
buildCommand: npm install --include=dev && npm run build
```

### 2. Script de Build Melhorado
O arquivo `build.sh` foi atualizado para garantir que todas as dependências sejam instaladas corretamente.

## Instruções para Deploy no Render

### Opção 1: Usar render.yaml (Recomendado)
1. No painel do Render, vá em **Service Settings**
2. Em **Build & Deploy**, altere o **Build Command** para:
   ```
   npm install --include=dev && npm run build
   ```
3. Certifique-se que o **Start Command** está:
   ```
   npm run start
   ```

### Opção 2: Configuração Manual no Render
Se preferir não usar o render.yaml, configure manualmente:

1. **Build Command**: `npm install --include=dev && npm run build`
2. **Start Command**: `npm run start`
3. **Node Version**: 20.19.3 (adicione arquivo `.nvmrc` se necessário)

### Variáveis de Ambiente Necessárias
Configure no Render:
- `NODE_ENV=production`
- `DATABASE_URL` (URL do seu banco PostgreSQL)
- `OPENROUTER_API_KEY` (sua chave da API OpenRouter)

### Verificação do Build
O build deve criar:
- `dist/public/` - arquivos estáticos do frontend
- `dist/index.js` - servidor backend compilado

## Estrutura de Arquivos Importantes
```
/
├── render.yaml          # Configuração do Render
├── build.sh            # Script de build melhorado
├── package.json        # Dependências e scripts
├── server/index.ts     # Servidor principal
├── client/src/         # Frontend React
└── dist/              # Arquivos compilados (gerados no build)
```

## Troubleshooting

### Se o erro persistir:
1. Verifique se o `render.yaml` está na raiz do repositório
2. Confirme que o Build Command inclui `--include=dev`
3. Verifique os logs de build no Render para mensagens específicas

### Logs úteis para debug:
- Build logs no Render mostrarão se o Vite foi encontrado
- Runtime logs mostrarão se o servidor está iniciando corretamente

## Correções Implementadas (Janeiro 2025)

### Problema 1: Manifest.json com erro de sintaxe
**Solução**: Simplificado o manifest.json removendo elementos problemáticos:
- Removido screenshots array que causava erro
- Atualizado name para "Sistema Teológico" 
- Mantidos apenas campos essenciais para PWA

### Problema 2: Erros React DOM manipulation
**Soluções aplicadas**:
- Adicionado `aria-describedby` aos DialogContent para corrigir warnings
- Implementado ErrorBoundary para capturar erros React
- Melhorada lógica de renderização condicional
- Estabilizada estrutura DOM com containers fixos

### Problema 3: PWA Install não funcionando
**Soluções**:
- Melhorada detecção de instalação do app
- Adicionado fallback com instruções manuais
- Corrigida lógica de evento beforeinstallprompt

## Próximos Passos
1. Faça commit e push dessas correções para o GitHub
2. Triggere um novo deploy no Render
3. Monitore os logs de build para confirmar que o Vite é encontrado
4. Teste o manifest.json no navegador (/manifest.json)
5. Verifique se os erros DOM foram resolvidos no console