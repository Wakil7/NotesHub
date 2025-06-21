// import React, { useState, useCallback } from 'react'
// import { ID } from 'appwrite'
// import { useForm } from 'react-hook-form'
// import { Button, Input, Select, TextArea } from '../index'
// import appwriteService from "../../appwrite/config"
// import authService from "../../appwrite/auth"
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// function NoteForm({ note }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: note?.title || '',
//             description: note?.description || '',
//             pricing: note?.pricing || 'Free',
//             price: note?.price || 0,
//             keywords: note?.keywords || '',
//         }
//     })

//     // appwriteService.getAverageRating("1").then(console.log);

//     const [coverImage, setCoverImage] = useState(null);
//     const [pricing, setPricing] = useState("Free");

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setCoverImage(URL.createObjectURL(file));
//             setValue("image", file); // set file manually if needed
//         }
//     };

//     const navigate = useNavigate()
//     const userData = useSelector(state => state.auth.userData)
    
    
//     const submit = async(data)=>{
//         data.price = (data.pricing==="Paid")? Number.parseInt(data.price): 0;
//         if (data.pricing==="Paid" && data.price<=0){
//             console.log("Price must be greater than 0")
//             return;
//         }
//         const imageFile = await appwriteService.uploadFile(data.coverImage[0]);
//         const pdfFile = await appwriteService.uploadFile(data.pdfFile[0]);

//         if (note){
//             appwriteService.deleteFile(note.coverImageId);
//             appwriteService.deleteFile(note.pdfId);

//             const dbNote = await appwriteService.updateNote(note.$id,
//                  {...data,
//                     coverImageId: imageFile.$id,
//                     pdfId: pdfFile.$id,
//                     userName: userData.name
//                  }
//                 );

//             if (dbNote) {
//                 navigate(`/note/${dbNote.$id}`);
//             }

//         }
//         else{
//             const dbNote = await appwriteService.createNote({
//                 ...data,
//                 coverImageId: imageFile.$id,
//                 pdfId: pdfFile.$id,
//                 userId: userData.$id,
//                 userName: userData.name
//             });

//             if (dbNote) {
//                 navigate(`/note/${dbNote.$id}`);
//             }
//         }

//     }



//     // React.useEffect(() => {
//     //     const subscription = watch((value, { name }) => {
//     //         if (name === 'title') {
//     //             setValue('slug', slugTransform(value.title), { shouldValidate: true })
//     //         }
//     //     })

//     //     return () => {
//     //         subscription.unsubscribe()
//     //     }
//     // }, [watch, slugTransform, setValue])

//     return (
//         <div className="min-h-screen content-between bg-gray-400">
//         <form onSubmit={handleSubmit(submit)}>
//             <div className="px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
                
//                 <TextArea label="Description :"
//                 placeholder="Write your note description here..."
//                 rows={5}
//                 className="mb-4"
//                 {...register("description", {required: true})}
//                  />
//                  <Input
//                 label="Cover Image :"
//                 type="file"
//                 className="mb-4"
//                 accept="image/png, image/jpg, image/jpeg"
//                 onChange={handleImageChange}
//                 {...register("coverImage", {required: true})}
//             />
//             {coverImage && (
//                 <div className="mb-4">
//                     <p className="text-sm mb-1">Preview:</p>
//                     <img
//                         src={coverImage}
//                         alt="Cover Preview"
//                         className="w-full max-h-64 object-contain border rounded-lg"
//                     />
//                 </div>
//             )}
//                 <Input
//                     label="Note PDF :"
//                     type="file"
//                     className="mb-4"
//                     accept="application/pdf"
//                     {...register("pdfFile", { required: true })}
//                 />
//                 <Select
//                     options={["Free", "Paid"]}
//                     label="Pricing"
//                     className="mb-4"
//                     {...register("pricing", { required: true })}
//                     onChange={(e)=>setPricing(e.target.value)}
//                 />
//                 {
//                     pricing==="Paid"?(
//                         <Input
//                             label="Price :"
//                             type="number"
//                             className="mb-4"
//                             {...register("price", { required: true })}
//                         />
//                     ):null
//                 }
//                 <TextArea label="Keywords :"
//                 placeholder="Enter search keywords here..."
//                 rows={5}
//                 className="mb-4"
//                 {...register("keywords", {required: true})}
//                  />

