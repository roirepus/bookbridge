"use client"
import config from '@/lib/config'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next"
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const {
  env: {
    imagekit: { publicKey, urlEndpoint }
  }
} = config
const authenticator = async () => {
  try {
    // console.log("here")
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
    // console.log("not here")
    if (!res.ok) {
      const errorMsg = await res.text()
      throw new Error(`Request failed with status ${res.status}: ${errorMsg}`)
    }
    const data = await res.json();
    const { signature, expire, token } = data;
    return { token, expire, signature }
  } catch (err) {
    throw new Error(`Auth request failed: ${err.message}`)
  }
}
const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState(null)
  const onError = (err: any) => {
    console.log(err);
    toast("Image upload failed. Please try again.")

  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast("Image uploaded successfully")
  }
  return (
    <ImageKitProvider publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='test-upload.png'
      />
      <button className='upload-btn' onClick={(e) => {
        e.preventDefault();
        if (ikUploadRef.current) {
          ikUploadRef.current?.click();
        }
      }}>
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className='object-contain'
        />
        <p className='text-base text-light-100'>Upload a File</p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
