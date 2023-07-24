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
		res.redirect("http://localhost:3000/chat");
	}
);

router.get("/getuser", (req, res) => {
	res.send(req.user);
});

export default router;
