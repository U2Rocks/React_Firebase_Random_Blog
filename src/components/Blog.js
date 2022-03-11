import React, { useState, useRef } from 'react'
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Blog = ( { title, author, content, idStore } ) => {
    // blog item must have built in function to delete and update the post(NOT DONE)

    // variable to act as ref for textarea
    const textAreaRef = useRef()
    
    // variable to store default post content
    const [defaultContent, setDefaultContent] = useState(content)

    // function to store value of editValue
    const areaChangePost = (event) =>{
        setEditValue(event.target.value)
        // console.log(editValue)
    } 

    // variable to hold edit value for posts
    const [editValue, setEditValue] = useState()

    // variable to control whether form is shown
    const [editActive, setEditActive] = useState(false) 

    // ref to BlogPosts collection
    const blogPostsRef = collection(db, "BlogPosts")

    const updateBlog = async () => {
        // get value from an input and replace the content if conditions met
        if (editActive === true && editValue) {
            const databaseDoc = doc(db, "BlogPosts", idStore)
            await updateDoc(databaseDoc, { content: editValue })
        }
        setEditActive(!editActive)
        console.log("updateBlog(blog.js) called...")

    }

    const deleteBlog = async () => {
        await deleteDoc(doc(db, "BlogPosts", idStore))
        console.log("blog deleted...")
        window.location.reload()
    }

  return (
    <>
        <div className="bg-emerald-200 text-black w-4/5 min-h-[10rem] max-h-[19rem] overflow-scroll rounded-xl mt-2 mb-2 ml-auto mr-auto p-2 hover:border-2 hover:border-black hover:drop-shadow-xl">
            <div className="float-right bottom-0 left-0">
                <button className="bg-yellow-400 hover:bg-yellow-200 p-1 m-2 rounded-xl border-2 border-black" onClick={updateBlog}>Update</button>
                <button className="bg-red-500 hover:bg-red-300 p-1 m-2 rounded-xl border-2 border-black" onClick={deleteBlog}>Delete</button>
            </div>
            <div className="text-center">
                <div className="text-2xl underline" data-testid="title_element">{title}</div>
                <div className="mb-2 italic" data-testid="author_element">by {author}</div>
                {editActive ? <div>
                    <textarea ref={textAreaRef} className="p-1 ml-1 w-full border-2 border-black rounded focus:outline-none min-h-[10rem]" onChange={areaChangePost} value={editValue ? editValue : defaultContent}></textarea>
                </div> 
                : <div className="text-left">
                    <div className="p-1 m-1" data-testid="content_element">{editValue ? editValue : content}</div>
                </div>}
            </div>
        </div>
    </>
  )
}

export default Blog