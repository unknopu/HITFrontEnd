import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { handleFormSubmit } from "./submitForm";
import React  from 'react';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header title="INNITIATE AUDIT" subtitle="innitiate audit the target url" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={(e) => {
            handleFormSubmit(e, values)
          }}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Method (GET by default)"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="GET"
                name="method"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Target URL"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="www.example.com/home?example_param=123"
                name="url"
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cookie (could be empty)"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="example cookie"
                name="cookie"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Parameter"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="example_param"
                name="param"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Detail"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="detail"
                name="detail"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                SUBMIT
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
const initialValues = {
  method: "GET",
  url: "",
  param: "",
  cookie: "",
};

export default Form;
