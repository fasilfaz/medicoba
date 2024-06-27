// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";


// dotenv.config();

// const authenticateUser = (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(403).send("Unauthorized: No token provided");
//         }
//         console.log( "tok", token);
//         if (typeof token !== 'string') {
//             return res.status(403).send("Unauthorized: Invalid token format");
//         }
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             console.log(err);
//             if (err) {
//                 return res.status(403).send("Unauthorized....");
//             }
//             console.log(req.user);
//             req.user = user;
            
//             next();
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(403).send("Unauthorized");
//     };
// }; 

// export default authenticateUser;


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// function authenticateUser(req, res, next) {
//   const token = req.cookies.token;

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     console.log(err);

//     if (err) return res.sendStatus(403);

//     req.user = user;

//     next();
//   });
// }

// export default authenticateUser;
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";


// dotenv.config();

// function authenticateUser(req, res, next) {
//     try {
//         const token = req.cookies.token;
//         console.log(token);

//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             console.log(err);
//             if (err) {
//                 return res.status(403).send("Unauthorized");
//             }
//             req.user = user;
//             console.log(req.user);
//             next();
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(403).send("Unauthorized");
//     };
// }; 

// export default authenticateUser;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateUser(req, res, next) {
    
  // const token = req.cookies.token;
  const token = localStorage.getItem("token");
  console.log(token,"authenticated token");
  if (!token) {
    return res
      .status(401)
      .json({
        message: "Not Authenticated : Please  login or register",
        success: false,
      });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    
    next();
  });
}

export default authenticateUser;