const path = require("path");
const esbuild = require('esbuild');
const production = process.argv.findIndex(argItem => argItem === '--mode=production') >= 0;

const onRebuild = (context) => {
    return async (err, res) => {
        if (err) {
            return console.error(`[${context}]: Rebuild failed`, err);
        }

        console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings);
    }
}

const server = {
    platform: 'node',
    target: ['node16'],
    format: 'cjs',
};

const client = {
    platform: 'browser',
    target: ['chrome93'],
    format: 'iife',
};

const rootPath = path.resolve(__dirname, "..");
const srcPath = path.resolve(rootPath, "src");
const distPath = path.resolve(rootPath, "dist");

for (const context of [ 'client', 'server' ]) {
    const entry = path.resolve(srcPath, context, "index.ts");
    const dist = path.resolve(distPath, `${context}.js`)
    esbuild.build({
        bundle: true,
        minify: production,
        entryPoints: [entry],
        outfile: dist,
        watch: production ? false : {
            onRebuild: onRebuild(context),
        },
        ...(context === 'client' ? client : server),
    }).then(() => console.log(`[${context}]: Built successfully!`)).catch(() => process.exit(1));
}