import React from "react";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import { useRolesContext } from '@/hooks/useRolesContext';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FormLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDataContext } from '../context/SelectedUserContext';
type RoleType = {
    id: number;
    title: string;
    active: string;
    description: string;


}
const UseStyles = makeStyles({
    create: {
        margin: "20px ",
        width: "100px ",
        padding: "0",
    },
    text: {
        width: "400px",
        marginBottom: "6px",
    },
    textname: {
        width: "100%",
        marginBottom: "20px",
    },
    date: {
        marginTop: "10px",
    },
    box: {
        display: "flex",
        flexDirection: "column",
    },
    btn: {
        marginTop: "10px",
        width: "100%",
        display: "flex"
    },
    form: {

        margin: "0",
        padding: "0",
    },

    invalidFeedback: {
        color: "red",
        fontSize: "small",
        marginTop: "0",
        textAlign: "center",
    },
    invalidFeedbackForSex: {
        color: "red",
        fontSize: "small",
        marginTop: "0",
    },
});
const RoleForm = () => {
    const classes = UseStyles();
    // const { selectedUser } = React.useContext(UserDataContext);
    // const isAddMode = !selectedUser.id;
    const { dispatch } = useRolesContext()
    const [isPending, setPending] = React.useState<boolean>(false);
    // console.log(isAddMode);

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
            .max(25, "Last Name could not be 25 characters long")
            .min(4, "First Name must contain at least 4 characters")
            .required("First Name is required"),
        description: yup
            .string()
            .min(4, "Last Name must contain at least 4 characters")
            .required("Last Name is required"),
        active: yup.string()
            .required("First Name is required"),

    });

    const { register, handleSubmit, reset, setValue, getValues, formState } =
        useForm<RoleType>({
            resolver: yupResolver(validationSchema),
        });
    const { errors } = formState;
    function onSubmit(data: RoleType) {
        return createRole(data);
    }
    const update = () => {
        fetch("  http://localhost:8000/roles").then((result) => {
            result.json().then((resp) => {
                dispatch({ type: 'SET_ROLES', payload: resp })
            });
        });
    };
    // const updateUser = (
    //     id: number | string,
    //     userData: RoleType
    // ) => {
    //     fetch(`http://localhost:8000/roles/` + id, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userData),
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then(() => {
    //             dispatch({
    //                 type: "UPDATE_USER",
    //                 payload: {
    //                     id,
    //                     userData
    //                 }
    //             }
    //             );

    //             update();
    //         });
    // };

    const createRole = (data: RoleType) => {
        setPending(true);
        fetch("http://localhost:8000/roles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                console.log("response");
                setPending(false);
                return res.json();
            })

            .then((data) => {
                dispatch({ type: 'CREATE_ROLES', payload: data })

            });
    };
    // React.useEffect(() => {
    //     if (!isAddMode) {
    //         // get user and set form fields
    //         fetch(`http://localhost:8000/roles/` + selectedUser.id)
    //             .then((res) => {
    //                 return res.json();
    //             })
    //             .then((data) => {
    //                 const fields: Array<
    //                     "title" | "description" | "active"
    //                 > = ["title", "description", "active"];
    //                 fields.forEach((field) => setValue(field, data[field]));
    //                 // setStudents(data);
    //             });
    //     }
    // }, [isAddMode, selectedUser.id, setValue]);
    // console.log("getValues", getValues());
    return (
        <Box className={classes.create}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <FormControl>
                    {/* <h1>{isAddMode ? "Add Student" : "Edit Student"}</h1> */}
                    <Box className={classes.textname}>
                        <TextField
                            fullWidth
                            label="Title"
                            type="text"
                            placeholder="Enter the Role Name"
                            variant="outlined"
                            id="title"
                            {...register("title")}
                        // defaultValue={!isAddMode ? { getValues } : ""}
                        />
                        <Box className={classes.invalidFeedback}>
                            {errors.title?.message}
                        </Box>
                    </Box>
                    <Box className={classes.textname}>
                        <TextField
                            label="Description"
                            type="text"
                            placeholder="Enter description"
                            multiline
                            rows={4}
                            className={classes.text}
                            id="description"
                            {...register("description")}
                        // defaultValue={!isAddMode ? { getValues } : ""}
                        />
                        <Box className={classes.invalidFeedback}>
                            {errors.description?.message}
                        </Box>
                    </Box>
                    <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Active</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="active"

                                {...register("active")}
                            // defaultValue={!isAddMode ? { getValues } : ""}
                            >
                                <MenuItem value={"yes"} style={{ display: "flex", flexDirection: "column" }}>Yes</MenuItem>
                                <MenuItem value={"no"} style={{ display: "flex", flexDirection: "column" }}>No</MenuItem>

                            </Select>
                        </FormControl>
                        <Box className={classes.invalidFeedback}>
                            {errors.active?.message}
                        </Box>
                    </Box>
                    {/* <Box className={classes.textname}>
                        <TextField
                            label="Phone no."
                            type="text"
                            placeholder="Enter the number"
                            className={classes.text}
                            id="phone"
                            {...register("phone")}
                            defaultValue={!isAddMode ? { getValues } : ""}
                        />
                        <Box className={classes.invalidFeedback}>
                            {errors.active?.message}
                        </Box>
                    </Box> */}

                    <Box className={classes.btn}>
                        <Box style={{ flexGrow: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"

                            >
                                {/* {isAddMode ? "Submit" : "Save"} */} Submit
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                type="reset"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                        </Box>

                    </Box>
                </FormControl>
            </form>
        </Box>
    );
};

export default RoleForm;