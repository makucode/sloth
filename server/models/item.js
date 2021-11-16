import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    todo: {
        type: String,
        maxlength: 255,
        minlength: 1,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false,
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Item = new mongoose.model("Item", itemSchema);

export default Item;
