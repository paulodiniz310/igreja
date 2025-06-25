#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando geração de APK para CPAD Consulta Bíblica');

// Verificar se o Cordova está instalado
try {
  execSync('cordova --version', { stdio: 'pipe' });
  console.log('✅ Cordova encontrado');
} catch (error) {
  console.log('📦 Instalando Cordova globalmente...');
  try {
    execSync('npm install -g cordova', { stdio: 'inherit' });
  } catch (installError) {
    console.error('❌ Erro ao instalar Cordova:', installError.message);
    process.exit(1);
  }
}

const projectName = 'cpad-consulta-app';
const appId = 'com.cpad.consulta';
const appName = 'CPAD Consulta Bíblica';

// Criar diretório do projeto Cordova
if (fs.existsSync(projectName)) {
  console.log('🗂️ Removendo projeto anterior...');
  fs.rmSync(projectName, { recursive: true, force: true });
}

console.log('🏗️ Criando projeto Cordova...');
execSync(`cordova create ${projectName} ${appId} "${appName}"`, { stdio: 'inherit' });

// Entrar no diretório do projeto
process.chdir(projectName);

// Adicionar plataforma Android
console.log('📱 Adicionando plataforma Android...');
execSync('cordova platform add android', { stdio: 'inherit' });

// Construir o projeto principal
console.log('🔨 Construindo projeto principal...');
process.chdir('..');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (buildError) {
  console.error('❌ Erro ao construir projeto:', buildError.message);
  process.exit(1);
}

// Copiar arquivos construídos
console.log('📂 Copiando arquivos para Cordova...');
const distPath = path.join(__dirname, 'dist', 'public');
const wwwPath = path.join(__dirname, projectName, 'www');

if (fs.existsSync(distPath)) {
  // Limpar diretório www
  fs.rmSync(wwwPath, { recursive: true, force: true });
  fs.mkdirSync(wwwPath, { recursive: true });
  
  // Copiar arquivos
  const copyRecursive = (src, dest) => {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  copyRecursive(distPath, wwwPath);
  console.log('✅ Arquivos copiados com sucesso');
} else {
  console.error('❌ Diretório dist/public não encontrado. Execute npm run build primeiro.');
  process.exit(1);
}

// Modificar index.html para incluir cordova.js
const indexPath = path.join(wwwPath, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Adicionar script do Cordova antes do fechamento do body
  if (!indexContent.includes('cordova.js')) {
    indexContent = indexContent.replace(
      '</body>',
      '  <script src="cordova.js"></script>\n  <script>\n    document.addEventListener("deviceready", function() {\n      console.log("Cordova está pronto");\n    }, false);\n  </script>\n</body>'
    );
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ index.html modificado para Cordova');
  }
}

// Configurar config.xml
process.chdir(projectName);
const configPath = path.join(__dirname, projectName, 'config.xml');
let configContent = fs.readFileSync(configPath, 'utf8');

// Adicionar permissões necessárias
const permissions = `
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
`;

if (!configContent.includes('android.permission.INTERNET')) {
  configContent = configContent.replace('</widget>', permissions + '</widget>');
  fs.writeFileSync(configPath, configContent);
  console.log('✅ Permissões adicionadas ao config.xml');
}

// Construir APK
console.log('🔧 Construindo APK...');
try {
  execSync('cordova build android --release', { stdio: 'inherit' });
  console.log('🎉 APK gerado com sucesso!');
  
  // Localizar o APK
  const apkPath = path.join(__dirname, projectName, 'platforms', 'android', 'app', 'build', 'outputs', 'apk', 'release');
  if (fs.existsSync(apkPath)) {
    const apkFiles = fs.readdirSync(apkPath).filter(file => file.endsWith('.apk'));
    if (apkFiles.length > 0) {
      console.log(`📱 APK localizado em: ${path.join(apkPath, apkFiles[0])}`);
      
      // Copiar APK para o diretório raiz
      const destApk = path.join(__dirname, 'cpad-consulta-biblica.apk');
      fs.copyFileSync(path.join(apkPath, apkFiles[0]), destApk);
      console.log(`📋 APK copiado para: ${destApk}`);
    }
  }
  
} catch (buildError) {
  console.error('❌ Erro ao construir APK:', buildError.message);
  console.log('💡 Dica: Verifique se o Android SDK está instalado e configurado');
  process.exit(1);
}

console.log(`
🎊 Processo concluído!

📱 Para instalar o APK:
1. Transfira o arquivo cpad-consulta-biblica.apk para seu dispositivo Android
2. Habilite "Fontes desconhecidas" nas configurações de segurança
3. Toque no arquivo APK para instalar

📚 Consulte o arquivo ANDROID_INSTALLATION_GUIDE.md para instruções detalhadas.
`);