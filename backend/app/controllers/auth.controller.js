import authUseCases from "../use_cases/auth.usecases.js";
import authServiceImpl from '../services/auth.service.js';
import authServiceInterface from '../interfaces/auth.interface.js';

export default function authController(authRepository) {

    const authService = authServiceInterface(authServiceImpl());
    const auth_use_cases = authUseCases(authRepository);

    function login(req, res, next) {
        const { username, password } = req.body;
        auth_use_cases.login(username, password, authService)
            .then((token) => {
                auth_use_cases.getId(username).then((id) => {
                    console.log(id[0]['user_id'])
                    auth_use_cases.getRole(id[0]['user_id']).then((role) => {
                        const user_role = role[0]['role'];
                        // # username and userphoto
                        auth_use_cases.getUsernamePhoto(id[0]['user_id']).then((userinfo)=>{
                            const username = userinfo[0]['username'];
                            const photo = userinfo[0]['photo'];
                            res.status(200).json({ token, role:user_role, username, userphoto:photo });
                        });
                        
                    })
                })
            })
            .catch((err) => next(err));
    }

    return { login }
}