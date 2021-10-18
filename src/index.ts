import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import { createConnection } from "typeorm";
import { MailingAddress } from "./entities/MailingAddress/MailingAddress";
import { Person } from "./entities/Person/Person";
import { PhoneNumber } from "./entities/PhoneNumber/PhoneNumber";

const __prod__ = process.env.NODE_ENV === "production";

const main = async () => {
  console.log(`Server starting... Will attempt on port ${process.env.PORT}`);
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABSE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: !__prod__,
    synchronize: true,
    entities: [MailingAddress, Person, PhoneNumber],
  });

  conn;

  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,

      credentials: true,
    })
  );
  console.log("Server cors policy: " + process.env.CORS_ORIGIN);

  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [],
  //     validate: false,
  //     // authChecker:
  //   }),
  //   context: ({ req, res }) => ({
  //     req,
  //     res,
  //   }),
  // });

  // apolloServer.applyMiddleware({ app, cors: false });

  // Health check
  app.get("/", (_, res) => {
    res.status(200).send("Healthy");
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log("Server started on localhost:4000");
  });
};

main();
