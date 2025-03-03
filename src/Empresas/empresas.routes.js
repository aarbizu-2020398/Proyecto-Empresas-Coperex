import { Router } from 'express';
import { createEmpresa, getEmpresas, updateEmpresa, generateExcelReport } from '../Empresas/empresas.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/', validarJWT, createEmpresa);
router.get('/', validarJWT, getEmpresas);
router.put('/:id', validarJWT, updateEmpresa);
router.get('/report', validarJWT, generateExcelReport);

export default router;
