import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

// Only production output is cached. Design experiments and external media
// are deliberately outside the offline package.
export default function offlinePlugin() {
  return {
    name: 'amanat-offline',
    apply: 'build',
    async generateBundle(_options, bundle) {
      const publicDir = resolve('public')
      async function walk(dir) {
        const entries = await readdir(dir, { withFileTypes: true })
        const groups = await Promise.all(entries.filter(e => e.name !== 'design').map(async e => {
          const path = resolve(dir, e.name)
          if (e.isDirectory()) return walk(path)
          return /\.(svg|png|jpg|vtt|webmanifest)$/.test(e.name) ? [path] : []
        }))
        return groups.flat()
      }
      const files = await walk(publicDir)
      const output = Object.keys(bundle).filter(name => /\.(js|css|woff2)$/.test(name))
      const template = await readFile(new URL('./sw-template.js', import.meta.url), 'utf8')
      const hash = createHash('sha256').update(template)
      for (const name of output.sort()) hash.update(name)
      // Include the transformed index and unhashed public assets in the version.
      hash.update(await readFile('index.html'))
      for (const file of files.sort()) hash.update(await readFile(file))
      const urls = ['/index.html', ...output.map(name => `/${name}`), ...files.map(file => `/${relative(publicDir, file).replaceAll('\\', '/')}`)]
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: template
        .replace('__VERSION__', hash.digest('hex').slice(0, 16))
        .replace('/* __PRECACHE__ */ []', JSON.stringify(urls)) })
    },
  }
}
