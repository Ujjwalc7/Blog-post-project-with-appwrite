import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from '../appwrite/configuration'
import {Btn, Container} from '../components/index'
import { useSelector } from "react-redux"
import parse from 'html-react-parser'

const Post = () => {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? userData.$id === 
  post.userId : false

  const deletePost = () =>{
    service.deletePost(post.$id).then((status) => {
      if(status){
        service.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  useEffect(() => {
    if(slug){
      service.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }else{
          navigate('/')
        }
      }).catch(err => console.log(err))
    }else{
      navigate('/')
    }
  }, [slug, navigate])

  
  return (
    <div className=" py-8">
      <Container>
        <div className=" w-full flex justify-center mb-4
         relative border rounded-xl p-2">
          <img src= {post && service.getFilePreview(post?.featuredImage)}
          alt={post?.title} 
          className=" rounded-xl"/>

          {isAuthor && (
            <div className=" absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Btn bgColor="bg-green-500" className="mr-3">
                  Edit
                </Btn>
              </Link>
              <Btn bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Btn>
            </div>
          )}
         </div>
         <div className=" w-full mb-6">
          <h className=" text-2xl font-bold">{post?.title}</h>
         </div>
         <div className=" browser-css">
          {post && parse(post?.content)}
         </div>
      </Container>
    </div>
  )
}
export default Post
