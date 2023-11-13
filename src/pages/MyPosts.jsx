import { useState, useEffect } from "react"
import service from "../appwrite/configuration"
import {PostCard, Container} from "../components/index"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {Query} from "appwrite"

const AllPosts = () => {
  const userId = useSelector(state => state.auth.userData.$id)
    const [posts, setPosts] = useState(null)
    const navigate = useNavigate()
    console.log('hi');
    useEffect(() => {
      const queries = [Query.equal("userId", userId)]
        service.getPosts(queries)
        .then((posts) => {
          if(posts.documents.length < 1) setPosts(null)
          else setPosts(posts.documents)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className="w-full py-8">
        <Container>
          <div className=" flex flex-wrap">
          {posts?.map((post) => (
            <div key={post.$id} className=" p-2 w-1/4">
              <PostCard {...post}/>
            </div>
          ))}
          {!posts && <p>No posts to show.</p>}
          </div>
        </Container>
    </div>
  )
}
export default AllPosts