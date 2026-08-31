import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import sharp from 'sharp'

const SRC = resolve('src/assets/team')
const BACKUP = resolve('/tmp/opencode/sixt-team-backup')
const RATIO = 1 / 1 // cards quadrados 1:1 — evita zoom (sarah) e alinha rostos
const QUALITY = 80
const TARGET_W = 720
const TARGET_H = Math.round(TARGET_W / RATIO)

// Posição do recorte por pessoa. 'centre' é o padrão equilibrado.
const GRAVITY = {
  jardel: 'centre',
  default: 'centre',
}

for (const file of await readdir(BACKUP)) {
  const base = file.replace(/\.(jpe?g|png|webp)$/i, '')
  const src = join(BACKUP, file)
  const out = join(SRC, `${base}.webp`)

  const gravity = GRAVITY[base] || GRAVITY.default

  const resized = await sharp(src)
    .resize({
      width: TARGET_W,
      height: TARGET_H,
      fit: 'cover',
      position: gravity,
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toBuffer()

  await sharp(resized).toFile(out)
  const sizeKB = (Buffer.byteLength(resized) / 1024).toFixed(1)
  console.log(`  ${base.padEnd(22)} ${String(sizeKB).padStart(6)} kB   gravity=${gravity}`)
}
