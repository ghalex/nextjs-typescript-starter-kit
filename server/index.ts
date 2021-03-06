import express from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/status", (_, res) => {
    res.status(200).json({ online: true, production: !dev });
  });

  server.get("*", (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) {
      throw err;
    }
    // tslint:disable-next-line:no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
