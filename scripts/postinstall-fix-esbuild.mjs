import fs from "fs/promises";
import path from "path";

async function main() {
  if (process.platform !== "linux") return;

  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "node_modules", "@esbuild", "linux-x64", "bin", "esbuild"),
    path.join(cwd, "node_modules", "@esbuild", "linux-arm64", "bin", "esbuild"),
    path.join(cwd, "node_modules", "esbuild", "bin", "esbuild"),
  ];

  // Soporte para pnpm: busca @esbuild+linux-* dentro de node_modules/.pnpm
  const pnpmDir = path.join(cwd, "node_modules", ".pnpm");
  try {
    const entries = await fs.readdir(pnpmDir, { withFileTypes: true });
    for (const dirent of entries) {
      if (!dirent.isDirectory()) continue;
      const name = dirent.name;
      if (!name.startsWith("@esbuild+")) continue;

      const plusIdx = name.indexOf("+");
      const atIdx = name.indexOf("@", plusIdx + 1);
      const platform =
        atIdx !== -1 ? name.substring(plusIdx + 1, atIdx) : name.substring(plusIdx + 1);
      const binPath = path.join(
        pnpmDir,
        name,
        "node_modules",
        "@esbuild",
        platform,
        "bin",
        "esbuild"
      );
      candidates.push(binPath);
    }
  } catch {
    // node_modules/.pnpm podría no existir; ignoramos.
  }

  // Intenta aplicar permisos 755 en todos los candidatos disponibles
  for (const file of candidates) {
    try {
      await fs.access(file);
      await fs.chmod(file, 0o755);
      // console.log(`[postinstall] Fixed permissions for: ${file}`);
    } catch {
      // Ignora si no existe o no es accesible; seguimos con el resto
    }
  }
}

main().catch(() => {
  // Silencioso para no romper el build si algo falla aquí
});