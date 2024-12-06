
const express = require("express");
const app = express();
const router_glasses = require("./router/routerOculos")
const router_ala = require("./router/routerAla")
const routerOculos_Alas = require("./router/routerOculos_Ala")
const path = require("path")
const methodOverride = require('method-override');



app.set('view engine',"ejs")
app.use(express.json()) 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router_glasses)
app.use(router_ala)
app.use(routerOculos_Alas)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
