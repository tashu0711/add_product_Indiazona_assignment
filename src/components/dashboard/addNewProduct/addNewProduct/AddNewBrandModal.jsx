import { Box, Button, CircularProgress, Divider, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from 'yup';
import {  required } from '../../../utils/validations';
import { useFormik } from 'formik';
import { postFormData } from '../../../services';
import { IN_URL } from '../../../BaseUrl';
import { toast } from 'react-toastify';

const AddNewBrandModal = ({showModal,setShowModal}) => {

    const [image,setImage]=useState(null);
    const [imageThumbnail,setImageThumbnail]=useState(null);
    const [loading,setLoading]=useState(false);

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        setImage(e.target.files[0]);
        setImageThumbnail(URL.createObjectURL(file));
        e.target.files=null;
    }

    const handleRemoveImage=()=>{
        setImage(null);
        setImageThumbnail(null);
    }

    const brandSchema=Yup.object({
    name: required,
    metaTitle: required,
  });

  const onSubmit=()=>{
    console.log(values);
    setLoading(true);
    // if(!image){
    //     toast.error("Brand image is required");
    //     setLoading(false);
    // }
    const formData=new FormData();

    formData.append('name',values.name);
    formData.append('meta_description',values.metaTitle);
    formData.append('meta_title',values.metaDescription);
    // formData.append('user_id',userId);
    formData.append('user_id',13);
    formData.append('image',image);

    postFormData(IN_URL+'brands/add-new-brand',formData).then((res)=>{
        toast.success("Brand is created successfully");
        setLoading(false);
        setShowModal(false);
    }).catch((e)=>{
        console.log(e?.response?.data?.message);
        setLoading(false);
    });
   
  }

    const {
        values,
        touched,
        handleBlur,
        handleChange,
        errors,
        handleSubmit
      } = useFormik({
        initialValues: {
          name: "",
          metaTitle: "",
          metaDescription: "",
        },
        validationSchema: brandSchema,
        onSubmit,
      });


  return (
    <form onSubmit={handleSubmit} autoComplete="off">
    <Modal open={showModal} onClose={() => setShowModal(false)}>
        
        <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            }}
        >
            {/* Title */}
            <Typography
            id="add-brand-title"
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold" }}
            >
            Add New Brand
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Form Fields */}
            <Box component="form">
            {/* Name */}
            <TextField
                label="Name"
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
                name="name"
                error={errors.name && touched.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.name && touched.name ? errors.name : ""}
            />

            {/* Logo */}
            <Typography
                sx={{ fontSize: "14px", mb: 1, color: "text.secondary" }}
            >
                Logo (120x80)
            </Typography>
            <Button
                variant="outlined"
                component="label"
                sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textTransform: "none",
                mb: 2,
                }}
            >
                Browse
                <input type="file"
                 accept=".jpg,.png" 
                 hidden
                 onChange={handleImageChange}
                  />
            </Button>
            
            {
                image &&(
                    <Box
          sx={{
            position: 'relative',
            width:"80px",
           paddingTop:"10px",
           
          }}
        >
      <Box
          component="img"
          sx={{
              width:"100px",
              // height:"60px"
              // display: 'inline-block',
              borderRadius:"5px",
              boxShadow:2,
              my:1,
          }}
          // alt="Indiazona."
          src= {imageThumbnail}
          />
        {/* <Typography>{image?.fileName}</Typography> */}
        <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '-30px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { backgroundColor: 'rgb(192, 192, 192)' },
            }}
          >
            <CloseIcon />
          </IconButton>
          </Box>
                )
            }
            

            {/* Meta Title */}
            <TextField
                label="Meta Title"
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
                name="metaTitle"
                error={errors.metaTitle && touched.metaTitle}
                value={values.metaTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.metaTitle && touched.metaTitle ? errors.metaTitle : ""}
            />

            {/* Meta Description */}
            <TextField
                label="Meta Description"
                multiline
                rows={3}
                fullWidth
                size="small"
                variant="outlined"
                sx={{ mb: 2 }}
                name="metaDescription"
                error={errors.metaDescription && touched.metaDescription}
                value={values.metaDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.metaDescription && touched.metaDescription ? errors.metaDescription : ""}
            />

            {/* Buttons */}
            <Box
                sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                }}
            >
                <Button
                variant="outlined"
                onClick={() => setShowModal(false)}
                sx={{ mr: 2, textTransform: "none" }}
                >
                Cancel
                </Button>
                <Button
                variant="contained"
                color="secondary"
                 type="submit"
                disableElevation
                disabled={loading}
                >
                 {loading?<CircularProgress size={20} sx={{color:"#FFFFFF"}} /> :"Save"}
                </Button>
            </Box>
            </Box>
        </Box>
        
        </Modal>
        </form>
  )
}

export default AddNewBrandModal
