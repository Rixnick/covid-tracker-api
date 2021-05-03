import express from "express";
import mongoose from "mongoose";
import server from "./server";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const { APP_PORT, DB_URI, STRIPE_SECRET_KEY } = process.env;

const createServer = async () => {
  try {
    //connection to database
    await mongoose.connect(`${DB_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    server.applyMiddleware({ app });

    //Facebook Authentication
    app.post("/signin/facebook", async (req, res) => {
      res.send("Signin for facebook OAuth");
      // try {
      //     const response = await Axios({
      //         method: 'get',
      //         url: `https://graph.facebook.com/{graph-api-version}/oauth/access_token?
      //         grant_type=fb_exchange_token&
      //         client_id={app-id}&
      //         client_secret={app-secret}&
      //         fb_exchange_token={your-access-token}`
      //     })
      // } catch (error) {
      
      // }
    });
    app.listen({ port: APP_PORT }, () => {
      console.log(
        `Server is Start http://localhost:${APP_PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

createServer();