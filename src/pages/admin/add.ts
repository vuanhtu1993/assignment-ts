import { add, getAll } from "../../api/products";
import AdminHeader from "../../components/admin/header";
import { uploadFile } from "../../config";
import { Product } from "../../models/products";

const addProduct = {
    async render(){

          const data =  await getAll();
          const category:Product[] = data.data;
          let categories = category.map(i => i.category)
          categories = categories.filter(function(item, pos) {
              return categories.indexOf(item) == pos;
          })
            return /*html*/`
            ${AdminHeader.render()}
                   <h1 class=" pl-3 py-2 pt-5 text-[#5F5E61] text-2xl"> Thêm sản phẩm mới </h1>
            <form id="addform"> 
                <div class="flex">
                    <div class="basis-5/12">
                            <div class=" flex justify-center h-60 relative ">
                                    <div class="flex flex-col justify-center">
                                        <div class="flex justify-center">
                                        <img class="profile-pic" src="">
                                        <img class="" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658504103/Icon_lo8cnj.png" width="40"></div>
                                        <input type="file" name="image" id="image" data-max-file-size="3MB"
                                        data-max-files="3" class=" absolute opacity-0 bottom-15 w-20 h-20"> 
                                        <span class="text-xl text-[#3D5170] py-2">Thêm ảnh</span>               
                                    </div>
                            </div>
                            <div>
                            <div class="flex justify-center"> 
                            <textarea class="w-3/4 border rounded flex" id="description" name="description" rows="4" cols="50" placeholder="Mô tả ngắn" ></textarea></div>
                                      
                            </div>
                        </div>
                     <div class="basis-7/12">
                            <div class="py-3 border-b-2">Thông tin sản phẩm</div>
                            <div class="flex flex-col py-2"> 
                                <label class="py-2">Tên sản phẩm</label>
                                <input class="border rounded py-1" type="text" name="name" id="name">
                            </div>
                            <div class="flex"> 
                                <div class="basis-1/2 flex flex-col">
                                    <label>Giá gốc</label>
                                    <input class="border rounded py-1 w-11/12" type="number" name="originalPrice" id="originalPrice"  >
                                </div>
                                <div class="basis-1/2 flex flex-col">
                                    <label>Giá khuyến mãi</label>
                                    <input class="border rounded py-1 w-11/12" type="number" name="sellerPrice" id="sellerPrice" >
                                </div>
                            </div>
                            <div class="flex flex-col py-2"> 
                                <label class="py-2">Danh mục</label>
                                <select class="border rounded py-1 w-1/2" id="category" name="category">
                                ${categories.map(c => ` <option value="${c}">${c}</option>`).join('')}            
                                 </select>
                            </div>
                            <div class=""> 
                                <label class="py-2">Đặc điểm nổi bật ?</label>
                                <div>
                                <textarea class="w-full border rounded" id="hot" name="hot" rows="4" cols="50"></textarea>
                                
                                
                                </div>
                           </div>
                            <div class=""> 
                                <label>Mô tả dài</label>
                                <textarea class="w-full border rounded" id="longDescription" name="longDescription" rows="4" cols="50"></textarea>
                                
                                
                            </div>
                            <button id="submit" class="rounded bg-blue-400 py-2 px-2 text-white" type="submit">Thêm mới</button>
                     </div>
                 </div>
            </form>
            `
    },
    afterRender(){
        const form = document.querySelector('#addform')
        const name:any = document.querySelector('#name');
        const originalPrice:any = document.querySelector('#originalPrice');
        const sellerPrice:any = document.querySelector('#sellerPrice');
        const category:any = document.querySelector('#category');
        const longDescription:any = document.querySelector('#longDescription');
        const description:any = document.querySelector('#description');
        const image:any = document.querySelector('#image');
        // const demoimage:any =  document.querySelector('.profile-pic')

        // image.addEventListener('load',(e)=>{
        //     e.preventDefault();
        //     console.log(image)
        // })

    form?.addEventListener('submit',async (e)=>{
            e.preventDefault();
            
            async function  validate() {
                if(name.value == "" ) {
                   alert( "làm ơn nhập tên!" );
                   name.focus();
                   return false;
                }    
                if(originalPrice.value == "" ) {
                    alert( "làm ơn nhập giá gốc" );
                    originalPrice.focus();
                    return false;
                 }   
                 if(image.files[0] == undefined) {
                    alert( "làm ơn nhập ảnh" );
                    image.focus();
                    return false;
                 }            
                else {
                    let urlimage = null;
              if(image.value){
              urlimage =  await (await uploadFile(image.files[0])).data.url
            }
            const product ={
                    name : name.value,
                    originalPrice:originalPrice.value,
                    sellerPrice: sellerPrice.value,
                    category: category.value,
                    longDescription: longDescription.value,
                    description: description.value,            
                    images:{thumbnail:urlimage,
                    image:urlimage} ,
            }
            const data =  await add(product).then(result=>alert('thanh cong'));
                }
             }
            validate();          
            // console.log(data)
    })
    }
}
export default addProduct

