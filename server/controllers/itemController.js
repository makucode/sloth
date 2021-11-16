import asyncMiddleware from "../middleware/async.js";
import Item from "../models/item.js";
import List from "../models/list.js";

// DESC Returns todo items of user
// GET /api/items
// ACCESS private (only owner of data or admin)

export const fetchItems = asyncMiddleware(async (req, res) => {
    const { _id } = req.user;

    const items = await Item.find({ user_id: _id });
    res.status(200).json(items);
});

// DESC Creates todo item
// POST /api/items
// ACCESS private (only owner of data or admin)

export const createItem = asyncMiddleware(async (req, res) => {
    const { list_id, todo } = req.body;
    const item = {
        todo,
        user_id: req.user._id,
        list_id,
    };

    const newItem = await Item.create(item);
    const list = await List.findById(list_id);

    list.items = [...list.items, newItem._id];

    await list.save();

    res.status(201).json(newItem);
});

// DESC Creates todo item
// PUT /api/items/:id
// ACCESS private (only owner of data or admin)

export const updateItem = asyncMiddleware(async (req, res) => {
    const item_id = req.params.id;
    const user_id = req.user._id;
    const { todo, isComplete } = req.body;

    const item = await Item.findById(item_id);

    if (user_id !== item.user_id.toString()) {
        return res.status(403).json({ message: "Insufficient Permissions" });
    }

    item.todo = todo;
    item.isComplete = isComplete;

    const updatedItem = await item.save();

    res.status(201).json(updatedItem);
});

// DESC Creates todo item
// POST /api/items/:id
// ACCESS private (only owner of data or admin)

export const deleteItem = asyncMiddleware(async (req, res) => {
    const item_id = req.params.id;
    const user_id = req.user._id;

    const itemToDelete = await Item.findById(item_id);

    if (user_id !== itemToDelete.user_id.toString()) {
        return res.status(403).json({ message: "Insufficient Permissions" });
    }

    await itemToDelete.remove();

    res.status(201).json(itemToDelete);
});
