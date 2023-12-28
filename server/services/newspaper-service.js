import db from "../database/database.js";

export const getAllNewspapers = async () =>{
    const query = "SELECT * FROM newspaper;"

    try {
        const [newspapers] = await db.query(query);

        for(let i =0; i < newspapers.length;i++){
            const date = newspapers[i].publication_date.toLocaleDateString();
            newspapers[i].publication_date = date;
        }
        return newspapers;
    }
    catch (err) {
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const getNewspaperData = async (name) => {
    const query = "SELECT * FROM newspaper as n WHERE n.name = ?;"

    try{
        const [newspaper] = await db.query(query,[name]);
        newspaper[0].publication_date = newspaper[0].publication_date.toLocaleDateString();
        return newspaper;
    } catch (err){
        console.error(err.message);
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