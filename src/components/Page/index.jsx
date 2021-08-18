import React from "react";
// ui components
import Grid from '@material-ui/core/Grid';

const Index = ({title, children}) => {
    return (
        <Grid container>
            <Grid container alignItems="center" justifyContent="center">
                {title && <h1>{title}</h1>}
            </Grid>
            <Grid container>
                {children}
            </Grid>

        </Grid>

    );
};

export default Index;
