import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import http from "http";
import {schema_index} from "./resolvers";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import redis from "redis";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {subscribe, execute} from "graphql";

const main = async () => {
  await createConnection();

  const app = express();

  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:4000/graphql",
        "http://localhost:3000",
      ],
      credentials: true,
      //allowedHeaders: ["x-forwarded-proto", "https"],
    })
  );

  const schema = await schema_index;

  const apollo_server = new ApolloServer({
    schema,
    context: ({req, res}: any) => ({
      req,
      res,
      redis,
    }),
  });

  await apollo_server.start();

  apollo_server.applyMiddleware({app, cors: false});

  SubscriptionServer.create(
    {schema, subscribe, execute},
    {server: httpServer, path: apollo_server.graphqlPath}
  );

  httpServer.listen({port: process.env.PORT || 4000}, () => {
    console.log(
      `sever running on http://localhost:4000${apollo_server.graphqlPath}`
    );
  });
};

main();
