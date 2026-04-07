import { Router } from "express";

const router = Router();

import { convertToPDF } from "../controllers/converter.controllers.js";

router.post("/convert", convertToPDF);

export default router;