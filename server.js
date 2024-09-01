const express = require("express");
const app = express();

const methodOverride = require("method-override");

const Article = require("./models/article");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/short-url", console.log("DB connected"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const articleRouter = require("./routes/articles");
app.use("/articles", articleRouter);

const PORT = 3000;

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});

    res.render("articles/index", { articles: articles});
})

app.listen(PORT, console.log("Server Started at PORT", PORT));