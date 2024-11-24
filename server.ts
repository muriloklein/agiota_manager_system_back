import app from "./src/app";
import { appDataSource } from "./src/data-source";
import seedUsers from "./src/seed/user";

const PORT = parseInt(process.env.API_PORT || "3002");

appDataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    await seedUsers(appDataSource);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
