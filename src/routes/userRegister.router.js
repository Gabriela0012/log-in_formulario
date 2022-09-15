import { Router } from "express"
import usersDao from '../dao/MongoDAO/Users.js'
import { createHash } from '../utils.js'




const router = Router()
const userService = new usersDao()

router.get('/', async(req,res)=>{
	let users = await userService.getAll()
    console.log(users)

	res.send(users)
})

router.post('/', async(req,res)=>{

  const {email,name,last_name,age,nickname,avatar,password} = req.body;
  try{
  //   if(!email||!name||!last_name||!age||!nickname||!avatar||!password)return res.status(400).render({status:'error', error:'incomplete registration'})
  // console.log(req.body.email)
    const exists = await userService.getById(req.body.email)
    console.log(exists)

    if(exists) return res.status(400).render({status:'error',error:'ya existe ese usuario'})
    

    const newUser={
      email,
      name,
      last_name,
      age,
      nickname,
      avatar,
      password:createHash(password)
    }
    let result = await userService.save(newUser);
    if(result) return res.redirect('/login');

  }catch(error) {
    return res.json({error: 'no se pudo guardar usuario'})
  }
})

export default router