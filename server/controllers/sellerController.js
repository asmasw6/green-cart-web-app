import jwt from "jsonwebtoken";

const generateToken = (sellerEmail) => {
  return jwt.sign({ email: sellerEmail }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //jwt.sign(userId, process.env.JWT_SECRET);
};

// Seller Login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      console.log(" >>>>>>")
      const token = generateToken(email.toString());
      res.cookie("sellerToken", token, {
        httpOnly: true, // preven javascript to access cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
      });

      return res.json({
        success: true,
        message: "Logged In.",
      });
    } else {
      return res.json({ success: false, message: "Invalid Cradentials." });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Check Auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout User
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true, // preven javascript to access cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
    });
    return res.json({ success: true, message: "Logged Out." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
