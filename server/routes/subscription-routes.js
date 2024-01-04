import  express  from "express";
import { getNewspaperData} from "../services/newspaper-service.js";
import { getSubscriberData} from "../services/subscriber-services.js";
import { deleteSubscription, getAllSubscriptions, getSubscriptionById, getSubscriptionData, insertSubscription, updateSubscription } from "../services/subscription-service.js";

const router = express.Router();

router.get('/', async (req,res,next) => {
    try{
        const subscriptions = await getAllSubscriptions();
        return res.status(200).json(subscriptions);
    }catch(err){
        next(err);
    }
})

router.post('/', async (req,res,next) => {
    const {newspaperName,subscriberEmail,type,price} = req.body;

    try{
        const newspaperData = await getNewspaperData(newspaperName);
        if(newspaperData === undefined){
            return res.status(400).json({message:"Newspaper doesn't exist or misspelled!"})
        }
        const subscriberData = await getSubscriberData(subscriberEmail)
        if(subscriberData === undefined){
            return res.status(400).json({message:"Subscriber doesn't exist or misspelled!"})
        }
        const newspaperId = newspaperData.id;
        const subscriberId = subscriberData.id;
        
        const subscription = await getSubscriptionData(newspaperId,subscriberId);
        if(subscription !== undefined){
            return res.status(400).json({message:"Subscription already purchased!"})
        }
        await insertSubscription(newspaperId,subscriberId,type,price);
        const newSubscription = await getSubscriptionData(newspaperId,subscriberId);
        const subscriptionData = {
            ...newSubscription,
            newspaperName:newspaperName,
            subscriberEmail:subscriberEmail
        }
        return res.status(200).json(subscriptionData);
    }
    catch(err){
        next(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    const {id} = req.params;
    try{
        await deleteSubscription(id);
        return res.status(200).json({message: 'Subscription deleted successfully!'});
    }catch(err){
        next(err);
    }
})

router.patch('/:id', async(req, res, next) => {
    const {id} = req.params;
    const {type, price} = req.body;

    try{
        await updateSubscription(type, price, id);
        const editedSubscription = await getSubscriptionById(id);
        return res.status(200).json(editedSubscription);
    }catch(err){
        next(err); 
    }
})

export default router;