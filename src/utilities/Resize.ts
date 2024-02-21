// import sharp library implement a function to resize an image
import sharp from 'sharp';

export const resizeImage = async (image: Buffer, width: number, height: number) => {
    // resize the image
    const resizedImage = await sharp(image).resize(width, height).toBuffer();
    // return the resized image
    return resizedImage;
}

export default resizeImage;
