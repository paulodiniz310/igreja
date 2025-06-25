# Guia de Instalação Android - Sistema de Consulta Bíblica CPAD

## Visão Geral
Este guia explica como converter o sistema web de consulta bíblica em um aplicativo Android (APK) que pode ser instalado diretamente no celular.

## Método 1: Usando Cordova/PhoneGap (Recomendado)

### Pré-requisitos
- Node.js instalado
- Android Studio ou Android SDK
- Java JDK 8 ou superior

### Passo 1: Instalar Cordova
```bash
npm install -g cordova
```

### Passo 2: Criar projeto Cordova
```bash
cordova create cpad-app com.cpad.consulta "CPAD Consulta Bíblica"
cd cpad-app
```

### Passo 3: Adicionar plataforma Android
```bash
cordova platform add android
```

### Passo 4: Configurar o projeto
1. Copie todos os arquivos da pasta `dist/public` para `www/`
2. Edite `www/index.html` para incluir:
```html
<script src="cordova.js"></script>
<script>
document.addEventListener('deviceready', function() {
    // App está pronto
    console.log('Cordova está pronto');
}, false);
</script>
```

### Passo 5: Construir o APK
```bash
cordova build android --release
```

O APK será gerado em: `platforms/android/app/build/outputs/apk/release/`

## Método 2: Usando PWA (Progressive Web App)

### Passo 1: Configurar Service Worker
Adicione ao `index.html`:
```html
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
</script>
```

### Passo 2: Criar manifest.json
```json
{
  "name": "CPAD Consulta Bíblica",
  "short_name": "CPAD",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a365d",
  "theme_color": "#2d5a87",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Passo 3: Instalar via navegador
1. Acesse o site no navegador Android
2. Menu → "Adicionar à tela inicial"
3. O app funcionará como aplicativo nativo

## Método 3: Usando APK Builder Online (Mais Simples)

### Opção A: PWA to APK
1. Acesse: https://www.pwabuilder.com/
2. Insira a URL do seu site
3. Clique em "Build My PWA"
4. Baixe o APK gerado

### Opção B: Web2App
1. Acesse: https://web2apk.com/
2. Insira a URL do aplicativo
3. Configure nome e ícone
4. Gere e baixe o APK

## Configurações Recomendadas para Mobile

### 1. Viewport e Responsividade
Já configurado no projeto com Tailwind CSS responsivo.

### 2. Configurações de Rede
Para funcionar offline, implemente cache local:
```javascript
// Cache das consultas
localStorage.setItem('cpad_cache', JSON.stringify(data));
```

### 3. Permissões necessárias (Cordova)
Adicione ao `config.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Instruções de Instalação para Usuários

### Instalação do APK
1. **Baixe o arquivo APK** do link fornecido
2. **Habilite fontes desconhecidas**:
   - Vá em Configurações → Segurança
   - Ative "Fontes desconhecidas" ou "Instalar apps desconhecidos"
3. **Instale o APK**:
   - Abra o arquivo APK baixado
   - Toque em "Instalar"
   - Aguarde a instalação completar
4. **Abra o aplicativo**:
   - Encontre o ícone "CPAD Consulta" na tela inicial
   - Toque para abrir

### Primeira Configuração
1. Abra o aplicativo
2. Vá em Configurações (ícone de engrenagem)
3. Insira sua chave API do OpenRouter
4. Selecione o modelo de IA desejado
5. Salve as configurações

### Como Usar
1. **Fazer uma pergunta**:
   - Digite sua pergunta teológica
   - Selecione o nível de resposta (Simples/Intermediário/Avançado)
   - Toque em "Consultar"

2. **Ver histórico**:
   - Toque no ícone de histórico
   - Selecione uma conversa anterior

3. **Recursos disponíveis**:
   - Versículos bíblicos em português ARC
   - Texto original em grego/hebraico
   - Palavras originais com tradução
   - Referências dos livros CPAD
   - Explicações teológicas em 3 níveis

## Solução de Problemas

### APK não instala
- Verifique se "Fontes desconhecidas" está habilitado
- Certifique-se que o arquivo não está corrompido
- Tente reinstalar

### App não conecta
- Verifique sua conexão com internet
- Confirme se a chave API está correta
- Reinicie o aplicativo

### Respostas não aparecem
- Verifique se a chave API do OpenRouter está válida
- Tente uma pergunta mais simples
- Verifique se há créditos na conta OpenRouter

## Suporte Técnico

Para problemas técnicos:
1. Verifique se sua conexão está estável
2. Confirme se a chave API está correta
3. Tente reiniciar o aplicativo
4. Entre em contato com o administrador do sistema

## Atualizações

Para atualizar o aplicativo:
1. Baixe a nova versão do APK
2. Instale sobre a versão anterior
3. Suas configurações serão mantidas