const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir("./files", (err, file) => {
        res.render("index", {files: file});
    })
});

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.filename.split(" ").join("")}.txt`, req.body.details, (err, data) => {
        res.redirect("/");
    })
});

app.get(`/file/:filename`, (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, (err, filedata) => {
        res.render("show", {filename: req.params.filename, filedata: filedata});
    })
});

app.get(`/edit/:filename`, (req, res) => {
    res.render("edit", {filename: req.params.filename});
});

app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.prevname}`, `./files/${req.body.newname}`, (err, data) => {
        res.redirect("/");
    })
});

app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        res.redirect("/");
    })
})

app.listen(3000);