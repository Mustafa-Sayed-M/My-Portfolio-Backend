import { GET_PROFILE } from "../handlers/profileHandler.js";

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === "GET") { // GET Method:
            return await GET_PROFILE(req, res);

        } else { // Other Method:
            res.setHeader("Allow", ["GET"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}