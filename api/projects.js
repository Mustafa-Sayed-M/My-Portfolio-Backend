import {
    DELETE_ALL_PROJECTS,
    DELETE_SINGLE_PROJECT,
    GET_ALL_PROJECTS,
    GET_SINGLE_PROJECT,
} from "../handlers/projectsHandlers.js";

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === "GET") { // GET Method:
            const { id } = req.query;
            return id
                ? await GET_SINGLE_PROJECT(req, res)
                : await GET_ALL_PROJECTS(req, res);

        } else if (method === "DELETE") { // DELETE Method:
            const { id } = req.query;

            if (id) {
                // delete single
                return await DELETE_SINGLE_PROJECT(req, res);
            } else {
                // delete all
                return await DELETE_ALL_PROJECTS(req, res);
            }

        } else { // Other Method:
            res.setHeader("Allow", ["GET", "DELETE"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}