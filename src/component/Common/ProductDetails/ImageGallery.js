import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export default function ImagesGalleryComp({image}){
  const [images, setImages] = React.useState(null);
  React.useEffect(() => {
     let array=[]
     image.map((data)=>{
       array.push({original: `https://vasanthamhypermart.in/vasantham/assets/images/${data.photo}`,
       thumbnail: `https://vasanthamhypermart.in/vasantham/assets/images/${data.photo}`
        })
      })
        setImages(array)
  }, [image])


  return (
    <>{images ? <ImageGallery items={images} showNav={false} showPlayButton={false}/> : null}</>
  )
};