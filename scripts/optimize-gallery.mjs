
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();

const INPUT = path.join(
  ROOT,
  "public",
  "gallery",
  "original"
);

const OUTPUT = path.join(
  ROOT,
  "public",
  "gallery",
  "optimize"
);

const IMAGE_EXT = new Set([
  ".jpg", ".jpeg", ".png", ".webp",
  ".avif", ".tif", ".tiff"
]);

const VIDEO_EXT = new Set([
  ".mp4", ".mov", ".mkv", ".webm", ".avi"
]);

async function runFFmpeg(input, output) {
  return new Promise((resolve, reject) => {
    const args = [
      "-hide_banner",
      "-loglevel", "error",
      "-y",
      "-i", input,

      "-map", "0:v:0",
      "-map", "0:a:0?",

      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", "20",
      "-pix_fmt", "yuv420p",

      "-c:a", "aac",
      "-b:a", "128k",

      "-movflags", "+faststart",
      output
    ];

    const process = spawn("ffmpeg", args, {
      stdio: "inherit"
    });

    process.on("error", reject);

    process.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg failed: ${code}`));
    });
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

async function optimizeGallery() {
  await fs.mkdir(OUTPUT, { recursive: true });

  let files;

  try {
    files = await fs.readdir(INPUT, {
      withFileTypes: true
    });
  } catch {
    throw new Error(
      `Original folder not found: ${INPUT}`
    );
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    if (!file.isFile()) continue;

    const ext = path.extname(file.name).toLowerCase();
    const name = path.parse(file.name).name;

    const inputPath = path.join(INPUT, file.name);

    const isImage = IMAGE_EXT.has(ext);
    const isVideo = VIDEO_EXT.has(ext);

    if (!isImage && !isVideo) continue;

    const outputName = isImage
      ? `${name}.webp`
      : `${name}.mp4`;

    const outputPath = path.join(OUTPUT, outputName);

    const inputStats = await fs.stat(inputPath);

    try {
      // Skip unchanged files already optimized
      const existing = await fs.stat(outputPath).catch(() => null);

      if (
        existing &&
        existing.mtimeMs >= inputStats.mtimeMs
      ) {
        console.log(`SKIP: ${file.name}`);
        continue;
      }

      console.log(`Optimizing: ${file.name}`);

      const tempPath = `${outputPath}.tmp${isImage ? ".webp" : ".mp4"}`;

      try {
        if (isImage) {
          const metadata = await sharp(inputPath, {
            animated: false
          }).metadata();

          // Preserve original dimensions
          await sharp(inputPath)
            .webp({
              quality: 88,
              effort: 6,
              smartSubsample: true
            })
            .toFile(tempPath);

        } else {
          await runFFmpeg(inputPath, tempPath);
        }

        const optimizedStats = await fs.stat(tempPath);

        // Keep original bytes if compression is larger
        if (optimizedStats.size >= inputStats.size) {
          await fs.copyFile(inputPath, outputPath);
          await fs.rm(tempPath, { force: true });

          // If format changed, original bytes cannot
          // simply be renamed to another extension.
          if (ext !== path.extname(outputPath)) {
            await fs.rm(outputPath, { force: true });
            await fs.copyFile(inputPath, path.join(OUTPUT, file.name));
            console.log(`KEPT ORIGINAL: ${file.name}`);
            continue;
          }
        } else {
          await fs.rename(tempPath, outputPath);
        }

        const result = await fs.stat(outputPath);

        totalBefore += inputStats.size;
        totalAfter += result.size;

        const saved = (
          (1 - result.size / inputStats.size) * 100
        ).toFixed(1);

        console.log(
          `${formatSize(inputStats.size)} → ${formatSize(result.size)} | Saved ${saved}%`
        );
      } finally {
        await fs.rm(tempPath, { force: true }).catch(() => {});
      }

    } catch (error) {
      console.error(`FAILED: ${file.name}`, error);
    }
  }

  console.log("\nGallery optimization finished.");
  console.log(
    `Processed: ${formatSize(totalBefore)} → ${formatSize(totalAfter)}`
  );
}

optimizeGallery().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
