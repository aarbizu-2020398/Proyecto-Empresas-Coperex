import Empresa from '../Empresas/empresas.model.js';
import ExcelJS from 'exceljs';

export const createEmpresa = async (req, res) => {
  try {
    const { nombre, descripcion, nivelImpacto, aniosTrayectoria, categoria, imagen } = req.body;

    const nuevaEmpresa = new Empresa({
      nombre,
      descripcion,
      nivelImpacto,
      aniosTrayectoria,
      categoria,
      imagen
    });

    await nuevaEmpresa.save();

    return res.status(201).json({
      success: true,
      message: 'Empresa registrada exitosamente',
      data: nuevaEmpresa
    });
  } catch (error) {
    console.error('Error al crear empresa:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const getEmpresas = async (req, res) => {
  try {
    const { categoria, anios, order } = req.query;
    const filter = {};
    if (categoria) filter.categoria = categoria;
    if (anios) filter.aniosTrayectoria = anios;

    let sort = {};
    if (order === 'A-Z') {
      sort.nombre = 1;
    } else if (order === 'Z-A') {
      sort.nombre = -1;
    }

    const empresas = await Empresa.find(filter).sort(sort);

    return res.json({
      success: true,
      data: empresas
    });
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

export const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, nivelImpacto, aniosTrayectoria, categoria, imagen } = req.body;

    const empresaActualizada = await Empresa.findByIdAndUpdate(
      id,
      { nombre, descripcion, nivelImpacto, aniosTrayectoria, categoria, imagen },
      { new: true }
    );

    if (!empresaActualizada) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    return res.json({
      success: true,
      message: 'Empresa actualizada correctamente',
      data: empresaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const generateExcelReport = async (req, res) => {
  try {
    const empresas = await Empresa.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Empresas');

    worksheet.addRow([
      'ID',
      'Nombre',
      'Descripción',
      'Nivel Impacto',
      'Años de Trayectoria',
      'Categoría',
      'Imagen'
    ]);

    empresas.forEach((emp) => {
      worksheet.addRow([
        emp._id.toString(),
        emp.nombre,
        emp.descripcion,
        emp.nivelImpacto,
        emp.aniosTrayectoria,
        emp.categoria ? emp.categoria.toString() : '',
        emp.imagen
      ]);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=empresas.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error al generar reporte Excel:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
