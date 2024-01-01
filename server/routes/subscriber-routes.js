import express from 'express';
import {deleteSubscriber, emailExistence, getAllSubscribers, getSubscriberId, insertSubscriber, updateSubscriber} from '../services/subscriber-services.js'
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
        if(emailCounter[0].emailCounter!=0){
            return res.status(400).json({ error: "Email already in use!"});
        }  

    

        await insertSubscriber(name,email,city);
        return res.status(200).json({ message: "Subscriber successfully added!" })

    } catch(error) {
        next(error);
    }
})

router.delete('/:id', async(req,res,next)=>{
    const {id} = req.params;
    try{
        const emailCounter = await emailExistence(email);
        if(emailCounter[0].emailCounter==0){
            return res.status(400).json({ error: "Subscriber doesn't exist!"});
        }
        await deleteSubscriber(name,email);
        return res.status(200).json({ message: "Subscriber deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
})

router.patch('/', async(req, res,next)=>{
    const {name,email,updatedEmail,city} = req.body;
    
    try{
        const emailCounter = await emailExistence(email);
        if(emailCounter[0].emailCounter==0){
            return res.status(400).json({ error: "Subscriber doesn't exist!"});
        }
    
    let subscriberId;
    subscriberId = await getSubscriberId(email);

    

    await updateSubscriber(name,updatedEmail,city,subscriberId);
    return res.status(200).json({message: "Subscriber updated successfully!" })
    
    }catch (error) {
        next(error);
    }

})


export default router;