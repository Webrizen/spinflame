require("dotenv").config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

module.exports = {
  url: `mongodb+srv://${username}:${password}@spinflame.l6oc6.mongodb.net/backend`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
