
import { apiGet, getAll } from "../api/products";
import footerClient from "../components/client/footer";
import headerClient from '../components/client/header';
import { ifelement, percent, priceToVnd, reRender } from "../config";
import { Product } from "../models/products";
import {isEmpty} from 'lodash'

const Home = {
    async render() {
        const res = await getAll();

        let data: Product[] = res.data;
        // Get categories
        let categories = data.map(i => i.category)
        categories = categories.filter(function (item, pos) {
            return categories.indexOf(item) == pos;
        })
        // Search param from URLSearchParams
        const paramUrl = new URLSearchParams(location.search);
        const search = paramUrl.get('search');

        if (search) {
            const res = await apiGet(`/products?q=${search}`);
            let cellphone: Product[] = res.data;
            data = cellphone;
        }
    
        return /*html*/`
        ${headerClient.render()}

        <div class="flex px-60 py-3">
                <div class="basis-3/12"> 
                <div class="flex py-1">
                        <img class="px-4" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658180991/Layer_2_1__umlhlc.png">
                        <div class="grow"><a id="cate" data-id="all" href="">Tất cả sản phẩm</a></div>
                        <img src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1654711823/Rectangle_9_gbzawf.png">
                    </div>
                ${categories?.map(cate => /*html*/`
                <div class="flex py-1">
                        <img class="px-4" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658180991/Layer_2_1__umlhlc.png">
                        <div class="grow"><a id="cate" data-id="${cate}" href="">${cate}</a></div>
                        <img src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1654711823/Rectangle_9_gbzawf.png">
                    </div>
                `).join('')}
                    
                </div>
                <div class="basis-9/12"><img src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658181122/Rectangle_6_cydnhs.png" width="1048px" height="382px" ></div>
        </div>

        <h1 class="px-60 py-3">Sản phẩm</h1>
        <div class="grid gap-2 grid-cols-5 px-20">
        ${data.map(cell => /*html*/`
               <a class="hover:bg-gray-100 rounded hover:drop-shadow-xl" href="/#/product/${cell.id}"data-navigo>
               <div class="box p-4 static">
               <div class="absolute ml-2">
                        <span class="absolute text-red-600 mt-3 font-bold -rotate-45">${percent(cell.sellerPrice, cell.originalPrice)}</span>
                        <img class="" src="${ifelement(cell.sellerPrice) ? 'https://res.cloudinary.com/dtd8tra0o/image/upload/v1659820494/dl7aqs3dtxtalfpxuyme.png' : ''}" width="45px">
                    </div>
               <div class="flex justify-center p-2 ">
                 <img class="" src="${cell.images?.thumbnail}" width="160px" >
              
               </div>
               <h2 class="pb-6">${cell.name}</h2>
               <div class="flex">
                   <span class="basis-6/12 text-red-600">${ifelement(cell.sellerPrice) ? (priceToVnd(Number(cell.sellerPrice))) : '<span class="ml-10 text-black">Giá gốc:</span>'}</span>
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
        ${footerClient.render()}
        `
    },
    async afterRender() {
        const { data: data } = await getAll();
        const category: any = document.querySelectorAll('#cate');
        const formSearch: any = document.querySelector('#search');
        const btnSearch: any = document.querySelector('#btnSearch');
        const signout = document.querySelector('#signout') as HTMLInputElement;
        const auth = document.querySelector('#auth') as HTMLInputElement;
        const search = document.getElementById('search') as HTMLInputElement;
        const matchlist = document.getElementById('matchlist') as HTMLInputElement;
        const localstored = localStorage.getItem('cart');
        const cartamount = document.getElementById('cartamount') as HTMLInputElement;
        if (localstored) {
            const cart = JSON.parse(localstored);
            cartamount.innerHTML = cart[0].amount;
        }

        const searchStates = async (searchtext: string) => {
            const res = await getAll();
            let matches = res.data.filter((state: { name: string; abbr: string; }) => {
                const regex = new RegExp(`^${searchtext}`, 'gi');
                return state.name.match(regex);
            })
            if (searchtext.length === 0) {
                matches = [];
            }
            outputHtml(matches);
        }

        const outputHtml = (matches: { lenght: number; map: (arg0: (match: any) => string) => any; }) => {
            if (!isEmpty(matches)) {
                const html: string = matches.map(match => /*html*/`
                          <a href="#/product/${match.id}" data-navigo"> 
                          <div class="flex px-1 py-3 bg-white w-full"> 
                                 <div class="basis-2/12"><img src="https://cdn.tgdd.vn/Products/Images/522/240254/samsung-galaxy-tab-s7-fe-wifi-thumb-600x600.jpg"></div>
                                 <div class="basis-10/12">
                                     <div class="font-semibold text-base">${match.name}</div>
                                        <div class="flex">
                                            <div class="text-red-500 text-sm font-bold">${priceToVnd(Number(match.sellerPrice))}</div>
                                            <div class="text-gray-500 text-xs px-2 font-normal">${priceToVnd(Number(match.originalPrice))}</div>
                                            <div class="text-gray-500 text-xs font-normal">${percent(match.sellerPrice, match.originalPrice)}</div>
                                        </div>
                                 </div>
                            </div>
                          </a>
                `).join('');
                document.querySelector('.header-overlay')?.classList.add('active')
                matchlist.innerHTML = html;
            } else {
                matchlist.innerHTML = "";
                document.querySelector('.header-overlay')?.classList.remove('active')
            }
        }

        let storageUser = localStorage.getItem('User');
        if (storageUser) {
            let user = JSON.parse(storageUser);
            auth.innerHTML = `<a href="/">Hi! <span class="text-red-500 font-bold w-2">${(user.email).slice(0, 5)}</span></a>`
            signout.classList.remove('hidden')
            signout.addEventListener('click', () => {
                const confirm = window.confirm('Bạn muốn đăng xuất khỏi tài khoản ko?')
                if (confirm) {
                    localStorage.removeItem('User');
                    if (!localStorage.getItem('User')) {
                        window.alert('Bạn đã đăng xuất')
                        location.href = ("/")
                    }
                }
            })
        } else {
            auth.innerHTML = `<a href="/signin"></span class="">Đăng nhập</span></a>`
        }


        // ACTIONS
        btnSearch.addEventListener('click', (e: any) => {
            e.preventDefault()
            history.replaceState(null, '', `?search=${formSearch.value}`);
            reRender('#app', Home);
        });

        // search?.addEventListener('input', () => searchStates(search.value))

        search.addEventListener('keyup', () => {
            searchStates(search.value)
        })
    }

}
export default Home;