import mongoose from "mongoose";
const Schema = mongoose.Schema;

const athleteSchema = new Schema({
  name: { type: String },
  country: { type: String },
  discipline: { type: String },
  image: { type: String },
  age: { type: Number },        
  date: { type: Date },          
  place: { type: String },       
  medals: {
    gold: { type: Number },
    silver: { type: Number },
    bronze: { type: Number },
  },
  history: [
    {
      event: { type: String },
      position: { type: String },
    },
  ],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }]
});

export default mongoose.model("Athlete", athleteSchema, "athletes");