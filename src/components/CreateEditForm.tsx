import React from "react";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsersContext } from '@/hooks/useUsersContext';
import { UserDataContext } from '../context/SelectedUserContext';


type UserType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: number
}
const UseStyles = makeStyles({
    create: {

        width: "100% ",
        padding: "0",

    },
    create2: {
        margin: "10px ",
        width: "100% ",
        padding: "0",

    },
    textname: {
        width: "100%",
        marginBottom: "50px",
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

const Create = () => {
    const classes = UseStyles();
    const { selectedUser } = React.useContext(UserDataContext);
    const isAddMode = !selectedUser.id;
    const { dispatch } = useUsersContext()
    const [isPending, setPending] = React.useState<boolean>(false);


    const validationSchema = yup.object().shape({
        firstName: yup
            .string()
            .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
            .max(25, "First Name could not be 25 characters long")
            .min(4, "First Name must contain at least 4 characters")
            .required("First Name is required"),
        lastName: yup
            .string()
            .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
            .max(25, "Last Name could not be 25 characters long")
            .min(4, "Last Name must contain at least 4 characters")
            .required("Last Name is required"),
        email: yup.string().email("valid Email is Required").required("valid Email is Required"),
        phone: yup.number().positive().integer().required("Number is Required"),

    });

    const { register, handleSubmit, reset, setValue, getValues, formState } =
        useForm<UserType>({
            resolver: yupResolver(validationSchema),
        });
    const { errors } = formState;
    function onSubmit(data: UserType) {
        return isAddMode ? createUser(data) : updateUser(selectedUser.id, data);
    }
    const update = () => {
        fetch("  http://localhost:8000/users").then((result) => {
            result.json().then((resp) => {
                dispatch({ type: 'SET_USERS', payload: resp })
            });
        });
    };
    const updateUser = (
        id: number | string,
        userData: UserType
    ) => {
        fetch(`http://localhost:8000/users/` + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => {
                return res.json();
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        id,
                        userData
                    }
                });

                update();
            });
    };

    const createUser = (data: UserType) => {
        setPending(true);
        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {

                setPending(false);
                return res.json();
            })

            .then((data) => {
                dispatch({ type: 'CREATE_USERS', payload: data })


            });
    };
    React.useEffect(() => {
        if (!isAddMode) {

            fetch(`http://localhost:8000/users/` + selectedUser.id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const fields: Array<
                        "firstName" | "lastName" | "email" | "phone"
                    > = ["firstName", "lastName", "email", "phone"];
                    fields.forEach((field) => setValue(field, data[field]));

                });
        }
    }, [isAddMode, selectedUser.id, setValue]);

    return (
        <Box className={!isAddMode ? classes.create2 : classes.create}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

                <Box className={classes.textname}>
                    <TextField
                        fullWidth
                        label="First Name"
                        type="text"
                        placeholder="Enter the First Name"
                        variant="outlined"

                        id="firstName"
                        {...register("firstName")}
                        defaultValue={!isAddMode ? { getValues } : ""}
                    />
                    <Box className={classes.invalidFeedback}>
                        {errors.firstName?.message}
                    </Box>
                </Box>
                <Box className={classes.textname}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        type="text"
                        placeholder="Enter the Last Name"
                        id="lastName"
                        {...register("lastName")}
                        defaultValue={!isAddMode ? { getValues } : ""}
                    />
                    <Box className={classes.invalidFeedback}>
                        {errors.lastName?.message}
                    </Box>
                </Box>
                <Box className={classes.textname}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        placeholder="Enter the Email"
                        id="email"
                        {...register("email")}
                        defaultValue={!isAddMode ? { getValues } : ""}
                    />
                    <Box className={classes.invalidFeedback}>
                        {errors.email?.message}
                    </Box>
                </Box>
                <Box className={classes.textname}>
                    <TextField
                        fullWidth
                        label="Phone no."
                        type="text"
                        placeholder="Enter the number"
                        id="phone"
                        {...register("phone")}
                        defaultValue={!isAddMode ? { getValues } : ""}
                    />
                    <Box className={classes.invalidFeedback}>
                        {errors.phone?.message}
                    </Box>
                </Box>

                <Box className={classes.btn}>
                    <Box style={{ flexGrow: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                        >
                            {isAddMode ? "Submit" : "Save"}
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
            </form>
        </Box>
    );
};

export default Create;