import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb.js";

// ==========
// Get Projects Collection:
const getProjectsCollection = async () => {
    const client = await clientPromise;
    const db = client.db("MY_PORTFOLIO_DB");
    return db.collection("projects");
};
// ==========

// ==========
// # GET:
export const GET_ALL_PROJECTS = async (_, res) => {
    const projectsCollection = await getProjectsCollection();

    try {
        const projects = await projectsCollection.find({}).toArray();
        res.status(200).json(projects);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
};
export const GET_SINGLE_PROJECT = async (req, res) => {
    const projectsCollection = await getProjectsCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        // Find project with id:
        const project = await projectsCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found project:
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Return the project:
        return res.status(200).json(project);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching project", error: error.message });
    }
};
// ==========
// ==========
// # DELETE
export const DELETE_ALL_PROJECTS = async (_, res) => {
    const projectsCollection = await getProjectsCollection();

    try {
        // Delete all documents in the collection
        const result = await projectsCollection.deleteMany({});

        return res.status(200).json({ message: "All projects deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting all projects", error: error.message });
    }
};
export const DELETE_SINGLE_PROJECT = async (req, res) => {
    const projectsCollection = await getProjectsCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Find project with id:
        const project = await projectsCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found project:
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Delete the project:
        await projectsCollection.deleteOne({ _id: new ObjectId(id) })

        // Return success message:
        return res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error delete project", error: error.message });
    }
};
// ==========