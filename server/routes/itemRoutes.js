import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    createItem,
    deleteItem,
    fetchItems,
    updateItem,
} from "../controllers/itemController.js";

const router = Router();

router.get("/", auth, fetchItems);
router.post("/", auth, createItem);
router.delete("/:id", auth, deleteItem);
router.put("/:id", auth, updateItem);

export default router;
