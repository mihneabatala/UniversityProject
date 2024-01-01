import express from 'express';
import {deleteSubscriber, emailExistence, getAllSubscribers, getSubscriberData, getSubscriberById, insertSubscriber, updateSubscriber} from '../services/subscriber-services.js'
const router = express.Router();    

router.get('/', async (req,res,next)=>{
    try {
        const subscribers = await getAllSubscribers();
        res.status(200).json(subscribers);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req,res,next)=>{
    const {name, email, city} = req.body;
    try{
        const emailCounter = await emailExistence(email);
        if(emailCounter.emailCounter!=0){
            return res.status(400).json({ message: "Email already registered!"});
        }  
        await insertSubscriber(name,email,city);
        const subscriber = await getSubscriberData(email);
        return res.status(200).json(subscriber);

    } catch(error) {
        next(error);
    }
})

router.delete('/:id', async(req,res,next)=>{
    const {id} = req.params;
    try{
        const subscriber = await getSubscriberById(id);
        await deleteSubscriber(id);
        return res.status(200).json(subscriber);
    }
    catch (error) {
        next(error);
    }
})

router.patch('/:id', async(req, res,next)=>{
    const {name,email,city} = req.body;
    const {id} = req.params;
    
    try{
        await updateSubscriber(name,email,city,id);
        const editedSubscriber = await getSubscriberById(id);
        return res.status(200).json(editedSubscriber);
    }catch (error) {
        next(error);
    }

})


export default router;