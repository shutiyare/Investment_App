import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from './app/configs/auth.config.js';

// export default function authService() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: '12h'
    });

//   return {
//     encryptPassword,
//     compare,
//     verify,
//     generateToken
//   };
// }
const passwd = 'sadiiq_password'
// const passwd = 'halima_password'
// const passwd = 'admin_password'
// const passwd = 'sankasom_password'
const ps = encryptPassword(passwd)
console.log('password for ', passwd, ' is: ', ps)
// const tk = generateToken({'username':'sankasom_password'});
// console.log('pass: ', ps, '\ntoken is: ', tk)
// console.log('token is: ', tk)
// console.log(compare('sankasom_password', ps))
// console.log(verify(tk))