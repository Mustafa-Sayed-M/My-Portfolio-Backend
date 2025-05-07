import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb.js";

// ==========
// Get Skills Collection:
const getSkillsCollection = async () => {
    const client = await clientPromise;
    const db = client.db("MY_PORTFOLIO_DB");
    return db.collection("skills");
};
// ==========

// ==========
// # GET:
export const GET_ALL_SKILLS = async (_, res) => {
    // Allow Access:
    res.setHeader("Access-Control-Allow-Origin", "*");

    const skillsCollection = await getSkillsCollection();

    try {
        const skills = await skillsCollection.find({}).toArray();
        res.status(200).json(skills);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching skills", error: error.message });
    }
};
export const GET_SINGLE_SKILL = async (req, res) => {
    // Allow Access:
    res.setHeader("Access-Control-Allow-Origin", "*");

    const skillsCollection = await getSkillsCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        // Find skill with id:
        const skill = await skillsCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found skill:
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        // Return the skill:
        return res.status(200).json(skill);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching skill", error: error.message });
    }
};
// ==========
// ==========
// # DELETE
export const DELETE_ALL_SKILLS = async (_, res) => {
    // Allow Access:
    res.setHeader("Access-Control-Allow-Origin", "*");

    const skillsCollection = await getSkillsCollection();

    try {
        // Delete all documents in the collection
        const result = await skillsCollection.deleteMany({});

        return res.status(200).json({ message: "All skills deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting all skills", error: error.message });
    }
};
export const DELETE_SINGLE_SKILL = async (req, res) => {
    // Allow Access:
    res.setHeader("Access-Control-Allow-Origin", "*");

    const skillsCollection = await getSkillsCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Find skill with id:
        const skill = await skillsCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found project:
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        // Delete the skill:
        await skillsCollection.deleteOne({ _id: new ObjectId(id) })

        // Return success message:
        return res.status(200).json({ message: "Skill deleted successfully" });

    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error delete skill", error: error.message });
    }
};
// ==========