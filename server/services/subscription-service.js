import db from "../database/database.js";
import { getNewspaperById } from "./newspaper-service.js";
import { getSubscriberById } from "./subscriber-services.js";

export const getAllSubscriptions = async () =>{
    const query = "SELECT * FROM subscription;"

    try{
        const [subscriptions] = await db.query(query);

        const updatedSubscriptions = [];

        for(let i =0; i < subscriptions.length;i++){
            const date = subscriptions[i].start_date.toLocaleDateString();
            const newspaperName = await getNewspaperById(subscriptions[i].id_newspaper);
            const subscriberName = await getSubscriberById(subscriptions[i].id_subscriber);
            const updatedSubscription = {
                ...subscriptions[i],
                start_date: date,
                subscriberEmail: subscriberName.email,
                newspaperName: newspaperName.name
            }
            updatedSubscriptions.push(updatedSubscription);
        }
        
        return updatedSubscriptions;

    }catch(err){
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const insertSubscription = async(newspaperId, subscriberId, type, price) => {
    const query = "INSERT INTO subscription (id_newspaper, id_subscriber, type, price, start_date) VALUES (?,?,?,?,?);"

    try{
        const date = new Date().toISOString().split('T')[0];
        await db.query(query,[newspaperId,subscriberId,type,price,date]);
    }catch(err){    
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const getSubscriptionData = async(newspaperId, subscriberId) => {
    const query = "SELECT * FROM subscription as s WHERE s.id_newspaper=? and s.id_subscriber=?;"

    try{
        const [subscription] = await db.query(query,[newspaperId,subscriberId]);
        if(subscription[0] !== undefined){
            subscription[0].start_date = subscription[0].start_date.toLocaleDateString();
        }
        return subscription[0];
    }catch(err){
        console.error(err); 
        throw new Error("Database error!");
    }
} 

export const getSubscriptionById = async(id) => {
    const query = "SELECT * FROM subscription as s WHERE s.id =?;"

    try{
        const [subscription] = await db.query(query,[id]);
        if(subscription[0] !== undefined){
            subscription[0].start_date = subscription[0].start_date.toLocaleDateString();
        }
        return subscription[0];
    }catch(err){
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const deleteSubscription = async(id) => {
    const query = "DELETE FROM subscription as s WHERE s.id =?;"

    try{
        await db.query(query,[id]);
    }catch(err){
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const updateSubscription = async (type, price, id) => {
    const query = "UPDATE subscription as s SET s.type = ?, s.price= ? WHERE s.id = ?;"
    try{
        await db.query(query,[type, price, id]);
    }catch(err){
        console.error(err); 
        throw new Error("Database error!");
    }
}