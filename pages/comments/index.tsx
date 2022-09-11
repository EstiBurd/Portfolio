import { AlertColor, Button } from '@mui/material';
import Link from 'next/link';
import path from 'path';
import React, { FC, useState } from 'react';
import MuiSnackbar from 'src/components/get-ui/MuiSnackbar';
import ICommentShort from 'src/types/ICommentShort';
import { getServerAbsolteUrl } from 'src/utils/server/server-utils';
import { AiOutlineFileAdd, AiOutlineDelete, AiOutlineInfoCircle, AiFillEdit } from 'react-icons/ai';
import styles from 'styles/comments.module.css';
import axios from 'axios';
import DialogYesNo from 'src/components/get-ui/DialogYesNo';

interface IMessageDetails {
    sevirity: AlertColor;
    message: string;
}
interface IProps {
    commentsShort: ICommentShort[];
    messageDetails: IMessageDetails;
}
export async function getServerSideProps() {
    let props: IProps = {
        commentsShort: [],
        messageDetails: { sevirity: "success", message: "" }
    }
    const url = path.join(getServerAbsolteUrl(), '/api/comments');
    try {
        const response = await fetch(url);
        props.commentsShort = await response.json();
        props.messageDetails.sevirity = 'success'
    } catch (error) {
        props.messageDetails.sevirity = 'error';
        props.messageDetails.message = 'Fetch error'
        console.error(error);
    }
    return {
        props, // will be passed to the page component as props
    }
}
// SSR-get comments short
//CSR-delete
const Comments: FC<IProps> = (props) => {
    const [commentsShort, setcommentsShort] = useState<ICommentShort[]>(props.commentsShort);
    const [messageDetails, setmessageDetails] = useState<IMessageDetails>(props.messageDetails);
    const { sevirity, message } = messageDetails;

    function deleteComment(id: number): void {
        axios
            .delete(`/api/comments/${id}`)
            .then(function (response) {
                setmessageDetails({ sevirity: 'success', message: 'Message delete is success' })
                const tempCommentsShort = commentsShort.filter(comment => comment.id != id);
                setcommentsShort(tempCommentsShort);
            })
            .catch(function (error) {
                console.log(error);
                setmessageDetails({ sevirity: 'error', message: 'Message delete is failure' })
            });
    }

    const elems = commentsShort.map((it, i) => <div className={styles.grid_container} key={i}>
        <span>{it.description}</span>
        <AiOutlineDelete onClick={() => {
            deleteComment(it.id);
        }} />
        <AiFillEdit />
        <Link href={`/comments/${it.id}`}>
            <AiOutlineInfoCircle />
        </Link>
    </div>)
    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
            <DialogYesNo
                dialogTitle="title"
                dialogContent="content"
                yes="Agree"
                yesClickHandler={() => {
                    console.log('clicked yes')
                }}
                no="Disagree"
                noClickHandler={() => {
                    console.log('clicked no')
                }}
                children={<Button>Show Dialog</Button>}
            />
            <Link href='/comments/create'>
                <AiOutlineFileAdd />
            </Link>
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
