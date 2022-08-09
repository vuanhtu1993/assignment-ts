import validator from 'validator';
import { signup } from '../api/users';
const signUp ={
  async  render(){
        return /*html*/`
        
        <div class=" bg-contain bg-[#1E1E1E] h-screen pt-20"> 
              <div class="flex w-2/4 m-auto bg-[#ffffff] rounded-xl py-10">
                <div class="basis-4/6">
                       <div class=" basis-4/6 py-4 px-4">
                        <form id="formdata" class="px-3">
                            <div class="input">
                                  <label class="flex flex-cols py-3 font-semibold text-2xl">Email</label>
                                  <input class="w-full border py-2" type="text" id="email">
                                  <div class="error text-red-500"></div>
                            </div>
                            <div class="input">
                                  <label class="flex flex-cols py-3 ">Số điện thoại</label>
                                  <input class="w-full border py-2" type="text" id="phone">
                                  <div class="error text-red-500"></div>
                            </div>
                            <div class="input">
                                  <label class="flex flex-cols py-3 ">Password</label>
                                  <input class="w-full border py-2" type="password" id="password">
                                  <div class="error text-red-500"></div>
                            </div>
                            <button id = "submit" class="bg-red-500 text-center text-white rounded w-full my-3 py-3" > Đăng ký</button>

                           <div class=""> 
                           <h2 class="text-center">Hoặc, Đã có tài khoản ? <a class="bg-gray-200 py-1 px-1" href="/signin">Đăng nhập</a> ngay!</h2>
                            <div class="flex justify-center px-3 py-3">
                                  <img class="rounded-xl mx-1 w-14" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816131/iqcrg8uyzj2unw70kina.png" width="58">
                                  <img class="rounded-xl mx-1 w-14" src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816204/lf5cd7yllaf6crmjunze.png" width="58">
                                  <img class="rounded-xl mx-1 w-14" src=" https://res.cloudinary.com/dtd8tra0o/image/upload/v1658816400/jsytvcqdm25bxpyixur1.jpg" width="58">                               
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
            "email", "phone", "password"
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

                if (field == 'phone') {
                    if (!validator.isMobilePhone(elements.value)) {
                        addError(elements, "Số đt kiểu gì thế ??")
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
            return { error, data }
        }

        const addError = (element: HTMLElement, message: string) => {
            let temp: any = element.nextElementSibling
            temp?.classList.remove("hidden")
            temp.textContent = message
        }


      submit?.addEventListener('click',async(e)=>{
             const { error, data } = validate()
            e.preventDefault()
            if(!error) {
                try {
                    
                    const dataform = await signup(data)
                    if(dataform){
                        alert("Đăng kí thành công trở về trang đăng nhập !");
                        location.href = ('/signin');
                    }         
                } catch (error) {
                    alert(error)                  
                }
            }
            console.log(data)
      })
    }
}
export default signUp;