import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { env_file } from '../index_env.js';
import { ApiResponse } from './apiResponse.js';
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: env_file.CLOUDINARY_CLOUD_NAME, 
        api_key: env_file.CLOUDINARY_API_KEY, 
        api_secret: env_file.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
}
)();


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        ////file has been uploaded
        console.log(`uploadOnCloudinary---24---file has been uploaded`,response.url,response);
        fs.unlinkSync(localFilePath)
        return response
    } catch (err) {
        fs.unlinkSync(localFilePath)////removes temporary file stored locally as upload got  failed

        console.error(err);
        return null;
        
    }

}

const deleteFromCloudinary = async (url,resource_type="image")=>{
    try {
        const public_id=extractPublicIdFromCloudinary(url);
        console.log("---40---public_id",public_id);
        if(!public_id) {

            return ` public_id not found  ------${public_id}`
        };
        //upload on cloudinary
        const response=await cloudinary.uploader.destroy(public_id,
            {resource_type:resource_type}
        )
        ////file has been deleted
        console.log(`uploadOnCloudinary---24---file has been deleted successfully`,response);

        return response;
    } catch (err) {
    

        console.error("deleteFromCloudinary---55---",err);
        return null;
        
    }

}

const extractPublicIdFromCloudinary =(url)=>{
    const public_id=url?.split("/")[url?.split("/")?.length-1]?.split(".")[0];

    return public_id;
};



export {
    uploadOnCloudinary,
    deleteFromCloudinary

}


// // Upload an image
// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);