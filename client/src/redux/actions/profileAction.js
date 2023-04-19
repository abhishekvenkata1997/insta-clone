import { GLOBALTYPES, DeleteData } from './globalTypes';
import {getDataAPI , patchDataAPI} from './../../utils/fetchData';
import {imageUpload} from './../../utils/imageUpload'
import { createNotify, removeNotify } from './notifyAction';
export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST:'UPDATE_PROFILE_POST'
}

export const getProfileUsers = ({ id, auth}) => async (dispatch) => {
    
    dispatch({
        type: PROFILE_TYPES.GET_ID, payload: id
    })
    try{
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`/user/${id}`, auth.token)
            const res1 = await getDataAPI(`/user_posts/${id}`, auth.token)
            
            const users = await res;
            const posts = await res1;
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: users.data
            })
            dispatch({
                type: PROFILE_TYPES.GET_POSTS,
                payload: {...posts.data, _id: id, page: 2}
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        } catch(err){
            dispatch({
                types: GLOBALTYPES.ALERT, 
                payload: {error: err.response.data.msg}
            })
        }
}

