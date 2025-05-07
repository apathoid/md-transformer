import { MARKDOWN_EDITOR_LATEX_RUNTIME, MARKDOWN_EDITOR_MERMAID_RUNTIME, MARKDOWN_EDITOR_YFM_HTML_BLOCK_RUNTIME } from '../constants.js';

import { transform as yfmCut } from '@diplodoc/cut-extension';
import { transform as yfmFile } from '@diplodoc/file-extension';
import { transform as foldingHeadings } from '@diplodoc/folding-headings-extension';
import '@diplodoc/folding-headings-extension/runtime';
import { transform as yfmHtmlBlock } from '@diplodoc/html-extension';
import { transform as latex } from '@diplodoc/latex-extension';
import { transform as mermaid } from '@diplodoc/mermaid-extension';
import { transform as yfmTabs } from '@diplodoc/tabs-extension';
import checkbox from '@diplodoc/transform/lib/plugins/checkbox/index.js';
import code from '@diplodoc/transform/lib/plugins/code.js';
import deflist from '@diplodoc/transform/lib/plugins/deflist.js';
import imsize from '@diplodoc/transform/lib/plugins/imsize/index.js';
import meta from '@diplodoc/transform/lib/plugins/meta.js';
import monospace from '@diplodoc/transform/lib/plugins/monospace.js';
import notes from '@diplodoc/transform/lib/plugins/notes/index.js';
import sup from '@diplodoc/transform/lib/plugins/sup.js';
import yfmTable from '@diplodoc/transform/lib/plugins/table/index.js';
import video from '@diplodoc/transform/lib/plugins/video/index.js';
import colorMarkdownIt from 'markdown-it-color';
import emoji from 'markdown-it-emoji/bare.js';
import ins from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import { emojiDefs } from './config.js';
import sanitize, { defaultOptions } from '@diplodoc/transform/lib/sanitize.js';
import hljs from 'markdown-it-highlightjs';
import hljsCore from 'highlight.js/lib/core';
import { validateLinkMarkdownIt, targetBlankMarkdownIt, getSanitizeYfmHtmlBlock } from './markdown-it.js';
import { getModuleDefaultExportHelper } from '../helpers.js';

const color = getModuleDefaultExportHelper(colorMarkdownIt);


export const getMarkdownEditorPreviewPluginsHelper = () => {
    const defaultPlugins = [
        code,
        yfmCut({ bundle: false }),
        deflist,
        yfmFile({ bundle: false }),
        (md) => md.use(imsize, { enableInlineStyling: true }),
        meta,
        monospace,
        notes,
        sup,
        yfmTabs({
            bundle: false,
            features: {
                enabledVariants: {
                    regular: true,
                    radio: true,
                    dropdown: false,
                    accordion: false,
                },
            },
        }),
        video,
        yfmTable,
    ];
    const extendedPlugins = defaultPlugins.concat(
        (md) => md.use(emoji, { defs: emojiDefs }),
        checkbox,
        (md) => hljs(md, { inline: false, hljs: hljsCore }),
        (md) => md.use(color, { inline: true }),
        ins,
        latex({ bundle: false, runtime: MARKDOWN_EDITOR_LATEX_RUNTIME }),
        mark,
        mermaid({ bundle: false, runtime: MARKDOWN_EDITOR_MERMAID_RUNTIME }),
        sub,
        foldingHeadings({ bundle: false }),
        (md) => targetBlankMarkdownIt({ md }),
        (md) => validateLinkMarkdownIt({ md }),
        yfmHtmlBlock({
            bundle: false,
            runtimeJsPath: MARKDOWN_EDITOR_YFM_HTML_BLOCK_RUNTIME,
            sanitize: getSanitizeYfmHtmlBlock({ options: defaultOptions, sanitize }),
            head: `
                        <base target="_blank" />
                        <style>
                            html, body {
                                margin: 0;
                                padding: 0;
                            }
                        </style
                    `,
        }),
    );

    return extendedPlugins;
};
