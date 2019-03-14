const Router = require('koa-router');
const Names = require('../controllers/names-controller');
const { idIsValid } = require('../utils/middlewares');

const router = new Router();

router.get('/', Names.get)
router.get('/:id', idIsValid, Names.getName)
router.post('/', Names.create)
router.delete('/:id', idIsValid, Names.delete);
router.put('/:id', idIsValid, Names.update)

module.exports = router.routes(); 