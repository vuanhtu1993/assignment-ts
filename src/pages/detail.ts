import { apiGet, getOne } from '../api/products';
import footerClient from "../components/client/footer";
import headerClient from "../components/client/header";
import { ifelement, percent, priceToVnd } from "../config";
import { Product } from '../models/products';

const productDetail ={
   async render(id:any){
    const data = await (await getOne(id)).data;
    const likedata= await apiGet(`/products?category=${data.category}`)
    let like:Product[] = likedata.data;
    like = like.filter(cell => cell.id != data.id)
return /*html*/`
${headerClient.render()}
    
    <div class="content pt-10 w-10/12 m-auto">
    <h1 class="py-2 border-y-1 text-sm font-semibold"><a href="/" data-navigo>Trang chủ</a> > <a href="">${data.category}</a> > ${data.name}</h1>
    <h1 class="py-6 border-y-2 text-2xl font-bold">${data.name}</h1>
        <div class="flex py-3">
            <div class="basis-3/12">
                <img class="" src="${data.images.image}" alt="" width="358px">
                <div class="gird grid-cols-4 gap-1 py-4 ">
                    <img src="${data.images.thumbnail}" alt="" width="48">
                </div>
            </div>
            <div class="basis-9/12 flex px-3">
                   <div class="basis-1/2 flex">
                       <div class="pb-5 py-3 px-3">
                            <div class="text-red-500 pr-3 text-2xl font-semibold">${(priceToVnd(Number(data.sellerPrice)))}</div>
                            <div class="text-sm text-gray-400 py-2 font-medium">${data.sellerPrice?(priceToVnd(Number(data.originalPrice))):'<span class="text-2xl font-semibold text-black">'+(priceToVnd(Number(data.originalPrice)))+'</span>'}</div>
                            <div class="text-2xl text-white ml-3 rounded-xl bg-red-600 w-14">${percent(data.sellerPrice,data.originalPrice)}</div>
                       </div>
                      
                   </div>
                   <div class="basis-1/2">
                            <div class="grid grid-flow-col"> 
                                    <button class="px-2 py-2 border border-gray-400 mx-1 font-semibold">Tùy chọn 1</button>
                                    <button class="px-2 py-2 border border-gray-400 mx-1 font-semibold">Tùy chọn 2</button>
                                    <button class="px-2 py-2 border border-gray-400 mx-1 font-semibold">Tùy chọn 3</button>
                            </div>
                            <div class="grid grid-flow-col">                       
                                    <button class="px-1 py-1 border border-gray-400 mx-1 font-semibold my-2">Đen</button>
                                    <button class="px-1 py-1 border border-gray-400 mx-1 font-semibold my-2">Tình</button>
                                    <button class="px-1 py-1 border border-gray-400 mx-1 font-semibold my-2">Đỏ</button>
                                    <button class="px-1 py-1 border border-gray-400 mx-1 font-semibold my-2">Bạc</button>
                            </div>
                            <div class = "border border-gray-400 mx-1">
                                        <div class="border border-b-gray-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2"><span class="pl-4 text-lg font-bold">Giới thiệu sản phẩm</span></div>                            
                                        <div class="px-2 py-2"> ${data.description} </div>                                     
                            </div>
                            <div class="flex justify-between mx-1 my-3">
                                        <button class="basis-8/12 py-4 bg-red-600 text-center  rounded text-white hover:bg-gradient-to-r from-blue-500 hover:shadow-2xl">Mua ngay</button>
                                        <button id="addtocart" value="${id}" class="hover:bg-gradient-to-r from-blue-500 to-red-400 hover:shadow-2xl basis-3/12 border w-auto h-auto flex justify-center rounded py-2 px-2 "><img class="w-10 h-10" src="https://cellphones.com.vn/_nuxt_home/img/add-to-cart.97145ab.png"></button>
                                        
                            </div>
                   </div>
            </div>
        </div>
        <h1 class="pt-6 font-bold py-5">Sản phẩm cùng loại</h1>
        <div class="grid gap-2 grid-cols-5 py-20">

        ${ like.map(cell => /*html*/`
        <a class="hover:bg-gray-100 rounded hover:drop-shadow-xl" href="/#/product/${cell.id}"data-navigo>
        <div class="box p-4 static">
        <div class="absolute ml-2">
                 <span class="absolute text-red-600 mt-3 font-bold -rotate-45">${percent(cell.sellerPrice,cell.originalPrice)}</span>
                 <img class="" src="${ifelement(cell.sellerPrice)?'https://res.cloudinary.com/dtd8tra0o/image/upload/v1659820494/dl7aqs3dtxtalfpxuyme.png':''}" width="45px">
             </div>
        <div class="flex justify-center p-2 ">
          <img class="" src="${cell.images?.thumbnail}" width="160px" >
       
        </div>
        <h2 class="pb-6">${cell.name}</h2>
        <div class="flex">
            <span class="basis-6/12 text-red-600">${ifelement(cell.sellerPrice)?(priceToVnd(Number(cell.sellerPrice))):'<span class="ml-10 text-black">Giá gốc:</span>'}</span>
            <span class="basis-6/12">${(priceToVnd(Number(cell.originalPrice)))}</span>
        </div>
        <div class="bg-[#F3F4F6] rounded-lg border-2 px-1">[HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</div>
        <div class="flex"> 
        <div id="rater" data-rate-value="${cell.rate}"></div>
          
        </div>
    </div>
        
        </a>


 `).join('')}
        
        </div>
       
        <div class="py-2 rounded bg-[#F2F2F2] ">
                    <h1 class="text-red-600 text-center">ĐẶC ĐIỂM NỔI BẬT</h1>
            <span class="px-3 py-3">Camera chất lượng, bắt trọn từng khoảng khắc - Cụm 4 camera với cảm biến chính lên đến 108 MP</span>
        </div>
        <div class="fa-audio-description py-3">
            
        </div>
        <div class="long relative">
            <div id="overflow" class="longdescription py-3 h-60 overflow-hidden">
                <div class=""> ${data.longDescription} </div>
            </div>
            <div class="bg-gradient-to-t from-gray-200 h-20 w-full absolute bottom-0"></div> 
            <button id="btn" class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 absolute left-1/2 bottom-1 bg-blue-500 px-3 py-1 rounded opacity-70 font-bold">Xem thêm</button>
        </div>
    </div>
    ${footerClient.render()}
`
    } ,
    async afterRender(){
            const overflow = document.querySelector('#overflow');
            const btn= document.querySelector('#btn');
            const addtocart = document.querySelector('#addtocart') as HTMLInputElement | null;
            const id =addtocart?.value;
            const signout = document.querySelector('#signout') as HTMLInputElement;
            const auth = document.querySelector('#auth') as HTMLInputElement;
            const data = await getOne(String(id));
            const faddtocart = async ()=>{
            const array = data.data
            let storage = localStorage.getItem('cart');
            let cart =[]; 
            if(storage){
               cart = JSON.parse(storage);            
            }      
            let item = cart.find((cart: { array: { id: number | undefined; }; }) => cart.array.id == id);
            if(item){
                item.amount += 1;
            }
            else{
                cart.push({array,amount:1});
            }      
            localStorage.setItem('cart',JSON.stringify(cart));   
           }
            addtocart?.addEventListener('click',(error)=>{
                error.preventDefault();     
                const alert = window.confirm('Bạn có đồng ý thêm sản phẩm vào giỏ hàng ko ?');
                if(alert){
                    faddtocart();   
                }
              
            });

            btn?.addEventListener('click',(error)=>{               
                    error.preventDefault();   
                   if(btn){                 
                      if(btn.innerHTML == 'Xem thêm'){
                        overflow?.classList.remove('overflow-hidden','h-60');
                        btn.innerHTML = ('Rút gọn');
                        
                       }
                       else{
                        overflow?.classList.add('overflow-hidden','h-60');
                        btn.innerHTML = ('Xem thêm');
                       }
                   }
           })
           let storageUser = localStorage.getItem('User');         

           if(storageUser){
           const user = JSON.parse(storageUser);
              auth.innerHTML = `<a href="/">Hi! <span class="text-red-500 font-bold w-2">${(user.email).slice(0,5)}</span></a>`       
              signout.classList.remove('hidden')
              signout.addEventListener('click',()=>{
              const confirm= window.confirm('Bạn muốn đăng xuất khỏi tài khoản ko?')
               if(confirm){
                   localStorage.removeItem('User');
                   if(!localStorage.getItem('User')){
                       window.alert('Bạn đã đăng xuất')
                       location.href = ("/")
                   }
               }            
              })
            }else{
               auth.innerHTML = `<a href="/signin"></span class="">Đăng nhập</span></a>` 
            }
    }
}
export default productDetail;