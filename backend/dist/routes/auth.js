"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "http://localhost:3000" }), (req, res) => {
    res.redirect("http://localhost:3000/chat");
});
router.get("/getuser", (req, res) => {
    res.send(req.user);
});
exports.default = router;
//# sourceMappingURL=auth.js.map