import cors from "cors";
import express from "express";
import { createServer } from "http";
import { join } from "path";
import "reflect-metadata";
import { Server } from "socket.io";
import { createConnection } from "typeorm";
import * as yup from "yup";
import { __prod__ } from "./constants";
import { Choice } from "./entity/Choice";
import { Poll } from "./entity/Poll";
import { Vote } from "./entity/Vote";

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {});
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  const conn = await createConnection({
    type: "postgres",
    database: __prod__ ? undefined : "strawpoll",
    url: __prod__ ? process.env.DATABASE_URL : undefined,
    entities: [join(__dirname, "./entity/*")],
    migrations: [join(__dirname, "./migrations/*")],
    synchronize: !__prod__,
    logging: !__prod__,
  });
  await conn.runMigrations();

  app.get("/polls/:id", async (req, res) => {
    const { id } = req.params;
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const poll = await Poll.findOne(id, { relations: ["choices"] });
    let voteStatus: Vote | undefined;
    if (poll?.useIpAddress) {
      voteStatus = await Vote.findOne({
        where: { pollId: id, ipAddress },
      });
    }
    res.status(200).json({ ...poll, voteStatus });
  });

  app.post("/vote/:id", async (req, res) => {
    const { id } = req.params;
    const { choiceId } = req.body;

    // NOTE: on localhost, IP addresses are not available (it returns "::1")
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const poll = await Poll.findOne(id);

    const choice = await Choice.findOne(choiceId);

    if (choice.pollId !== id) {
      return res.status(400).json({
        error: "Choice does not belong to this poll",
      });
    }

    if (poll?.useIpAddress) {
      const vote = await Vote.findOne({ where: { pollId: id, ipAddress: ip } });
      if (vote) {
        return res.status(400).json({
          error: "You have already voted in this poll",
        });
      }
    }

    const vote = new Vote();
    vote.pollId = id;
    vote.choiceId = choiceId;
    if (poll?.useIpAddress) {
      vote.ipAddress = ip?.toString();
    }
    await vote.save();

    choice.votes++;
    await choice.save();

    return res.status(201).json(vote);
  });

  app.post("/polls", async (req, res) => {
    const schema = yup.object().shape({
      title: yup.string().max(255).required(),
      description: yup.string().max(500),
      choices: yup
        .array()
        .of(yup.string().max(255))
        .test({
          message: "Must be at least 2 choices",
          test: (choices) =>
            choices
              ? choices.filter((x) => x?.trim() != "").length >= 2
              : false,
        }),
      useIpAddress: yup.bool().required(),
      allowSelectMultiple: yup.bool().required(),
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
      poll.allowSelectMultiple = req.body.allowSelectMultiple;
      poll.useIpAddress = req.body.useIpAddress;
      await poll.save();
      await Promise.all(
        req.body.choices
          .filter((x: string) => x != "")
          .map((choice: string) =>
            Choice.create({ pollId: poll.id, value: choice }).save()
          )
      );
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
