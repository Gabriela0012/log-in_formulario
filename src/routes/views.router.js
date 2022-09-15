import {Router} from 'express'

const router = Router()

router.get('/', (req,res)=>{
    res.render('welcome')
})
router.get('/chat', (req,res)=>{
    res.render('chat')
})
router.get('/login', (req,res)=>{
    res.render('login')
})
router.get('/registerUser', (req,res)=>{
    res.render('register')
})



export default router