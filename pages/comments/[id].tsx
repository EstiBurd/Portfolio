import { AlertColor } from '@mui/material';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import path from 'path';
import React, { FC } from 'react';
import MuiSnackbar from 'src/components/get-ui/MuiSnackbar';
import IComment from 'src/types/IComment';
import { getServerAbsolteUrl } from 'src/utils/server/server-utils';
import styles from 'styles/commentDetails.module.css';


interface IProps {
    details: IComment | null,
    sevirity: AlertColor,
    message: string
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as any;
    let props: IProps = {
        details: null,
        sevirity: 'error',
        message: ''
    }
    if (id) {
        const url = path.join(getServerAbsolteUrl(), `/api/comments/${id}`);
        try {
            const response = await fetch(url);
            props.details = await response.json();
            props.sevirity = 'success'
        } catch (error) {
            props.sevirity = 'error';
            props.message = 'Fetch error'
            console.error(error);
        }
    }
    return {
        props,
    }
}
const CommentDetails: FC<IProps> = ({ details, sevirity, message }) => {
    return sevirity != 'success' || !details ?(
        <MuiSnackbar
            isOpen={true}
            durationMs={6000}
            sevirity={sevirity}
            message={message} />
             ) : (
        <>
            <div className={styles.grid_item}>
                <span>id</span>
                <span>{details.id}</span>
            </div>
            <div className={styles.grid_item}>
                <span>author</span>
                <span>{details.author}</span>
            </div>
            <div className={styles.grid_item}>
                <span>email</span>
                <span>{details.email}</span>
            </div>
            <div className={styles.grid_item}>
                <span>description</span>
                <span>{details.description}</span>
            </div>
        </>);
};

export default CommentDetails;