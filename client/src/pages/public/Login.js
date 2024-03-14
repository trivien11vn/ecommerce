import React ,{useState,useCallback} from "react";
import {InputField, Button} from '../../components'
import { apiRegister, apiLogin, apiForgotPassword} from "../../apis/user";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from 'react-redux';
import { toast} from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: ''
    })
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [email, setEmail] = useState('')
    const handleForgotPassword = async() =>{
        const response = await apiForgotPassword({email})
        console.log(response)
        if(response.success){
            toast.success(response.mes, {theme:"colored"})
        }
        else{
            toast.info(response.mes, {theme: "colored"})
        }
    }

    const resetPayload = () =>{
        setPayload({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            mobile: ''
        })
    }
    const handleSubmit = useCallback(async() =>{
        const {firstName, lastName, mobile, ...data} = payload
        if(isRegister){
            const response = await apiRegister(payload)
            if(response.success){
                Swal.fire('Congratulations!', response.mes,'success').then(() =>{
                    setIsRegister(false)
                    resetPayload()
                })
            }
            else{
                Swal.fire('Opps!', response.mes,'error')
            }
        }
        else{
            const result = await apiLogin(data)
            if(result.success){ 
                dispatch(register({
                    isLogin: true,
                    token: result.accessToken,
                    userData: result.userData
                }))
                navigate(`/${path.HOME}`)

            }
            else{
                Swal.fire('Opps!', result.mes,'error')
            }
        }

        console.log(payload)
    },[payload, isRegister])
    return (
        <div className="w-screen h-screen relative">
            {isForgotPassword&&
            <div className="animate-slide-right absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
                <div className="flex flex-col gap-4">
                    <label htmlFor="email">Enter your email</label>
                    <input type="text" id="email" placeholder="example@gmail.com" className="pb-2 w-[800px]  border-b outline-none placeholder:text-sm" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    <div className="flex items-center justify-end gap-4">
                        <Button 
                            name='Cancel'
                            handleOnclick={()=> setIsForgotPassword(false)}
                        />
                        <Button 
                            name='Submit'
                            style = 'px-4 py-2 rounded-md text-white bg-blue-500 font-semibold my-2'
                            handleOnclick={handleForgotPassword}
                        />
                    </div>
                </div>
            </div>}
            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM18zZF9pbGx1c3RyYXRpb25fb2ZfYV9uZW9uX2ljb25zX3Nob3BwaW5nX2lzb19hYTQwZTZhNi0xOTk1LTRlMTUtOTJjYy03ZjJlODdlNjkyODNfMS5qcGc.jpg" alt=""
                className='w-full h-full object-cover'></img>
            <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
                <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister? 'Register':'Login'}</h1>
                {isRegister && 
                <div className="flex items-center gap-2">
                    <InputField 
                    value= {payload.firstName}
                    setValue={setPayload}
                    nameKey='firstName'
                    />
                    <InputField 
                    value= {payload.lastName}
                    setValue={setPayload}
                    nameKey='lastName'
                    />
                </div>}
                <InputField 
                value= {payload.email}
                setValue={setPayload}
                nameKey='email'
                />
                {isRegister&&
                <InputField 
                value= {payload.mobile}
                setValue={setPayload}
                nameKey='mobile'
                />}
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
                    {!isRegister && <span className="text-blue-500 hover:underline cursor-pointer" onClick={()=>{setIsForgotPassword(true)}}>Forget your account?</span>}
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