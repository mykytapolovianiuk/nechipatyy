const fs = require('fs');
const path = require('path');

// Читаем models.json
const modelsPath = path.join(__dirname, 'public/data/models.json');
const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));

// Функция для исправления путей к изображениям
function fixAssetPaths(obj) {
  if (typeof obj === 'string') {
    // Заменяем ./src/assets/ на /assets/
    return obj.replace(/^\.\/src\/assets\//, '/assets/');
  } else if (Array.isArray(obj)) {
    return obj.map(fixAssetPaths);
  } else if (obj && typeof obj === 'object') {
    const fixed = {};
    for (const key in obj) {
      fixed[key] = fixAssetPaths(obj[key]);
    }
    return fixed;
  }
  return obj;
}

// Исправляем все пути
const fixedModels = fixAssetPaths(models);

// Сохраняем исправленный файл
fs.writeFileSync(modelsPath, JSON.stringify(fixedModels, null, 2));

console.log('✅ Все пути к изображениям исправлены для production!');
console.log(`📊 Обработано ${models.length} моделей`);
