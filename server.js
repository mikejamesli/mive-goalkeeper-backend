/* eslint-disable no-console */
import Koa from "koa";
import KoaBody from "koa-body";
import Logger from "koa-logger";
import KoaBodyParser from "koa-bodyparser";
import Router from "koa-router";
import fetch from "isomorphic-fetch";
import mount from "koa-mount";
import cors from "@koa/cors";

const port = parseInt(process.env.PORT, 10) || 8000;
const server = new Koa();
const router = new Router();
const api = new Koa();

const corsOptions = {
  credentials: true
};

router.get('/sso', async ctx => {
  ctx.status = 200
  ctx.body = "hello world"
})

api.use(cors(corsOptions));
server.use(Logger());
server.use(KoaBody({ multipart: true }));
server.use(KoaBodyParser());

api.use(router.routes());
api.use(router.allowedMethods());
server.use(mount("/api", api));

server.listen(port, () => {
  console.log(`> Ready on :${port}`);
});
