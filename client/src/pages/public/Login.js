import React ,{useState,useCallback} from "react";
import {InputField, Button} from '../../components'
const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [isRegister, setIsRegister] = useState(false)
    const handleSubmit = useCallback(() =>{
        console.log(payload)
    },[payload])
    return (
        <div className="w-screen h-screen relative">
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg" alt=""
                className='w-full h-full object-cover'></img>
            <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
                <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister? 'Register':'Login'}</h1>
                {isRegister && 
                <InputField 
                value= {payload.name}
                setValue={setPayload}
                nameKey='name'
                />}
                <InputField 
                value= {payload.email}
                setValue={setPayload}
                nameKey='email'
                />
                <InputField 
                value= {payload.password}
                setValue={setPayload}
                nameKey='password'
                type='password'
                />
                <Button 
                name= {isRegister? 'Register' : 'Login'}
                handleOnclick={handleSubmit}
                fullWidth
                 />
                <div className='flex items-center justify-between w-full text-sm'>
                    {!isRegister && <span className="text-blue-500 hover:underline cursor-pointer">Forget your account?</span>}
                    {!isRegister? <span 
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={()=>{setIsRegister(true)}}
                    >Craate a new account</span>:
                    <span 
                    className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                    onClick={()=>{setIsRegister(false)}}
                    >Go login</span>}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login