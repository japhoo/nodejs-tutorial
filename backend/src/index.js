import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
// Node.js - place at the very top of your app entry (before any DB code)
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.log("ERROR", error);

        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App running on ${process.env.PORT}`);

        })
    } catch (error) {
        console.log("MongoDB connection failed", error);

    }
}

startServer();