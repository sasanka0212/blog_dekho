import { useState, useEffect } from "react"
import { Container, PostForm } from "../components"
import databaseService from "../appwrite/database"
import { useNavigate, useParams } from "react-router-dom"

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        if(slug) {
            databaseService.getBlog(slug).then((post) => {
                if(post) setPost(post)
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    return post 
        ? (
            <div className="py-8">
                <Container>
                    <PostForm post={post}/>
                </Container>
            </div>
        )
        : null
}

export default EditPost