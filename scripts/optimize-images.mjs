import { readdir, unlink } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import sharp from 'sharp'

const TEAM_DIR = resolve('src/assets/team')
const RATIO = 4 / 5 // mesma proporção dos cards mobile (4:5)
const QUALITY = 80

const out = []
const removed = []

for (const file of await readdir(TEAM_DIR)) {
  const full = join(TEAM_DIR, file)
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
  const base = file.replace(/\.(jpe?g|png|webp)$/i, '')

  const meta = await sharp(full).metadata()
  const w = meta.width
  const h = meta.height

  // Dimensão-alvo: a maior largura usada no site (slide ~ até ~560px, retina x2)
  const targetW = 720

  const resized = await sharp(full)
    .resize({
      width: targetW,
      height: Math.round(targetW / RATIO),
      fit: 'cover',
      position: 'centre', // enquadramento central consistente entre as fotos
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toBuffer()

  const target = join(TEAM_DIR, `${base}.webp`)
  await sharp(resized).toFile(target)

  const outSize = Buffer.byteLength(resized)
  out.push({ name: `${base}.webp`, size: outSize })

  // remove apenas a entrada original (mantém as não otimizadas)
  if (file !== `${base}.webp`) {
    await unlink(full)
    removed.push(file)
  }
}

console.log('Otimizadas →')
for (const r of out) console.log(`  ${r.name.padEnd(22)} ${(r.size / 1024).toFixed(1)} kB`)
if (removed.length) console.log('Removidas (originais):', removed.join(', '))
