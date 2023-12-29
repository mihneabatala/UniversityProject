import express from 'express';
import { deleteNewspaper, getAllNewspapers, getNewspaperData, checkNewspaperId, insertNewspaper, stringCorect, updateNewspaper, checkNewspaperName } from '../services/newspaper-service.js';

const router = express.Router();

router.get('/', async (req,res,next) =>{
    try{
        const newspapers = await getAllNewspapers();
        res.status(200).json(newspapers);
    } catch(err){
        next(err);
    }
})

router.delete('/:id', async (req,res,next) =>{
    const {id} = req.params;

    try{
        const check = await checkNewspaperId(id);
        if(check.length == 0){
            return res.status(400).json({message: "Newspaper doesn't exist!"});
        } else{
            await deleteNewspaper(id);
            return res.status(200).json(check[0]);
        }
    } catch(err){
        next(err);
    }
})

router.post('/', async (req,res,next) =>{
    const {name,category} =req.body;

    try{
        const checkName = await checkNewspaperName(name);
        if(checkName.length != 0){
            return res.status(400).json({message: "Name already exists! Please write a new name!"})
        }
        const newName = stringCorect(name);
        const newCategory = stringCorect(category);

        await insertNewspaper(newName,newCategory);
        const newspaper = await getNewspaperData(newName);
    
        return res.status(200).json(newspaper);
    }
    catch(err){ 
        next(err);
    }
})

router.patch('/:id', async(req,res,next)=>{
    let {name,newName,newCategory} =req.body;

    try{
        const id = await getNewspaperId(name);
        if(id.length == 0){
            return res.status(400).json({message: "Newspaper doesn't exist!"});
        }
        const newspaperId= id[0].id;
        newName = stringCorect(newName);
        newCategory = stringCorect(newCategory);
        await updateNewspaper(newName,newCategory,newspaperId);
        return res.status(200).json({message: "Newspaper updated successfully"});
    }
    catch(err){
        next(err);
    }
})

export default router;