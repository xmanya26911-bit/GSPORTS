// One-off asset optimization script: converts public/images/*.png to WebP,
// generates an OG image, and removes the now-redundant PNG/JPG sources.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "../public/images");

const pngFiles = fs.readdirSync(dir).filter((f) => /\.png$/i.test(f));
const MAX_EDGE = 1600;

for (const file of pngFiles) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.png$/i, ".webp"));
  try {
    const meta = await sharp(input).metadata();
    let pipeline = sharp(input).rotate();
    if (meta.width && meta.width > MAX_EDGE) {
      pipeline = pipeline.resize(MAX_EDGE, null, { withoutEnlargement: true });
    }
    await pipeline
      .webp({ quality: 82, effort: 5, alphaQuality: 90 })
      .toFile(output);
    const sizeMB = fs.statSync(output).size / 1024 / 1024;
    console.log(
      `OK  ${file.padEnd(32)} ${meta.width}x${meta.height}${meta.hasAlpha ? " (alpha)" : ""} -> ${path.basename(output)} (${sizeMB.toFixed(2)} MB)`
    );
  } catch (err) {
    console.error(`ERR ${file}: ${err.message}`);
  }
}

// OG image (1200x630) from the hero stadium photo
const ogInput = path.join(dir, "hero-stadium.jpg");
const ogOutput = path.join(dir, "og-image.jpg");
if (fs.existsSync(ogInput)) {
  await sharp(ogInput)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82 })
    .toFile(ogOutput);
  console.log(`OK  og-image.jpg generated (${(fs.statSync(ogOutput).size / 1024).toFixed(0)} KB)`);
}

console.log("Done.");