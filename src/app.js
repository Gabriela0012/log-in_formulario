import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productContainerKnex from './container/productContainerKnex.js'
import chatContainerKnex from './dao/MongoDAO/Messages.js'
import productTestRouter from './routes/productTest.router.js'
import messageRouter from './routes/message.router.js'
import messageNormalizerRouter from './routes/messagesNormalize.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userRegisterRouter from './routes/userRegister.router.js'
import loginRouter from './routes/login.router.js'
import currentRouter from './routes/current.router.js'
import logoutRouter from './routes/logout.router.js'


const app = express()
const productService = new productContainerKnex();
const chatService = new chatContainerKnex();



const server = app.listen(8080, () => {
  console.log('listening on 8080 port \n')
})


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(session({
  store:MongoStore.create({
    mongoUrl:`mongodb+srv://gabriela:135632@ecommerce1.dxk6fgr.mongodb.net/BaseSessions?retryWrites=true&w=majority`,
    ttl:10
  }),
  secret:'desafio login por formulario',
  resave:false,
  saveUninitialized:false,
  cookie: {
    maxAge: 60000
  }


}))


app.use('/', viewsRouter)
app.use('/api/products-test',productTestRouter);
app.use('/api/messages',messageRouter);
app.use('/api/message',messageNormalizerRouter);
app.use('/api/registerUser',userRegisterRouter);
app.use('/api/login',loginRouter);
app.use('/api/current',currentRouter);
app.use('/api/logout',logoutRouter);


const io = new Server(server)
let products
let log

io.on('connection', async (socket) => {

  products = await productService.getAllProduct()

  log = await chatService.getAll()



  console.log('Socket connected')
  socket.broadcast.emit('newUserConnected')
  io.emit('log', log)
  socket.emit('productList', { products })

  socket.on('message', async(data) => {
    let currentTime = new Date();
    data.date = currentTime.toLocaleTimeString();
    await chatService.addChat(data)

    log = await chatService.getAll()
    io.emit('log', log)
  })
    
  socket.on('addProduct', async (data) => {
    await productService.addNewProduct(data)
    products = await productService.getAllProduct()
    io.emit('productList', { products })
  })

    
})
