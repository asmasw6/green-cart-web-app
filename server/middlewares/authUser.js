import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  //   const token  = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
     // req.userId = tokenDecode.id; 
     req.body.userId = tokenDecode.id;
      console.log("<< req.body >>: "+ req.body)
      console.log("<< req.body.userId >>: "+ req.body.userId)
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
