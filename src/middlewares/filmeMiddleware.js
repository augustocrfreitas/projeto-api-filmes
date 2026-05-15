import { filmeCreateValidation, filmeUpdateValidation } from '../models/filmeValidation.js';

export const validarCreateFilme = (req, res, next) => {
    const resultado = filmeCreateValidation.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ message: resultado.error.errors });
    }

    next();
};

export const validarUpdateFilme = (req, res, next) => {
    const resultado = filmeUpdateValidation.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ erros: resultado.error.issues.map(e => e.message) });
    }

    next();
};
