import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const client_ip: string = request.connection.remoteAddress;
    console.log(`${client_ip} connected`);
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(client_ip);
}
