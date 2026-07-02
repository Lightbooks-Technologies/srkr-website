import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  'public/assets/images/faculty/csd',
  'public/assets/images/faculty/csit'
];

async function compressImage(filePath) {
  const stats = fs.statSync(filePath);
  const oldSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  // Only compress if size is larger than 200KB to avoid re-compressing already optimized ones
  if (stats.size < 200 * 1024) {
    console.log(`Skipping ${filePath} (${(stats.size / 1024).toFixed(1)} KB)`);
    return;
  }

  console.log(`Compressing ${filePath} (Original: ${oldSizeMB} MB)`);

  const buffer = fs.readFileSync(filePath);
  
  // Resize to max width of 600px (since they are only avatar/profile images)
  // and compress to 80% quality
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 600, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  fs.writeFileSync(filePath, compressedBuffer);

  const newStats = fs.statSync(filePath);
  const newSizeKB = (newStats.size / 1024).toFixed(1);
  console.log(`Saved ${filePath}: ${newSizeKB} KB (Reduced by ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%)`);
}

async function main() {
  for (const dir of dirs) {
    const absoluteDir = path.resolve(dir);
    if (!fs.existsSync(absoluteDir)) {
      console.log(`Directory ${dir} does not exist`);
      continue;
    }

    const files = fs.readdirSync(absoluteDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') {
        const filePath = path.join(absoluteDir, file);
        try {
          await compressImage(filePath);
        } catch (err) {
          console.error(`Error compressing ${file}:`, err.message);
        }
      }
    }
  }
}

main().catch(err => console.error(err));
