const fs = require('fs');
const path = require('path');

// Читаем models.json
const modelsPath = path.join(__dirname, 'public/data/models.json');
const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));

// Функция для исправления путей к изображениям
function fixImagePaths(obj) {
  if (typeof obj === 'string') {
    // Заменяем /assets/images/ на /assets/
    return obj.replace(/^\/assets\/images\//, '/assets/');
  } else if (Array.isArray(obj)) {
    return obj.map(fixImagePaths);
  } else if (obj && typeof obj === 'object') {
    const fixed = {};
    for (const key in obj) {
      fixed[key] = fixImagePaths(obj[key]);
    }
    return fixed;
  }
  return obj;
}

// Исправляем все пути
const fixedModels = fixImagePaths(models);

// Сохраняем исправленный файл
fs.writeFileSync(modelsPath, JSON.stringify(fixedModels, null, 2));

console.log('✅ Все пути к изображениям исправлены!');
console.log(`📊 Обработано ${models.length} моделей`);
