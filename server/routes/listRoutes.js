import { Router } from "express";
import {
    createList,
    deleteList,
    getLists,
} from "../controllers/listController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getLists);
router.post("/", auth, createList);
router.delete("/:id", auth, deleteList);

export default router;
