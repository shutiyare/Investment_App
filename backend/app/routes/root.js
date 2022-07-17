// global.js - Handle app global routes

export default function rootRoutes(Router) {
  const globalRouter = Router();

  // handle routes
  globalRouter.route('/').get((req, res) => {
    res.send('User Portal');
  });
  globalRouter.get('/admin', function (req, res) {
    res.send('Admin Portal');
  });


  return globalRouter;
}