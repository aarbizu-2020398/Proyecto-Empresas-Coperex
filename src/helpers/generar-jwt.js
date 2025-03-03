import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '', rol = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, rol };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
}
