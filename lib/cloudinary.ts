import { Cloudinary } from '@cloudinary/url-gen'

// Inisialisasi Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
})

export default cld