import { Router } from "express";
import { getUserById, Login, Register } from "../controllers/auth.controller";
import { authCheck } from "../middlewares/authMiddleware";
import { createAgent, getAgents } from "../controllers/agent.controller";
import { upload } from "../controllers/file.controller";

const router = Router();

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/create-agent').post(authCheck , createAgent)
router.route('/agents/:userId').get(authCheck , getAgents)
router.route('/users/:id').get(authCheck , getUserById)
router.route('/upload').post(authCheck , upload)
export default router;