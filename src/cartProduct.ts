
import headerClient from "./components/client/header";
import { percent, priceToVnd } from "./config";
import { reRender } from './config/index';

const cartProduct ={
   async render(){
    let data;
    let cell;
    if(localStorage.getItem("cart")){
        const retrievedObject:any = localStorage.getItem('cart');
        data =  JSON.parse(retrievedObject);
        cell = {data}.data
    }
           return /*html*/`
        ${headerClient.render()}
        
        <div class="m-auto w-2/6 px-3"> 
                 <div class="flex px-3 py-2">
                        <div class="basis-1/12">Trở về</div>
                        <div class="basis-11/12 text-center">Giỏ hàng</div>
                 </div>
               ${cell?cell?.map(c => /*html*/`
                     <div class="flex relative">    
                                    
                       <div class="basis-4/12">
                       <img src="${c.array.images.image}" width="193px">
                       </div>
                       <div class="basis-8/12 rounded-sm ">                 
                            <div class="text-sm py-1 font-semibold">${c.array.name}</div>
                                <div class="py-1"> 
                                        <span class="text-red-600p">${priceToVnd(Number(c.array.sellerPrice))}</span>
                                        <span class="text-sm text-gray-400 mx-2">${priceToVnd(Number(c.array.originalPrice))}</span>
                                        <span class="py-1 bg-red-600 text-white rounded">${percent(c.array.sellerPrice,c.array.originalPrice)}</span>
                                </div>
                                <div>
                                    <label class="text-base font-bold">Chọn số lượng : </label>
                                    <input class="border border-gray-500 w-1/5 element_amout" type="number" id="amount" min=1 value="${c.amount}" data-id="${c.amount}"> 
                                </div>
                                <div class="px-1 py-1 my-3 bg-gray-200 rounded">
                                    <span>- Chương trình khuyến mãi</span>
                                    <span>Ưu đãi Galaxy gift lên đến 1.700.000đ (VieON VIP HBO GO, Zing MP3, Phúc Long, Galaxy Play )</span>
                                </div> 
                       </div>
                      <div> <button class="exit" data-id= "${c.array.id}" class="absolute right-0 top-0">X</button> </div>
                 </div>
               `).join(''):`<div class="px-2 py-2 font-semibold text-xl">Úi bạn chưa đặt hàng kìa</div>`}
                <div class="my-2 border border-collapse rounded">
                        <div class="flex justify-between px-2 py-2">
                            <div class="font-bold">Tổng tiền tạm tính : </div>
                            <div id="sumcost" class="text-red-600"></div>
                        </div>
                        <div class="py-2 mx-2 my-2 bg-red-600 rounded text-center text-white font-bold">TIẾN HÀNH ĐẶT HÀNG</div>
                        <div class="py-2 mx-2 my-2 bg-white rounded text-center text-red-500 font-bold border border-red-500">CHỌN THÊM SẢN PHẨM KHÁC</div>
                </div>

        </div>  
        `
    },
    afterRender(){

        const sumprice = document.querySelector('#sumcost')as HTMLInputElement;
        const exitcell = document.querySelectorAll('.exit');
        const element_amout = document.querySelectorAll('.element_amout');
        
        element_amout.forEach((value)=>{
            value as HTMLInputElement
          
            value.addEventListener('change',()=>{
                console.log(value)
                let storage = localStorage.getItem('cart');
                let cart =[];
                if(storage){
                    cart = JSON.parse(storage);            
                } 
            })
        })
        exitcell.forEach(
            (value)=>{
                value.addEventListener('click',(e)=>{
                        e.preventDefault();
                        const id = value.dataset.id
                        let storage = localStorage.getItem('cart');
                        let cart;
                        if(storage){
                        cart = JSON.parse(storage);                                 
                        }    
                        cart = cart.filter((cart: { array: { id: any; }; })=> cart.array.id != id)
                        localStorage.setItem('cart',JSON.stringify(cart));   
                        reRender('#app',cartProduct)
                })
            }
        )


        const sum = () => {
            if(localStorage.getItem("cart")){
                const retrievedObject:any = localStorage.getItem('cart');
                let data =  JSON.parse(retrievedObject);
                let cell = {data}.data
                let sum:number = 0;
               
                for(const iterator of cell) {
                 sum += (Number(iterator.array.sellerPrice?iterator.array.sellerPrice:iterator.array.originalPrice)*iterator.amount)
                }   
                return sum;     
            }
        }
        setTimeout(  sumprice.innerHTML = String(priceToVnd(Number(sum()))),1)
        
    }
}
export default cartProduct;