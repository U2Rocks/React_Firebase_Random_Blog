import React, { useState, useRef } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const Blogform = () => {

    // database reference
    const blogPostsRef = collection(db, "BlogPosts")

    // declare three state values for form submission
    const [newTitle, setNewTitle] = useState('N/A')
    const [newAuthor, setNewAuthor] = useState('N/A')
    const [newContent, setNewContent] = useState('N/A')

    // declare state value for hiding form
    const [formVisible, setFormVisible] = useState(true)

    // declare useRef values for resetting the form
    const bTitle = useRef()
    const bAuthor = useRef()
    const bText = useRef()

    // function to handle changes in the textarea
    const handleAreaChange = (event) =>{
        setNewContent(event.target.value)
    }

    // function to add a blog to the database
    const addBlog = async () => {
        await addDoc(blogPostsRef, {title: newTitle, author: newAuthor, content: newContent})
        // reload page
        window.location.reload()
    }

    // function to toggle form visibility
    const hideForm = () => {
        setFormVisible(!formVisible)
    }

    const handleSubmit = (e) => {
        // prevent page reload
        e.preventDefault()

        // prevent empty entries into the database...
        if (newTitle ==='N/A' || newTitle === '') {return}
        if (newAuthor ==='N/A' || newAuthor === '') {return}
        if (newContent ==='N/A' || newContent === '') {return}

        // output a message to confirm function call
        console.log(`Title: ${newTitle}; Author: ${newAuthor}; Content: ${newContent}`)

        // call function to add blog into database with state data
        addBlog()

        // reset formfield refs for future entries
        bTitle.current.value = ''
        bAuthor.current.value = ''
        bText.current.value = ''

        // reset state values to prevent unwanted behaviors
        setNewTitle('')
        setNewAuthor('')
        setNewContent('')

    }

  return (
    <>

        <button onClick={hideForm} className="absolute right-0 border-2 border-black bg-teal-200 p-1">{formVisible ? "Hide Form" : "Show Form"}</button>
        { formVisible ?
        <form onSubmit={handleSubmit} className="border-2 border-black p-1 text-left bg-orange-200">
            <div className="w-5/6 m-2">
                <label htmlFor="blogTitle" className="pl-4 pr-1 text-lg">Title: </label>
                <input className="w-full p-1 h-[32px] border-2 border-black rounded focus:outline-none" ref={bTitle} type="text" id="blogTitle" onChange={(e) => setNewTitle(e.target.value)}/>
            </div>
            <div className="w-5/6 m-2">
                <label htmlFor="blogAuthor" className="pl-4 pr-1 text-lg">Author: </label>
                <input className="w-full p-1 h-[32px] border-2 border-black rounded focus:outline-none" ref={bAuthor} type="text" id="blogAuthor" onChange={(e) => setNewAuthor(e.target.value)}/>
            </div>
            <div className="w-5/6 m-1">
                <label htmlFor="blogContent" className="pl-4 pr-1 text-lg">Content: </label>
                <textarea className="p-1 ml-1 w-full border-2 border-black rounded focus:outline-none" ref={bText} type="text" id="blogContent" onChange={handleAreaChange}></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="p-1 m-1 mr-auto bg-red-500 hover:bg-red-200 text-black hover:rounded-lg border-2 border-black rounded-md hover:scale-105">Make A Blog!</button>
            </div>
        </form>
         : <div></div>}
    </>
  )
}

export default Blogform