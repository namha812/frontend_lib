import { TextField } from '@material-ui/core'
import React from 'react'

export const renderTextField = ({
    input,
    label,
    type,
    meta,
}) => {
    return (
        <div>
            <TextField
                style = {{
                    width: "100%"
                }}
                label={label}
                type={type}
                {...input}
            />
        </div>
    )
}
