import React, { useEffect, useState } from 'react'
import Blog from '../Blog'
import { collection, getDocs, where, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebase'

const Blogarea = () => {
    // implement measure to recall/reload firestore data after an update(NOT DONE)
    const [allBlogs, setAllBlogs] = useState([])
    
    // use collection to get referenece of firebase firestore
    const blogPostsRef = collection(db, "BlogPosts")

    // get list of posts from firebase query/call
    const getBlogs = async () => {
        const data = await getDocs(blogPostsRef)
        setAllBlogs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(allBlogs)
    }

    useEffect(() => {
        console.log("Blogarea loaded...")
        getBlogs() // turn on later
    }, [])

  return (
    <>
        <div>
        {allBlogs?.map((blog) => {
            return(<Blog key={blog.id} title={blog.title} author={blog.author} content={blog.content} idStore={blog.id}/>)
        })}
        </div>
    </>
  )
}

export default Blogarea