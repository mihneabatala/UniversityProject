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
    }catch (err) {
        console.error(err); 
        throw new Error("Database error!");
    }
}

export const getNewspaperData = async (name) => {
    const query = "SELECT * FROM newspaper as n WHERE n.name = ?;"

    try{
        const [newspaper] = await db.query(query,[name]);
        if(newspaper[0] !== undefined){
            newspaper[0].publication_date = newspaper[0].publication_date.toLocaleDateString();
        }
        return newspaper[0];
    }catch (err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const checkNewspaperName = async (name) => {
    const query ="SELECT * FROM newspaper as n WHERE n.name = ?;"

    try{
        const [newspaper] = await db.query(query,[name]);
        return newspaper;
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const getNewspaperById = async (id) =>{
    const query = "SELECT * FROM newspaper as n WHERE n.id = ?;"

    try{
        const [newspaper] = await db.query(query,[id]);
        return newspaper[0];
    }catch (err) {
        console.error(err.message);
        throw new Error("Database error!");
    }
}

export const deleteNewspaper = async (id) =>{
    const query = "DELETE from newspaper as n WHERE n.id = ?;";

    try{
        await db.query(query,[id]);
    }catch(err){
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

export const updateNewspaper = async(newName,newCategory,id)=>{
    const query = "UPDATE newspaper as n SET n.name =?, n.category =? WHERE n.id = ? ;";

    try{
        await db.query(query,[newName,newCategory,id])
    }catch(err){
        console.error(err.message);
        throw new Error("Database error!");
    }
}