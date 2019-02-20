const Router = require('koa-router');
const Users = require('../controllers/users-controller');
const {isAuthenticate, isAdmin, idIsValid} = require('../utils/middlewares');

const router = new Router();

router.get('/', isAuthenticate, isAdmin, Users.get)
router.get('/:id', idIsValid, isAuthenticate, Users.getUser)
router.post('/', Users.create)
router.delete('/:id', idIsValid , isAuthenticate, isAdmin, Users.delete);
router.put('/:id', idIsValid, isAuthenticate, Users.update)

module.exports = router.routes(); 