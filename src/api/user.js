const Router = require('koa-router');
const Users = require('../controllers/users-controller');
const {isAdmin} = require('../utils/middlewares');

const router = new Router();

router.get('/', Users.get)
router.get('/:id', Users.getUser)
router.post('/',  isAdmin, Users.create)
router.delete('/:id',isAdmin, Users.delete);
router.put('/:id', Users.update)

module.exports = router.routes(); 