const headerClient = {
render(){
    return /*html*/`
    
    <div class="bg-red-600 text-white">
        <div class="flex container mx-auto items-center">
            <div class="basis-1/12">
                <a href="/">
                    <img class="w-[60px]" src="/images/logo.png">
                </a>
            </div>
            <div class="basis-4/12 ">
                <form class="relative w-full">
                    <div class="pointer-events-none absolute top-[10px] left-[10px]">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search ...">
                    <button id="btnSearch" type="submit" class="hidden"></button>
                    <div id="matchlist" class="absolute top-14 left-0 text-red-600 rounded-sm z-20"></div>
                </form>
                <div class="header-overlay z-10"></div>
            </div>
            <div class="basis-5/12 flex ml-4 py-2">
                <div class="px-2 w-1/4">Gọi mua hàng 1800.2097</div>
                <div class="px-2 w-1/4 flex"><img class="w-7 h-7 mt-3 mr-1" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658162407/Frame_g2ogyd.png">Cửa hàng gần bạn</div>
                <div class="px-2 w-1/4 flex"><img class="w-7 h-7 mt-3 mr-1" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658162816/Frame_iizmu5.svg">Tra cứu đơn hàng</div>
                <div class="px-2 w-1/4 flex ">
                    <div class="relative">
                    <a href="/cartProduct">
                        <img class="w-7 h-7 mt-3 mr-1 " src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658162893/Frame_1_sgwuzw.png">
                        <span id="cartamount" class="absolute top-4 left-3"></span>
                        </div>
                        <div class="w-4">Giỏ hàng</div>
                        </a>
                    </div>
                </div>
            <div class="basis-2/12 flex">
                <div id="auth" class="px-2 w-1/4 flex pl-10 mt-2"></div>
                <button id="signout" class="px-2 w-1/4 flex pl-10 mt-2 hidden">Đăng xuất</button>
            </div>
        </div>
    </div>
    `
},
}
export default headerClient