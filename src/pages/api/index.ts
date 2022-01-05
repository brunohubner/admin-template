import type { NextApiRequest, NextApiResponse } from "next"

interface IMessageData {
    status: string
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IMessageData>
) {
    if (req.method === "GET") {
        res.send({
            status: "ok",
            message: "App is live"
        })
        return
    }
    res.send({
        status: "error",
        message: "Method not allowed"
    })
}
