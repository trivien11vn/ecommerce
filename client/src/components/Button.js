import React from 'react'

const Button = ({name, handleOnclick, style, iconBefore, iconAfter, fullWidth}) => {
  return (
    <button type='button' 
    className={style? style:`px-4 py-2 rounded-md text-white bg-main font-semibold my-2 ${fullWidth?'w-full':'w-fit'} `}
    onClick={() => {handleOnclick && handleOnclick()}}>
        {iconBefore}
        <span>{name}</span>
        {iconAfter}
    </button>
  )
}

export default Button