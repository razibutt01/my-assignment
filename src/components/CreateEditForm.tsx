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
import { apiFetch } from "./apiFetch";


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
    const update = async () => {
        try {
            const resp = await apiFetch("http://localhost:8000/users");
            dispatch({ type: 'SET_USERS', payload: resp });
        } catch (err) {
            console.error(err);
        }
    };
    const updateUser = async (
        id: number | string,
        userData: UserType
    ) => {
        try {
            await apiFetch(`http://localhost:8000/users/` + id, {
                method: "PUT",
                body: JSON.stringify(userData),
            });

            dispatch({
                type: "UPDATE_USER",
                payload: {
                    id,
                    userData,
                },
            });

            update();
        } catch (error) {
            console.error(error);
        }
    };


    const createUser = async (data: UserType) => {
        setPending(true);
        try {
            const jsonData = await apiFetch("http://localhost:8000/users", {
                method: "POST",
                body: JSON.stringify(data),
            });

            setPending(false);
            dispatch({ type: "CREATE_USERS", payload: jsonData });
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        async function fetchSelectedUserData() {
            if (!isAddMode) {
                try {
                    const data = await apiFetch("http://localhost:8000/users/" + selectedUser.id);
                    const fields: Array<
                        "firstName" | "lastName" | "email" | "phone"
                    > = ["firstName", "lastName", "email", "phone"];
                    fields.forEach((field) => setValue(field, data[field]));
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchSelectedUserData();
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