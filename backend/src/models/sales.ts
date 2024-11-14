import {model,Model,Document,Schema} from 'mongoose';



interface SalesAttrs {
 customerId:string;
 userId:string;
 stock:number;
 price:number;
 totalPrice:number;
}

interface SalesModel extends Model<SalesDoc>{
    build(attrs:SalesAttrs):SalesDoc;
}

interface SalesDoc extends Document{
    customerId:string;
 userId:string;
 stock:number;
 price:number;
 totalPrice:number;
}

const salesScheema = new Schema({
   userId:{requred:true,type:Schema.ObjectId,ref:"User"},
   totalPrice:{required:true,type:Number},
   stock:{required:true,type:Number},
   customerId:{required:true,type:Schema.ObjectId,ref:'Customer'}
},{toJSON:{
    transform(doc,ret){
        ret.id=ret._id;
        delete ret._id;
        delete ret.__v
    }
}});



salesScheema.statics.build = (attrs:SalesAttrs)=>{
    return new Sales(attrs)
}

const Sales = model<SalesDoc,SalesModel>('Sales',salesScheema)
export { Sales };