'use client'
import { useRef, useState } from 'react'
import classes from './image.module.css'
import Image from 'next/image';

const ImagePicker = ({label,name}) => {
    const [pickedImage , setPickedImage]=useState();
    const Imageref=useRef();
    const handlePick=()=>{
        Imageref.current.click();
    }
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(!file)
        {
            return;
        }
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);

    }
  return (
    <div className={classes.picker}>
        <label htmlFor='image'>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image Picked</p>}
                {pickedImage && <Image src={pickedImage} fill alt="the selected image"/>}
            </div>
            <input type='file' className={classes.input} id={name} accept='image/png , image/jpeg' ref={Imageref} onChange={handleImageChange} name={name}/>
            <button className={classes.button} type='button' onClick={handlePick}>Pick An Image</button>
        </div>
    </div>
  )
}

export default ImagePicker