import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import transform from '@diplodoc/transform';
import { getMarkdownEditorPreviewPluginsHelper } from './lib/plugins/helpers.js';
import { LATEX_RUNTIME_FILE_NAME, LATEX_SETUP_FILE_NAME } from './lib/plugins/latex/index.js';


const LIB_DIR_NAME = 'lib';
const PLUGINS_DIR_NAME = 'plugins';
const LATEX_PLUGIN_DIR_NAME = 'latex';
const STYLES_FILE_NAME = 'styles.css';

const srcFilePath = process.argv[2]
const destFilePath = process.argv[3]
const stylesFilePath = join(import.meta.dirname, LIB_DIR_NAME, STYLES_FILE_NAME);
const latexRuntimeFilePath = join(import.meta.dirname, LIB_DIR_NAME, PLUGINS_DIR_NAME, LATEX_PLUGIN_DIR_NAME, LATEX_RUNTIME_FILE_NAME);
const latexSetupFilePath = join(import.meta.dirname, LIB_DIR_NAME, PLUGINS_DIR_NAME, LATEX_PLUGIN_DIR_NAME, LATEX_SETUP_FILE_NAME);

const srcFileContent = await readFile(srcFilePath);
const stylesFileContent = await readFile(stylesFilePath);
const latexRuntimeFileContent = await readFile(latexRuntimeFilePath);
const latexSetupFileContent = await readFile(latexSetupFilePath);

const plugins = getMarkdownEditorPreviewPluginsHelper();

const { result } = transform(srcFileContent.toString(), {
    allowHTML: true,
    linkify: true,
    needToSanitizeHtml: false,
    plugins
});

const outputFileContent = `
    <!DOCTYPE html>
    <head>
        <style type="text/css">${stylesFileContent}</style>
        <script>${latexRuntimeFileContent}</script>
        <script>${latexSetupFileContent}</script>
    </head>
    <body>
        <div class="yfm">
            ${result.html}
        </div>
    </body>
`;

writeFile(destFilePath, outputFileContent);
