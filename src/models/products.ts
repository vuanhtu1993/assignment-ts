export class Product {
    name: String;
    originalPrice: Number;
    sellerPrice: Number;
    description?:String;
    longDescription?: String;
    category: String;
    images?: any;
    id: String;
    rate?:any;
    constructor(name:String, originalPrice:Number,sellerPrice:Number,description:String,longDescription:String,category:String,images:any,id:String) 
    {
        this.name = name; 
        this.originalPrice = originalPrice; 
        this.sellerPrice =sellerPrice; 
        this.description = description;
        this.longDescription = longDescription; 
        this.category = category; 
        this.images = images;
        this.id = id;
    }
}