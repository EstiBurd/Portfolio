import React, { FC } from 'react';
import SimpleAccordion, { ISimpleAccordionItem } from '../src/components/get-ui/SimpleAccordion';
import IPost from '../src/types/IPost';
import path from 'path';
import { getServerAbsolteUrl } from '../src/utils/server/server-utils';
import MuiSnackbar from '../src/components/get-ui/MuiSnackbar';
import { AlertColor } from '@mui/material';

interface IProps {
    posts: IPost[];
    sevirity:AlertColor;
    message:string;
}
export async function getStaticProps() {

    let props:IProps={
        posts: [],
        sevirity: 'success',
        message: ''
    }
    //--get posts
    
    const url = path.join(getServerAbsolteUrl(), '/api/posts');
    
    try {
        const response = await fetch(url);
        props.posts = await response.json();
        props.sevirity='success'
    } catch (error) {
        props.sevirity='error';
        props.message='Fetch error'
        console.error(error);
    }
    return {
        props, // will be passed to the page component as props
    }
}

const Blog: FC<IProps> = ({ posts,sevirity, message}) => {
    const items: ISimpleAccordionItem[] = posts.map(post => {
        return { summary: post.subject, details: post.body };
    })

    return (
        <div>
            <h2>Posts</h2>
          {(sevirity!='success')?<MuiSnackbar
                isOpen={true}
                durationMs={6000}
                sevirity={sevirity}
                message={message} 
                />:null} 
            <SimpleAccordion items={items} />
        </div>
    );
};

export default Blog;