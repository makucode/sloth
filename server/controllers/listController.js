import asyncMiddleware from "../middleware/async.js";
import Item from "../models/item.js";
import List from "../models/list.js";
import User from "../models/user.js";

// DESC Get user lists
// GET /api/lists
// ACCESS private

export const getLists = asyncMiddleware(async (req, res) => {
    const { _id } = req.user;

    const lists = await List.find({ user_id: _id });
    res.status(200).json(lists);
});

// DESC Create user list
// POST /api/lists
// ACCESS private

export const createList = asyncMiddleware(async (req, res) => {
    const { _id } = req.user;

    const newList = {
        name: req.body.name,
        user_id: _id,
    };

    const user = await User.findById(_id);
    const list = await List.create(newList);

    user.lists = [...user.lists, list._id];

    await user.save();

    res.status(200).json(list);
});

// DESC Delete user list
// DELETE /api/lists/:id
// ACCESS private

export const deleteList = asyncMiddleware(async (req, res) => {
    const { _id } = req.user;
    const list_id = req.params.id;

    const user = await User.findById(_id);

    const deletedList = await List.findByIdAndDelete(list_id);

    if (!user.lists.includes(list_id) || !deletedList) {
        return res
            .status(404)
            .send("List not found or insufficient permissions.");
    }

    const deletedItem = await Item.deleteMany({ list_id });

    user.lists = user.lists.filter((list) => list.toString() !== list_id);

    await user.save();

    res.status(200).json(deletedList);
});

// LIST ITEM LOGIC, CREATE, UPDATE OR DELETE ITEM
