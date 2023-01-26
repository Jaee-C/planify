import React, { MouseEventHandler } from 'react';

interface ButtonProp {
  children: React.ReactNode,
  onClick: MouseEventHandler
}

export default function Button({ children, onClick }: ButtonProp) {
  return (
    <div
      className='px-1 rounded hover:bg-neutral-500/30'
    >
      <a href="#" onClick={onClick} className='px-0.5 py-1'>
        {children}
      </a>
    </div>
  )
}
