import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb.js";

// ==========
// Get Profile Collection:
const getProfileCollection = async () => {
    const client = await clientPromise;
    const db = client.db("MY_PORTFOLIO_DB");
    return db.collection("profile");
};
// ==========

// ==========
// # GET:
export const GET_PROFILE = async (req, res) => {
    // Allow Access:
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        const profileCollection = await getProfileCollection();

        const profile = await profileCollection.find({}).toArray();
        res.status(200).json({
            message: 'Profile Fetched Successfully',
            status: 200,
            profile
        });
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error Fetched Profile", error: error.message });
    }
};
// ==========