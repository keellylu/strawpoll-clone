import "reflect-metadata";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import * as yup from "yup";
import { createConnection } from "typeorm";
import { Poll } from "./entity/Poll";

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {});
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const conn = await createConnection();
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
    } catch (error) {
      res.status(422).send(error);
    }
    try {
      const poll = new Poll();
      poll.title = req.body.title;
      poll.description = req.body.description;
      poll.choices = req.body.choices;
      await poll.save();
      res.status(201).json(poll);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  io.on("connection", (socket) => {
    socket.broadcast.emit("Hello");
    socket.on("vote", (data) => {
      console.log(data);
    });
  });

  server.listen(process.env.PORT || 4000, () =>
    console.log("🚀 Server listening")
  );
}

main().catch(console.error);
