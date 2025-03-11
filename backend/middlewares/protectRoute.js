import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) return res.status(404).json({ message: "User not found" });

		req.user = user; // Attach user to the request
		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in protectRoute: ", err.message);
	}
};

// Middleware to check admin access
const adminRoute = async (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied. Admins only." });
	}
	next();
};

export { protectRoute, adminRoute };
