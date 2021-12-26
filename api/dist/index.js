"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const yup = __importStar(require("yup"));
const typeorm_1 = require("typeorm");
const Poll_1 = require("./entity/Poll");
async function main() {
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, {});
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const conn = await (0, typeorm_1.createConnection)();
    await conn.runMigrations();
    app.get("/", (req, res) => {
        res.send(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
    });
    app.post("/", async (req, res) => {
        const schema = yup.object().shape({
            title: yup.string().max(255).required(),
            description: yup.string().max(500),
            choices: yup.array().of(yup.string().max(255)),
        });
        try {
            await schema.validate(req.body);
        }
        catch (error) {
            res.status(422).send(error);
        }
        try {
            const poll = new Poll_1.Poll();
            poll.title = req.body.title;
            poll.description = req.body.description;
            poll.choices = req.body.choices;
            await poll.save();
            res.status(201).json(poll);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
    io.on("connection", (socket) => {
        socket.broadcast.emit("Hello");
        socket.on("vote", (data) => {
            console.log(data);
        });
    });
    server.listen(process.env.PORT || 4000, () => console.log("🚀 Server listening"));
}
main().catch(console.error);
//# sourceMappingURL=index.js.map