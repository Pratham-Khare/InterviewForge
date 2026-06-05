import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./src/app.js");
const { default: connectToDB } = await import("./src/config/database.js");

connectToDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});