import React from "react";
import {CardContent, OutlinedInput, InputAdornment} from "@mui/material";
import Avatar from "@mui/material/Avatar";

function Comment({userId, text, userName}) {
    return (
        <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline
                inputProps={{maxLength: 25}}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Avatar
                            style={{background: "linear-gradient(95deg, #3110F4 10%, #2196F3 90%)", color: "white"}}
                            aria-label="recipe"
                        >
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </InputAdornment>
                }
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;

