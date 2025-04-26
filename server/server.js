import http from "http";
import app from "./app/index.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Connect to MongoDB before starting the server
connectDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
