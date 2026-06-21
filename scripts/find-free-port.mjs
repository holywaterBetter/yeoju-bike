import net from "node:net";

const host = process.env.HOST || "127.0.0.1";

const server = net.createServer();

server.listen(0, host, () => {
  const address = server.address();

  if (!address || typeof address === "string") {
    server.close(() => {
      process.exitCode = 1;
    });
    return;
  }

  console.log(address.port);
  server.close();
});

server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
