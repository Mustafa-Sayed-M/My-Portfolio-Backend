import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb.js";

// ==========
// Get Services Collection:
const getServicesCollection = async () => {
    const client = await clientPromise;
    const db = client.db("MY_PORTFOLIO_DB");
    return db.collection("services");
};
// ==========

// ==========
// # GET:
export const GET_ALL_SERVICES = async (_, res) => {
    const servicesCollection = await getServicesCollection();

    try {
        const services = await servicesCollection.find({}).toArray();
        res.status(200).json(services);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching services", error: error.message });
    }
};
export const GET_SINGLE_SERVICE = async (req, res) => {
    const servicesCollection = await getServicesCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        // Find service with id:
        const service = await servicesCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found service:
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Return the service:
        return res.status(200).json(service);
    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error fetching services", error: error.message });
    }
};
// ==========
// ==========
// # DELETE
export const DELETE_ALL_SERVICES = async (_, res) => {
    const servicesCollection = await getServicesCollection();

    try {
        // Delete all documents in the collection
        const result = await servicesCollection.deleteMany({});

        return res.status(200).json({ message: "All services deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting all services", error: error.message });
    }
};
export const DELETE_SINGLE_SERVICE = async (req, res) => {
    const servicesCollection = await getServicesCollection();

    const { id } = req.query;

    try {
        // Check from id:
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Find service with id:
        const skill = await servicesCollection.findOne({ _id: new ObjectId(id) });

        // In case if  not found service:
        if (!skill) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Delete the service:
        await servicesCollection.deleteOne({ _id: new ObjectId(id) })

        // Return success message:
        return res.status(200).json({ message: "Service deleted successfully" });

    } catch (error) { // Handle errors:
        return res.status(500).json({ message: "Error delete service", error: error.message });
    }
};
// ==========