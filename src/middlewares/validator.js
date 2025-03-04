
import { body, query } from 'express-validator';


export const empresaValidations = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),

    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isString().withMessage('La descripción debe ser una cadena de texto'),

    body('nivelImpacto')
        .notEmpty().withMessage('El nivel de impacto es obligatorio')
        .isIn(['local', 'nacional', 'internacional'])
        .withMessage('El nivel de impacto debe ser: local, nacional o internacional'),

    body('aniosTrayectoria')
        .notEmpty().withMessage('Los años de trayectoria son obligatorios')
        .isNumeric().withMessage('Los años de trayectoria deben ser un número')
];


export const getEmpresasValidations = [
    query('categoria')
        .optional()
        .isMongoId().withMessage('La categoría debe ser un ID válido de MongoDB'),

    query('anios')
        .optional()
        .isNumeric().withMessage('El valor de años de trayectoria debe ser un número'),

    query('order')
        .optional()
        .isIn(['A-Z', 'Z-A'])
        .withMessage('El orden debe ser "A-Z" o "Z-A"')
];