//                  <Button type="submit" bgColor={note ? "bg-green-500" : undefined} className="w-full">
//                     {note ? "Update" : "Submit"}
//                 </Button>
                
//             </div>
//             {/* <div className="w-1/3 px-2">
//                 { <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 /> }
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div> */}
//             {/* <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 /> */}
//         </form>
//         </div>
//     )
// }

// export default NoteForm

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, TextArea } from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NoteForm({ note }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            title: note?.title || '',
            description: note?.description || '',
            pricing: note?.pricing || 'Free',
            price: note?.price || 0,
            keywords: note?.keywords || '',
        }
    });

    const [coverImage, setCoverImage] = useState(null);
    const [pricing, setPricing] = useState(note?.pricing || 'Free');
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        // Set cover preview and pricing correctly on edit
        if (note) {
            if (note.coverImageId) {
                setCoverImage(appwriteService.getFileView(note.coverImageId));
            }
            if (note.pricing) {
                setPricing(note.pricing);
            }
        }
    }, [note]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
            setValue("coverImage", e.target.files); // Required for upload
        }
    };

    const submit = async (data) => {
        data.price = (data.pricing === "Paid") ? Number.parseInt(data.price) : 0;
        if (data.pricing === "Paid" && data.price <= 0) {
            alert("Price must be greater than 0 for paid notes.");
            return;
        }

        let imageFile, pdfFile;

        if (!note || data.coverImage?.[0]) {
            imageFile = await appwriteService.uploadFile(data.coverImage[0]);
        }

        if (!note || data.pdfFile?.[0]) {
            pdfFile = await appwriteService.uploadFile(data.pdfFile[0]);
        }

        if (note) {
            // Delete old files only if new ones are uploaded
            if (data.coverImage?.[0]) appwriteService.deleteFile(note.coverImageId);
            if (data.pdfFile?.[0]) appwriteService.deleteFile(note.pdfId);

            const dbNote = await appwriteService.updateNote(note.$id, {
                ...data,
                coverImageId: imageFile ? imageFile.$id : note.coverImageId,
                pdfId: pdfFile ? pdfFile.$id : note.pdfId,
                userName: userData.name
            });

            if (dbNote) navigate(`/note/${dbNote.$id}`);
        } else {
            const dbNote = await appwriteService.createNote({
                ...data,
                coverImageId: imageFile.$id,
                pdfId: pdfFile.$id,
                userId: userData.$id,
                userName: userData.name
            });

            if (dbNote) navigate(`/note/${dbNote.$id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-400 py-8">
            <form onSubmit={handleSubmit(submit)} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <TextArea
                    label="Description:"
                    placeholder="Write your note description here..."
                    rows={5}
                    className="mb-4"
                    {...register("description", { required: true })}
                />

                <Input
                    label="Cover Image:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleImageChange}
                    {...register("coverImage", { required: !note })}
                />

                {coverImage && (
                    <div className="mb-4">
                        <p className="text-sm mb-1">Preview:</p>
                        <img
                            src={coverImage}
                            alt="Cover Preview"
                            className="w-full max-h-64 object-contain border rounded-lg"
                        />
                    </div>
                )}

                <Input
                    label="Note PDF:"
                    type="file"
                    className="mb-4"
                    accept="application/pdf"
                    {...register("pdfFile", { required: !note })}
                />

                {note?.pdfId && (
                    <div className="mb-4">
                        <p className="text-sm mb-1">Existing PDF:</p>
                        <a
                            href={appwriteService.downloadFile(note.pdfId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            View or Download Current PDF
                        </a>
                    </div>
                )}

                <Select
                    options={["Free", "Paid"]}
                    label="Pricing"
                    className="mb-4"
                    {...register("pricing", { required: true })}
                    onChange={(e) => setPricing(e.target.value)}
                />

                {pricing === "Paid" && (
                    <Input
                        label="Price:"
                        type="number"
                        className="mb-4"
                        {...register("price", { required: true })}
                    />
                )}

                <TextArea
                    label="Keywords:"
                    placeholder="Enter search keywords here..."
                    rows={4}
                    className="mb-4"
                    {...register("keywords", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={note ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {note ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    );
}

export default NoteForm;
