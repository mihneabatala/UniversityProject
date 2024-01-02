import  express  from "express";
import { getNewspaperData} from "../services/newspaper-service.js";
import { getSubscriberData} from "../services/subscriber-services.js";
import { getAllSubscriptions, getSubscriptionData, insertSubscription } from "../services/subscription-service.js";

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
            return res.status(400).json({message:"Newspaper doesn't exist!"})
        }
        const subscriberData = await getSubscriberData(subscriberEmail)
        if(subscriberData === undefined){
            return res.status(400).json({message:"Subscriber doesn't exist!"})
        }
        const newspaperId = newspaperData.id;
        const subscriberId = subscriberData.id;
        
        const subscription = await getSubscriptionData(newspaperId,subscriberId);
        if(subscription !== undefined){
            return res.status(400).json({message:"Subscription already bought!"})
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

export default router;