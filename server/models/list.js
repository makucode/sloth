import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: [],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const List = new mongoose.model("List", listSchema);

export default List;
