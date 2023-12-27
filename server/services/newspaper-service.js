import db from "../database/database.js";

export const getAllNewspapers = async () =>{
    const query = "SELECT * FROM newspaper;"

    try {
        const [newspapers] = await db.query(query);
        return newspapers;
    }
    catch (err) {
        throw new Error("Database error!");
    }
}

export const getNewspaperId = async (name) =>{
    const query = "SELECT n.id FROM newspaper as n WHERE n.name = ?;"

    try{
        const [id] = await db.query(query,[name]);
        return id;
    }
    catch (err) {
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const deleteNewspaper = async (name) =>{
    const query = "DELETE from newspaper as n WHERE n.name = ?;";

    try{
        await db.query(query,[name]);
    }
    catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const insertNewspaper = async (name,category) =>{
    const query = "INSERT INTO newspaper (name, publication_date, category) VALUES (?, ?, ?);";

    try{
        const date = new Date().toISOString().split('T')[0];
        await db.query(query,[name,date,category]);
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const stringCorect = (string)=>{
    let newString = string.toLowerCase();
    newString = newString[0].toUpperCase() + newString.slice(1);
    return newString;
}

export const updateNewspaper = async(newName,newCategory,id)=>{
    const query = "UPDATE newspaper as n SET n.name =?, n.category =? WHERE n.id = ? ;";

    try{
        await db.query(query,[newName,newCategory,id])
    }
    catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}