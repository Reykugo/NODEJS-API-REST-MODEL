const Router = require('koa-router');
const Name = require('../controllers/name-controller');
const { isAdmin, idIsValid } = require('../utils/middlewares');

const router = new Router();

router.get('/', Users.get)
router.get('/:id', idIsValid, Name.getUser)
router.post('/', Name.create)
router.delete('/:id', idIsValid, Name.delete);
router.put('/:id', idIsValid, Name.update)

module.exports = router.routes(); 