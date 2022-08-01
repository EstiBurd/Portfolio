import { AlertColor } from '@mui/material';
import Link from 'next/link';
import path from 'path';
import React, { FC } from 'react';
import MuiSnackbar from '../../src/components/get-ui/MuiSnackbar';
import ICommentShort from '../../src/types/ICommentShort';
import { getServerAbsolteUrl } from '../../src/utils/server/server-utils';

export async function getServerSideProps() {
    let commentsShort: ICommentShort[] = [];
    const url = path.join(getServerAbsolteUrl(), '/api/comments');
    let sevirity: AlertColor;
    let message: string = "";
    try {
        const response = await fetch(url);
        commentsShort = await response.json();
        sevirity = 'success'
    } catch (error) {
        sevirity = 'error';
        message = 'Fetch error'
        console.error(error);
    }
    return {
        props: { commentsShort, sevirity, message }, // will be passed to the page component as props
    }
}
interface IProps {
    commentsShort: ICommentShort[];
    sevirity: AlertColor;
    message: string;
}

const Comments: FC<IProps> = ({ commentsShort, sevirity, message }) => {
    console.log(commentsShort);
    return (
        <div>
            <h2>Comments</h2>
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
