import { apiGet, getAll, remove } from "../../api/products";
import AdminHeader from "../../components/admin/header";
import { priceToVnd, reRender } from "../../config";
import { Product } from "../../models/products";

const homeadmin ={
    async  render(){
        const data =  await getAll();
        const datacellphone =  await apiGet('/products?category=Điện thoại');
        const category:Product[] = data.data;
        let Cellphone:Product[] = [];
        let categories = category.map(i => i.category)
        categories = categories.filter(function(item, pos) {
            return categories.indexOf(item) == pos;
        })
        const paramUrl = new URLSearchParams(location.search);

        const search = paramUrl.get('search');

        if(search){
            const datacellphone = await apiGet(`/products?q=${search}`);
            let cellphone:Product[] = datacellphone.data;
                Cellphone=cellphone;
                console.log(cellphone)
        }else{
            if(localStorage.getItem('cellphone') != '' && localStorage.getItem('cellphone') != null){
            const retrievedObject:any = localStorage.getItem('cellphone');
            let cellphone =  JSON.parse(retrievedObject);
            Cellphone = cellphone;
        } else{
            let cellphone:Product[] = datacellphone.data;
            cellphone = Cellphone;      
        }}
        
        
          return /*html*/`
          ${AdminHeader.render()}
          <div class=""> 
               <div class="flex py-4">
               <div class="basis-2/12">
               ${categories.map(cate => /*html*/`
               <div class="flex py-1">
                       <img class="px-4" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658180991/Layer_2_1__umlhlc.png">
                       <div class="grow"><a id="cate" data-id="${cate}" href="">${cate}</a></div>                  
                   </div>
               `).join('')}
                   </div>
                       <div class="basis-10/12"> 
                            <div class="flex">
                                <div class="basis-1/2">
                                    <h1>lấy dataid</h1>
                                    <div class="flex">
                                        <span class=" basis-2/12 font-bold px-3 py-3">Bộ lọc:</span>
                                        <div class="basis-10/12">
                                            <div>Danh mục sản phẩm</div>
                                            <div>

                                            <select id="category" name="category">
                                            ${categories.map(c => ` <option value="${c}">${c}</option>`).join('')}            
                                             </select>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="basis-1/2">
                                        <div class="flex justify-end"><a href="/admin/add"><img class="pr-16" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658504103/Icon_lo8cnj.png"></a></div>
                                </div>
                            </div>


                            <div class="content">

                                <table class="table-auto">
                                <thead>
                                <tr class="bg-[#FBFBFB] border-y border-[#DEE2E6] text-center">
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thành tiền</th>
                                    <th>Mô tả</th>
                                    <th>Ẩn/hiện</th>
                                    <th>Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                
                                ${Cellphone.map(cell =>               
                                    /*html*/`<tr>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">${cell.id}</td>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">${cell.name}</td>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">${priceToVnd(Number(cell.originalPrice))}</td>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">${cell.description}</td>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">Ẩn</td>
                                    <td class="border-y border-[#DEE2E6] text-center px-1">
                                   
                                    <a class="bg-yellow-300 rounded px-1 py-1 my-1" href="/admin/update/${cell.id}">Sửa</a>
                                    <button id="remove" class="bg-red-500 rounded px-1 py-1 my-1" data-id="${cell.id}">Xóa</button>
                                    </td>
                                    </tr>
                                    `).join('')}
                                                     
                                </tbody>
                            
                            </div>
                       </div>
               </div>
          </div>
          
          `
      },
      async afterRender(){

        const formSearch = document.querySelector('#sreach') as HTMLInputElement;
        const btnSearch = document.querySelector('#btnSearch') as HTMLInputElement;
        const elementname = document.querySelector('#nameadmin') as HTMLInputElement;
        const signout = document.querySelector('#signout') as HTMLInputElement;
        let storageUser = localStorage.getItem('User');       
        const nameadmin = () =>{         
            const name = JSON.parse(storageUser).email
            if(storageUser){
                elementname.innerHTML = `<div class="text-red-500 px-2 font-bold ">${name}</div>`
                signout.addEventListener('click',(e)=>{
                    e.preventDefault()
                    const confirm= window.confirm('Bạn muốn đăng xuất khỏi tài khoản ko?')
                     if(confirm){
                         localStorage.removeItem('User');
                         if(!localStorage.getItem('User')){
                             window.alert('Bạn đã đăng xuất')
                             location.href = ("/")
                         }
                     }       
                    })
            }
        }
     
        nameadmin();
        btnSearch.addEventListener('click', (e:any)=> {
                e.preventDefault();
                history.replaceState(null, '',`?search=${formSearch.value}`);
                reRender('#app',homeadmin);
        });


        const {data:data} = await getAll();
        const category:any = document.querySelectorAll('#cate');
        // console.log("category",category)
        const products:any = document.querySelectorAll('#remove');
        
        for (let product of products) {
            product.addEventListener('click', async (e:any) => {
            e.preventDefault();
            const id = product.dataset.id;
            
                const confirm = window.confirm('Are you sure you want to remove this product?');
                if(confirm){
                    const data = await remove(id) ;
                  
                    reRender('#app',homeadmin);
                    if(data){
                        alert('Remove product');
                    }
                }
               
            })
        }
    
        for (const categories of category) {
            categories.addEventListener('click', (e: any) => 
            {e.preventDefault()
                const elementcate = categories.dataset.id;            
                const followcate =data.filter((item: { category: any } )=> { return item.category === elementcate});
                localStorage.clear();
                localStorage.setItem('cellphone',JSON.stringify(followcate))            
                reRender('#app',homeadmin)
            })
        }
     }
  }
  export default homeadmin;