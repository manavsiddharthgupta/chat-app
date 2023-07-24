import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
	(req, res) => {
		//res.cookie("cookie", req.user); // Sets cookie
		res.redirect("http://localhost:3000/chat");
	}
);

export default router;
