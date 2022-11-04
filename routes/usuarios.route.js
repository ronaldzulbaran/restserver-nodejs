
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, storeUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { esRolevalido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    esAdmin,
    tieneRole,
} = require('../middlewares/index');

const router = Router();


router.get('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
], getUsuarios)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El email no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('role').custom( esRolevalido ),
    validarCampos
], storeUsuario)

router.put('/:id',[
check('id', 'No es un ID válido').isMongoId(),
check('id').custom( existeUsuarioPorId ),
check('role').custom( esRolevalido ),
validarCampos,
], updateUsuario)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
], deleteUsuario)


module.exports = router;