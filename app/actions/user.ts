import connect from "../lib/connectToDB";
import User from "../Models/UserSchema";

export const createOrUpdateUser = async (
  id: string,
  email_addresses: { email_address: string }[]
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkUserId: id }, // Corrected field name to match schema
      { $set: { emailAddress: email_addresses[0].email_address } }, // Corrected field name
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
  }
};
