import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Send from './../../../images/send.svg'


const CardFooter = ({post}) => {
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)



    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <i className='far fa-heart'/>

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    <img src={Send} alt="Send" />
                </div>

                <i className="far fa-bookmark" />
            </div>


            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.likes.length} likes
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.comments.length} comments
                </h6>
            </div>

        </div>
    )
}

export default CardFooter