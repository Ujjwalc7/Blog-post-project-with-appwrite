import { Container, PostForm } from "../components/index"
import { useState, useEffect } from "react"
import service from "../appwrite/configuration"
import { useNavigate, useParams } from "react-router-dom"


const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(slug){
            service.getPost(slug).
            then((post) => {
                if(post) setPost(post)
                else navigate('/')
            }).catch(err => console.log(err))    
        }else{
            navigate('/')
        }
    }, [slug, navigate])

  return (
    <div>
        {post ? (
            <div className=" py-8 ">
                <Container>
                    <PostForm post={post}/>
                </Container>
            </div>
        ) : null}
    </div>
  )
}
export default EditPost