import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const client_ip: string = getClientIp(request);
    console.log(`${client_ip} connected`);
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(client_ip);
}
