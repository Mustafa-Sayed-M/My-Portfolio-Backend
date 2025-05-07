import {
    DELETE_ALL_SKILLS,
    DELETE_SINGLE_SKILL,
    GET_ALL_SKILLS,
    GET_SINGLE_SKILL,
} from "../handlers/skillsHandler.js";

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === "GET") { // GET Method:
            const { id } = req.query;
            return id
                ? await GET_SINGLE_SKILL(req, res)
                : await GET_ALL_SKILLS(req, res);

        } else if (method === "DELETE") { // DELETE Method:
            const { id } = req.query;

            if (id) {
                // delete single
                return await DELETE_SINGLE_SKILL(req, res);
            } else {
                // delete all
                return await DELETE_ALL_SKILLS(req, res);
            }

        } else { // Other Method:
            res.setHeader("Allow", ["GET", "DELETE"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}