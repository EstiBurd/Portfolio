import { AlertColor } from '@mui/material';
import Link from 'next/link';
import path from 'path';
import React, { FC } from 'react';
import MuiSnackbar from '../../src/components/get-ui/MuiSnackbar';
import ICommentShort from '../../src/types/ICommentShort';
import { getServerAbsolteUrl } from '../../src/utils/server/server-utils';
import {AiOutlineFileAdd,AiOutlineDelete,AiOutlineInfoCircle,AiFillEdit} from 'react-icons/ai';
import styles from '../../styles/comments.module.css';

interface IProps {
    commentsShort: ICommentShort[];
    sevirity: AlertColor;
    message: string;
}
export async function getServerSideProps() {
    
    
    let props:IProps={
        commentsShort: [],
        sevirity: 'success',
        message: ''
    }
    const url = path.join(getServerAbsolteUrl(), '/api/comments');
    try {
        const response = await fetch(url);
        props.commentsShort = await response.json();
        props.sevirity = 'success'
    } catch (error) {
        props.sevirity = 'error';
        props.message = 'Fetch error'
        console.error(error);
    }
    return {
        props, // will be passed to the page component as props
    }
}


const Comments: FC<IProps> = ({ commentsShort, sevirity, message }) => {
    console.log(commentsShort);
    const elems=commentsShort.map((it,i)=><div className={styles.grid_container} key={i}>
        <span>{it.description}</span><AiOutlineDelete/><AiFillEdit/><AiOutlineInfoCircle/>
    </div>)
    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
<AiOutlineFileAdd/>
{elems}
            {(sevirity != 'success') ? <MuiSnackbar
                isOpen={true}
                durationMs={6000}
                sevirity={sevirity}
                message={message}
            /> : null}
        </div>
    );
};

export default Comments;
