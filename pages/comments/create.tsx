import { AlertColor, Button, Stack, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import IComment from 'src/types/IComment';
import axios from 'axios';
import MuiSnackbar from 'src/components/get-ui/MuiSnackbar';

let sevirity: AlertColor = 'error';
let message: string = '';
const CommnetCreate = () => {
    const [isOpen, setisOpen] = useState(false)

    async function sendNewCommentToServer(comment: IComment) {
        try {
            const response = await axios.post('/api/comments', comment);
            await response.data;
            sevirity = 'success';
            message = 'Comment is created';
            setisOpen(true);

        }
        catch (error) {
            sevirity = 'error';
            message = 'Comment is not created';
            setisOpen(true);
            console.log(error);

        }
    }
    function addComment(evt: SyntheticEvent): void {
        evt.preventDefault();
        const form = evt.target as any;
        let comment: IComment = {
            author: form.author.value,
            email: form.email.value,
            id: -1,
            description: form.description.value
        };
        sendNewCommentToServer(comment);
        (form as HTMLFormElement).reset();
    }
    return (
        <div>
            <form onSubmit={addComment}>
                <Stack spacing={2}>
                    <TextField required label="Author" name="author" variant="standard" />
                    <TextField required label="Email" type='email' name="email" variant="standard" />
                    <TextField required label="Description" name="description" variant="standard" />
                    <Button variant="outlined" type='submit'>Add Comment</Button>
                </Stack>
            </form>
            {isOpen ? (<MuiSnackbar
                isOpen={isOpen}
                durationMs={6000}
                sevirity={sevirity}
                message={message} />
            ) : null}
        </div>
    );
};

export default CommnetCreate;


