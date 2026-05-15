import z from 'zod';

export const filmeCreateValidation = z.object({
    titulo: z.string().min(1),
    genero: z.string().min(1),
    ano: z.number().min(1900).max(2026),
    nota: z.number().min(0).max(10),
});

export const filmeUpdateValidation = z.object({
    titulo: z.string().min(1).optional(),
    genero: z.string().min(1).optional(),
    ano: z.number().min(1900).max(2026).optional(),
    nota: z.number().min(0).max(10).optional(),
});
