export const getIsImageBase64Helper = str => {
    return !!str.match(/data:image\/.*;base64,.*/);
};


export const getModuleDefaultExportHelper = module => {
    return module && typeof module === 'object' && '__esModule' in module && module.__esModule ? module.default : module;
};
