import db from '../database/database.js'

export const getAllSubscribers = async() =>{
    const query= "SELECT * FROM subscriber;";

    try{
        const [subscribers] = await db.query(query);
        return subscribers;
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const getSubscriberData = async(email) =>{
    const query = "SELECT * from subscriber as s WHERE s.email = ?; "

    try{
        const [subscriber] = await db.query(query,[email]);
        return subscriber[0]
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const emailExistence = async(email) =>{
    const query = "SELECT COUNT(*) as emailCounter from subscriber as s WHERE s.email=?;";

    try{
        const [emailCounter] = await db.query(query,[email]);
        return emailCounter[0];
    }catch (err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const insertSubscriber = async (name, email, city) =>{
    const query = "INSERT INTO subscriber (name, email, city) VALUES (?, ?, ?);";

    try{
        await db.query(query,[name, email, city]);
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const deleteSubscriber = async (id) =>{
    const query = "DELETE FROM subscriber WHERE id = ?;"

    try{
        await db.query(query,[id]);
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const updateSubscriber = async (name, email, city, id) =>{
    const query ="UPDATE subscriber as s SET s.name=?, s.email=?, s.city=? WHERE s.id=?;"
    try{
        await db.query(query,[name, email, city, id]);
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const getSubscriberById = async (id)=>{
    const query = "SELECT * FROM subscriber as s WHERE s.id = ?;"
    try{
        const [subscriber] = await db.query(query,[id]);
        return subscriber[0];
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

