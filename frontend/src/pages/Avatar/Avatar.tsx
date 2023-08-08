import React from 'react'
import "./Avatar.scss"

interface IAvatar {
    size?:string,
    src?:string,
    username?:string,
    onClick?:()=>void

}

function Avatar({size="avatar-m",src="api/v1/uploads/users/default_img.jpg",username="Anonym",onClick}:IAvatar) {

  return (
    <div className={`avatar ${size}`}>
        <img src={src} alt={`avatar ${username}`} onClick={onClick} />
    </div>
  )
}

export default Avatar