import "reflect-metadata";
import express from "express";
import * as yup from "yup";
import { createConnection } from "typeorm";
import { Poll } from "./entity/Poll";

async function main() {
  const app = express();
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

  app.listen(process.env.PORT || 4000, () =>
    console.log("🚀 Server listening")
  );
}

main().catch(console.error);
