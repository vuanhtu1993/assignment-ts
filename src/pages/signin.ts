import validator from 'validator';
import { apiGet } from '../api/products';
import { signin } from '../api/users';
const signIn ={
    async  render(){
        const User = await apiGet(`/users/`);
                console.log(User)
          return /*html*/`
          
          <div class=" bg-contain bg-[#1E1E1E] h-screen pt-20"> 
                <div class="flex w-2/4 m-auto bg-[#ffffff] rounded-xl py-10">
                  <div class="basis-4/6">
                         <div class=" basis-4/6 py-4 px-4">
                          <form class="px-3">
                             <div class="input">
                                  <label class="flex flex-cols py-3 font-semibold text-2xl">Email</label>
                                  <input class="w-full border py-2" type="text" id="email">
                                  <div class="error text-red-500"></div>
                            </div>
                              
                            <div class="input">
                                  <label class="flex flex-cols py-3 ">Password</label>
                                  <input class="w-full border py-2" type="password" id="password">
                                  <div class="error text-red-500"></div>
                            </div>
                              <button id = "submit" class="bg-red-500 text-center text-white rounded w-full my-3 py-3" > Đăng nhập</button>
  
                             <div class=""> 
                             <h2 class="text-center">Hoặc, Chưa có tài khoản ? <a class="bg-gray-200 py-1 px-1" href="/signup" data-navigo>Đăng ký ngay!</a></h2>
                              <div class="flex justify-center px-3 py-3">
                                    <img class="" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816131/iqcrg8uyzj2unw70kina.png" width="58">
                                    <img src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816204/lf5cd7yllaf6crmjunze.png" width="58">
                                    <img class="rounded-xl" src=" https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816400/jsytvcqdm25bxpyixur1.jpg" width="58">                             
                              </div>
                             </div>
  
                          </form>
                         </div>              
                </div>
                <div class="basis-2/6 ">
                         <div class="flex justify-center pt-[103px]"> 
                            <img class="rounded" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816807/pk2qvzc9edfaegquaafy.jpg" width="185px">
                         </div>
                        </div>
               </div>
          </div>
          
          `
      },
      afterRender(){
        const submit = document.querySelector('#submit');
       
        const formField = [
              "email", "password"
          ]
  
          const validate = () => {
              let data: any = {}
              let error = false
              const errors = document.querySelectorAll('.error')
  
              errors.forEach(e => {
                  e.classList.add('hidden')
              })
  
              formField.forEach((field: any) => {
                  const elements: any = document.getElementById(field)
                  if (elements?.value.length == 0) {
                      addError(elements, "Trường thông tin bắt buộc.")
                      error = true
                  }
  
                  if (field == 'email') {
                      if (!validator.isEmail(elements.value)) {
                          addError(elements, "Email kiểu gì z ?")
                          error = true
                      }
                  }
                  // if (field == 'password') {
                  //     if (!validator.isStrongPassword(elements.value,) {
                  //         addError(elements, "mật khẩu hơn 8 ký tự, ko chỉ số")
                  //         error = true
                  //     }
                  // }
  
                  data[field] = elements?.value
              })
              const addError = (element: HTMLElement, message: string) => {
                let temp: any = element.nextElementSibling
                temp?.classList.remove("hidden")
                temp.textContent = message
            }
              return { error, data }
          }

          submit?.addEventListener('click',async(e)=>{
            const { error, data } = validate()
           e.preventDefault()
           if(!error) {
               try {
                const User = await apiGet(`/users/`);             
                   const dataform = await signin(data)
                   if(dataform){   
                       localStorage.setItem('User',JSON.stringify(data))
                       const targetUser = User.data.filter(user => user.email == data.email);
                       if(targetUser[0].role == 1){
                        alert("Đăng nhập admin thành công trở về Admin!");
                        location.href = ('/admin');
                        console.log("admin?")
                       }else{  alert("Đăng nhập thành công trở về trang chủ!");
                       location.href = ('/');}
                     
                   }         
               } catch (error) {
                   alert("Sai tên đăng nhập hoặc mật khẩu")
               }
           }
     })
      }
  }
  export default signIn;