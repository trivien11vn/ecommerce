import React from 'react'

const InputField = ({value, setValue, nameKey, type, invalidField, setInvalidField}) => {
    return (
    <div className='w-full relative flex flex-col mb-2'>
        {value?.trim() !== '' &&<label className='text-[10px] animate-slide-top-sm absolute top-[2px] left-[8px] block bg-white px-2' htmlFor={nameKey}>{nameKey?.slice(0,1)?.toUpperCase() + nameKey?.slice(1)}</label>}
        <input type={type||'text'} 
        className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none' 
        placeholder={nameKey?.slice(0,1)?.toUpperCase() + nameKey?.slice(1)}
        value = {value}
        onChange={e=> setValue(prev => ({...prev, [nameKey]:e.target.value}))}
        onFocus={e=> setInvalidField([])}
        />
        {invalidField?.some(el => el.name === nameKey) && <small className='text-main font-[10px] italic'>
          {invalidField?.find(el => el.name === nameKey)?.mes}
        </small>}
    </div>
  )
}

export default InputField