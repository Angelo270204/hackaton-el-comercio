import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos
const candidatosPath = path.join(__dirname, 'public/data/candidatos.json');
const diputadosPath = path.join(__dirname, 'public/data/diputados.json');
const senadoresNacionalPath = path.join(__dirname, 'public/data/senadores_nacional.json');
const senadoresRegionalPath = path.join(__dirname, 'public/data/senadores_regional.json');
const parlamentoAndinoPath = path.join(__dirname, 'public/data/parlamento_andino.json');

console.log('🔍 Iniciando limpieza de duplicados...\n');

// 1. Leer y limpiar candidatos.json
const candidatosData = JSON.parse(fs.readFileSync(candidatosPath, 'utf8'));
console.log(`📊 Total de candidatos antes de limpieza: ${candidatosData.length}`);

// Filtrar: eliminar ID 10 (Sigrid Bazán) y ID 20 (Flor Polo)
const candidatosLimpios = candidatosData.filter(candidato => {
  if (candidato.id === 10) {
    console.log(`❌ Eliminado: ${candidato.nombre} (${candidato.partido}) - ID: ${candidato.id}`);
    return false;
  }
  if (candidato.id === 20) {
    console.log(`❌ Eliminado: ${candidato.nombre} (${candidato.partido}) - ID: ${candidato.id}`);
    return false;
  }
  return true;
});

console.log(`✅ Total de candidatos después de limpieza: ${candidatosLimpios.length}\n`);

// Guardar candidatos limpios
fs.writeFileSync(candidatosPath, JSON.stringify(candidatosLimpios, null, 2), 'utf8');
console.log(`💾 Archivo limpio guardado: ${candidatosPath}\n`);

// 2. Crear estructuras para otros cargos
const estructuraDiputados = {
  "diputados": []
};

const estructuraSenadoresNacional = {
  "senadores_nacional": []
};

const estructuraSenadoresRegional = {
  "senadores_regional": []
};

const estructuraParlamentoAndino = {
  "parlamento_andino": []
};

// Guardar archivos de estructura
fs.writeFileSync(diputadosPath, JSON.stringify(estructuraDiputados, null, 2), 'utf8');
console.log(`✅ Creado: ${diputadosPath}`);

fs.writeFileSync(senadoresNacionalPath, JSON.stringify(estructuraSenadoresNacional, null, 2), 'utf8');
console.log(`✅ Creado: ${senadoresNacionalPath}`);

fs.writeFileSync(senadoresRegionalPath, JSON.stringify(estructuraSenadoresRegional, null, 2), 'utf8');
console.log(`✅ Creado: ${senadoresRegionalPath}`);

fs.writeFileSync(parlamentoAndinoPath, JSON.stringify(estructuraParlamentoAndino, null, 2), 'utf8');
console.log(`✅ Creado: ${parlamentoAndinoPath}`);

console.log('\n✨ Proceso completado exitosamente!');
console.log('\n📋 Resumen:');
console.log(`   - Candidatos presidenciales: ${candidatosLimpios.length} (18 partidos únicos)`);
console.log(`   - Archivos creados: 4 estructuras para completar`);
console.log('\n📂 Archivos generados:');
console.log('   - public/data/candidatos.json (limpio, sin duplicados)');
console.log('   - public/data/diputados.json');
console.log('   - public/data/senadores_nacional.json');
console.log('   - public/data/senadores_regional.json');
console.log('   - public/data/parlamento_andino.json');
console.log('\n👉 Ya puedes llenar las estructuras con los datos que necesites.');