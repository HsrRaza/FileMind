import { Router } from "express";

const router = Router();

import { convert } from "../controllers/converter.controllers.js";
import { upload } from "../utils/multer.js";

router.post("/data",upload.single('image'), convert);

export default router;