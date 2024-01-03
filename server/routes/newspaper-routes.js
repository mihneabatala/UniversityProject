import express from 'express';
import { deleteNewspaper, getAllNewspapers, getNewspaperData, getNewspaperById, insertNewspaper, updateNewspaper, checkNewspaperName } from '../services/newspaper-service.js';

const router = express.Router();

router.get('/', async (req,res,next) =>{
    try{
        const newspapers = await getAllNewspapers();
        res.status(200).json(newspapers);
    } catch(err){
        next(err);
    }
})

router.post('/', async (req,res,next) =>{
    const {name,category} = req.body;

    try{
        const checkName = await checkNewspaperName(name);
        if(checkName.length != 0){
            return res.status(400).json({message: "Name already exists! Please write a new name!"})
        }
        await insertNewspaper(name,category);
        const newspaper = await getNewspaperData(name);
    
        return res.status(200).json(newspaper); 
    }
    catch(err){ 
        next(err);
    }
})

router.delete('/:id', async (req,res,next) =>{
    const {id} = req.params;

    try{
        const newspaper = await getNewspaperById(id);
        await deleteNewspaper(id);
        return res.status(200).json(newspaper);
    } catch(err){
        next(err);
    }
})

router.patch('/:id', async(req,res,next)=>{
    const {name,category} =req.body;
    const {id} = req.params;
    try{
        await updateNewspaper(name,category,id);
        const editedNewspaper = await getNewspaperData(name);
        return res.status(200).json(editedNewspaper);
    }
    catch(err){
        next(err);
    }
})

export default router;