/**
 * export HttpStatusCode {
 OK = 200,
 BAD_REQUEST = 400,
 NOT_FOUND = 404,
 INTERNAL_SERVER = 500,
}
 * 
 */

// export default function errorHandlingMiddlware(err, req, res, next) {
//     err.statusCode = err.statusCode || 404;
//     return err.customMessage || err.message
//       ? res.status(err.statusCode).json({
//           status: err.statusCode,
//           message: err.customMessage || err.message
//         })
//       : res.status(err.statusCode).json({ status: err.statusCode, message: err });
//   }

export default function errorHandlingMiddlware(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send({ "message": err.message || "Internal Server Error" });
}