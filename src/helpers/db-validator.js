
import Empresa from '../empresas/empresa.model.js';

/**
 * Valida que exista una empresa con el ID especificado.
 * @param {string} id - ID de la empresa.
 * @throws {Error} Si la empresa no existe.
 */
export const existeEmpresaById = async (id = '') => {
    const empresa = await Empresa.findById(id);
    if (!empresa) {
        throw new Error(`La empresa con el ID ${id} no existe`);
    }
};
