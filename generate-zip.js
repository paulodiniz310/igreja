#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

console.log('📦 Iniciando geração do arquivo ZIP do projeto...');

// Create output directory if it doesn't exist
const outputDir = './project-zip';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(outputDir, 'consulta-biblica-cpad-completo.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ Arquivo ZIP criado com sucesso!');
  console.log(`📁 Total de bytes: ${archive.pointer()}`);
  console.log(`📍 Local: ${path.resolve(outputDir, 'consulta-biblica-cpad-completo.zip')}`);
  console.log('\n🎉 O projeto completo foi empacotado em um arquivo ZIP!');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('⚠️  Aviso:', err.message);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Files and directories to include
const filesToInclude = [
  // Root files
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts',
  'generate-apk.js',
  'ANDROID_INSTALLATION_GUIDE.md',
  'replit.md',
  
  // Directories
  'client/',
  'server/',
  'shared/',
  'public/',
  'attached_assets/'
];

// Add files and directories
filesToInclude.forEach(item => {
  const itemPath = path.resolve(item);
  
  if (fs.existsSync(itemPath)) {
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`📁 Adicionando diretório: ${item}`);
      archive.directory(itemPath, item);
    } else {
      console.log(`📄 Adicionando arquivo: ${item}`);
      archive.file(itemPath, { name: item });
    }
  } else {
    console.warn(`⚠️  Item não encontrado: ${item}`);
  }
});

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();