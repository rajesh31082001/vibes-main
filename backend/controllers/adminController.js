import User from "../models/userModel.js";
import Post from "../models/postModel.js";

// Delete a user and all their posts
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if user exists
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Delete user's posts
		await Post.deleteMany({ userId: id });

		// Delete user
		await User.findByIdAndDelete(id);

		res.status(200).json({ message: "User and their posts deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in deleteUser:", err.message);
	}
};

// Freeze or unfreeze a user account
const freezeUser = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if user exists
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Toggle freeze status
		user.isFrozen = !user.isFrozen;
		await user.save();

		res.status(200).json({
			message: `User ${user.isFrozen ? "frozen" : "unfrozen"} successfully`,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in freezeUser:", err.message);
	}
};

// Get all users (for admin panel)
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password -updatedAt");
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getAllUsers:", err.message);
	}
};

// Get a single user by ID (for admin panel)
const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id).select("-password -updatedAt");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserById:", err.message);
	}
};

export { deleteUser, freezeUser, getAllUsers, getUserById };
