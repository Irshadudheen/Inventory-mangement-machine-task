import { Request, Response, Router } from "express";
import { param } from "express-validator";
import { Item } from "../../models/InventoryItems";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router()
router.put('/api/item/edit/:itemId',[
    param('itemId').trim()
    .notEmpty()
    .withMessage('itemId is required')
],validateRequest, async(req:Request, res:Response) => {
    const {name,description,price,stock}=req.body;
    const {itemId}=req.params
    const item = await Item.findById(itemId);
    if(!item){
        throw new BadRequestError('Item not found')
    }
    item.name=name||item.name;
    item.description=description||item.description;
    item.price=price||item.price;
    item.stock=stock||item.stock;
    await item.save()
    res.status(200).send(item)
})
export {router as editItemRouter}