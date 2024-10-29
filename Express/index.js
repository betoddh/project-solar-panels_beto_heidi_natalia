const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use((err, req, res, next)=>{
    console.error(eror.stack);
    res.status(500).send("something went wrong");
  });

app.get('/', (req, res) => {
    

    res.render("home",   );
});

app.get('/quest', (req, res) => {

    res.render("quest",)
});


app.get('/savings', (req, res) => {
    res.render("savings", )
});


app.listen(4000, () => {
    console.log("on port 4000");
});