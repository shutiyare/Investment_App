// validate inputs before you pass them to repos

export default function authUseCases(authRepository) {
    function login(username, password, authService) {
        if (!username || !password) {
            const error = new Error('email and password fields cannot be empty');
            error.statusCode = 401;
            throw error;
        }
        return authRepository.getPassword(username)
            .then((hashed_password) => {
                if (hashed_password && hashed_password.length == 0) {
                    const error = new Error('Invalid email or password');
                    error.statusCode = 401;
                    throw error;
                }
                const isMatch = authService.compare(password, hashed_password[0].password);
                if (!isMatch) {
                    const error = new Error('Invalid email or password');
                    error.statusCode = 401;
                    throw error;
                }
                const payload = {username};
                return authService.generateToken(payload);
            });
    }

    function getUsernamePhoto(userId){
        if (!userId) {
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return authRepository.getUsernamePhoto(userId);        
    }

    function getPassword(username) {
        if (!username) {
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return authRepository.getPassword(username);
    }

    function getId(username) {
        if (!username) {
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return authRepository.getId(username);
    }

    function getRole(user_id) {
        if (!user_id || isNaN(user_id)) {
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return authRepository.getRole(user_id);
    }

    return { login, getPassword, getId, getRole , getUsernamePhoto}
}