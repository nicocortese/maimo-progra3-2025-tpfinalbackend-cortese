import mongoose, { mongo } from "mongoose";

const AthleteSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    discipline: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    email: { type: String, required: true},
});

const FavoriteSchema = new mongoose.Schema({
    user: { type: UserSchema, required: true },
    athletes: { type: [AthleteSchema], required: true },
},
{ timestamps: true }
);

export default mongoose.model("Favorite", FavoriteSchema, "Favorites");
