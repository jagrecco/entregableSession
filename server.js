const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const auth = require("./auth.js")

const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const prodsFake = require("./productosFake.js")
const p = require("./public/prod2.json")
const mensajes = [];
const productos = p;

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);


app.set('views', './public');
app.set('view engine', 'ejs');

app.set('json spaces', 2)

//middleware
app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongoUrl: "mongodb+srv://jag:cxDM9ysG6pVp8Szi@clustertest0.k6leblk.mongodb.net/?retryWrites=true&w=majority" }),
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);


app.post("/login", (req, res) => {
  
  const { username } = req.body;
  
  if (username == '') {
    return res.redirect('/')
  }
  req.session.user = username;
  res.redirect('/productos')
  
});

app.get("/logout", (req, res) => {
  const usuario=req.session.user
  req.session.destroy((err) => {
    if (!err) res.render('logout', {usuario})
    else res.send("Error");
  });
});

app.get("/", (req, res) => {
  
  res.render('index.html', {productos});

});

app.get('/productos', (req, res) => {
  const usuario=req.session.user
  
  if (!usuario) {return res.redirect('/')}
  res.render('index', {productos, usuario});

})

app.get('/api/productos-test', (req, res)=>{
  
  res.render('tablaFake', {prodsFake})
  
})

app.post('/productos', (req, res) => {
  productos.push(req.body)

})

httpServer.listen(8080, () => console.log("SERVER ON: Puerto 8080")); 

// Servidor
io.on("connection", (socket) => {

  console.log("¡Nuevo cliente conectado!");

  socket.emit("mensajes", mensajes);

  socket.emit("productos", productos);

  socket.on("mensaje", (data) => {

    mensajes.push(data)
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("producto", (prod) => {

    productos.push(prod)
    io.sockets.emit("productos", productos);

  });

});
