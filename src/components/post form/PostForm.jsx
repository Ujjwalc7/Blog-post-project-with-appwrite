// import { useCallback, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import {Btn, Input, SelectBtn, RTE} from "../index"
// import Service from "../../appwrite/configuration"
// import { useNavigate } from "react-router-dom"
// import { useSelector } from "react-redux"


// const PostForm = ({post}) => {

//     const {register, handleSubmit, watch, setValue, control
//     , getValues} = useForm({
//     defaultValues:{
//         title:post?.title || '', 
//         slug:post?.$id || '', 
//         content: post?.content || '', 
//         status: post?.status || 'active', 
//     }})

//     const navigate = useNavigate()
//     const userData = useSelector(state => state.auth.userData)

//     const submit = async (data) =>{
//         console.log(data);
//         if(post){
//             const file = data.image[0] ? Service.uploadFile(data.image[0]) 
//             : null

//             if(file){
//                 Service.deleteFile(post.featuredImage)
//             }
//             const dbPost = await Service.updatePost(
//                 post.$id, {
//                     ...data, featuredImage: file ? file.$id : undefined
//                 }
//             )
//             if(dbPost){
//                 navigate(`/post/${dbPost.$id}`)
//             }
//         }else{
//             const file = data.image[0] ? await Service.uploadFile(data.image[0]) 
//             : null
//             if(file){
//                 const fileId = file.$id
//                 // data.featuredImage = fileId
//                 const dbPost = await Service.createPost({
//                     ...data,
//                     featuredImage: fileId,
//                     userId: userData.$id,
//                 })
//                 if(dbPost){
//                     navigate(`/post/${dbPost.$id}`)
//                 }
//             }
//         }
//     }

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === 'string') {
//             return value.trim()
//             .toLowerCase()
//             .replace(/^[a-zA-Z\d\s]+/g, '-')
//             .replace(/\s/g, '-')
//         }
//         return ''
//     }, [])

//     useEffect(() => {
//         const subscription = watch((value, {name}) => {
//             if(name === 'title'){
//                 setValue('slug', slugTransform(value.title,{
//                     shouldValidate: true
//                 }))
//             }
//         })

//         return () => {
//             subscription.unsubscribe()
//         }
//     }, [watch, slugTransform, setValue])

//   return (
//     <form onSubmit={handleSubmit(submit)} className="
//     flex flex-wrap">
//         <div className=" w-2/3 px-2">
//         <Input 
//         label='Title :' 
//         placeholder='Title' 
//         className='mb-4' 
//         {...register('title', {required: true})}/>
//         <Input 
//         label='Slug :' 
//         placeholder='Slug' 
//         className='mb-4' 
//         {...register('slug', {required: true})} 
//         onInput={(e) => {
//             setValue('slug', slugTransform(
//                 e.
//                 currentTarget.
//                 value),
//                 {shouldValidate: true})
//         }}/>
//         <RTE label='Content :' name='content'
//          control={control} defaultValue={getValues('content')}/>
//         </div>
//         <div className=" w-1/3 px-2">
//             <Input 
//             label='Featured Image :' 
//             type='file' 
//             className='mb-4' 
//             accept='image/png, image/jpg, image/jpeg, 
//             image/gif' 
//             {...register('image', {required: !post})}/>
//             {post && (
//                 <div className=" w-full mb-4">
//                     <img src={Service.
//                     getFilePreview(
//                         post.featuredImage
//                     )} alt={post.title} className="rounded-lg"/>
//                 </div>
//             )}
//             <SelectBtn label='Status' 
//             className='mb-4' 
//             options={['active', 'inactive']} 
//             {...register('status', {require : true})}/>
//             <Btn type="submit" bgColor={post ? 
//             'bg-green-500' : undefined} 
//             className="w-full">
//                 {post ? "Update" : "Submit"}
//             </Btn>
//         </div>
//     </form>
//   )
// }
// export default PostForm



import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, SelectBtn } from "..";
import service from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post?.featuredImage)}
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}