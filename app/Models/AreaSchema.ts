import { model, models, Schema } from "mongoose";

const AreaSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  clerkUserId: { type: String, required: true },
});

const Area = models.Area || model("Area", AreaSchema);

export default Area;
