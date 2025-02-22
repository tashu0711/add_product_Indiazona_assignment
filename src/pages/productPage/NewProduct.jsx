import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Divider,
  Chip,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import ProductApiService from "./ProductApiService";

const NewProduct = () => {
  // State management for form fields
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    price: "",
    discountPrice: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: [],
    shortDescription: "",
    longDescription: "",
    inventory: {
      quantity: "",
      lowStockThreshold: "",
      sku: "",
      weight: "",
      dimensions: { length: "", width: "", height: "" },
    },
    shipping: {
      free: false,
      price: "",
      estimatedDelivery: "",
    },
    images: "",
    specifications: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
    visibility: true,
    featured: false,
  });

  // For tag input
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // For specification inputs
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  // Categories and subcategories (would come from an API in a real app)
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Beauty & Personal Care",
    "Toys & Games",
  ];
  const subcategories = {
    Electronics: ["Smartphones", "Laptops", "Accessories", "Audio", "Cameras"],
    Clothing: ["Men", "Women", "Kids", "Shoes", "Accessories"],
    "Home & Garden": ["Furniture", "Kitchen", "Decor", "Garden", "Bedding"],
    "Beauty & Personal Care": [
      "Skincare",
      "Makeup",
      "Hair",
      "Fragrance",
      "Bath & Body",
    ],
    "Toys & Games": [
      "Action Figures",
      "Board Games",
      "Puzzles",
      "Outdoor Toys",
      "Educational",
    ],
  };

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProductData({
        ...productData,
        [parent]: {
          ...productData[parent],
          [child]: value,
        },
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  // Handle dimensions changes
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      inventory: {
        ...productData.inventory,
        dimensions: {
          ...productData.inventory.dimensions,
          [name]: value,
        },
      },
    });
  };

  // Handle switch changes
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProductData({
      ...productData,
      [name]: checked,
    });
  };

  // Handle shipping free switch
  const handleShippingFreeChange = (e) => {
    const { checked } = e.target;
    setProductData({
      ...productData,
      shipping: {
        ...productData.shipping,
        free: checked,
        price: checked ? "0" : productData.shipping.price,
      },
    });
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !productData.tags.includes(tagInput.trim())) {
      setProductData({
        ...productData,
        tags: [...productData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Handle adding a keyword
  const handleAddKeyword = () => {
    if (
      keywordInput.trim() !== "" &&
      !productData.seo.keywords.includes(keywordInput.trim())
    ) {
      setProductData({
        ...productData,
        seo: {
          ...productData.seo,
          keywords: [...productData.seo.keywords, keywordInput.trim()],
        },
      });
      setKeywordInput("");
    }
  };

  // Handle removing a keyword
  const handleRemoveKeyword = (keywordToRemove) => {
    setProductData({
      ...productData,
      seo: {
        ...productData.seo,
        keywords: productData.seo.keywords.filter(
          (keyword) => keyword !== keywordToRemove
        ),
      },
    });
  };

  // Handle adding a specification
  const handleAddSpecification = () => {
    if (specKey.trim() !== "" && specValue.trim() !== "") {
      setProductData({
        ...productData,
        specifications: [
          ...productData.specifications,
          { key: specKey, value: specValue },
        ],
      });
      setSpecKey("");
      setSpecValue("");
    }
  };

  // Handle removing a specification
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...productData.specifications];
    updatedSpecs.splice(index, 1);
    setProductData({
      ...productData,
      specifications: updatedSpecs,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result; // ✅ Already in proper format

      setProductData({
        ...productData,
        images: base64String, // ✅ Store Data URL directly
      });
    };

    reader.readAsDataURL(file); // ✅ Automatically converts to "data:image/png;base64,..."
  };

  useEffect(() => {
    console.log("The required image is: ", productData.images);
  }, [productData.images]);

  // Handle image removal
  const handleRemoveImage = (index) => {
    // const updatedImages = [...productData.images];
    // URL.revokeObjectURL(updatedImages[index].preview);
    // updatedImages.splice(index, 1);
    setProductData({
      ...productData,
      images: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", productData); // Log the form data

    try {
      const savedProduct = await ProductApiService.createProduct(productData);
      console.log("Product saved successfully:", savedProduct); // Log the saved product
      alert("Product saved successfully!");
      // Check localStorage directly
      const storedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      console.log("All products in localStorage:", storedProducts); // Log all stored products
      navigate("/admin-dashboard/product/manage");
    } catch (error) {
      console.error("Error saving product:", error); // Log any errors
      alert("Failed to save product");
    }
  };

  return (
    <Box component="main" sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Add New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            Basic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                required
                fullWidth
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="SKU"
                name="sku"
                value={productData.sku}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="Regular Price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Discount Price"
                name="discountPrice"
                type="number"
                value={productData.discountPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!productData.category}>
                <InputLabel id="subcategory-label">Subcategory</InputLabel>
                <Select
                  labelId="subcategory-label"
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleChange}
                  label="Subcategory"
                >
                  {productData.category &&
                    subcategories[productData.category].map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <TextField
                  fullWidth
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  variant="outlined"
                  placeholder="Enter tag and press Enter or Add button"
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddTag}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {productData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Product Description */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Product Description
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Short Description"
                name="shortDescription"
                value={productData.shortDescription}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                placeholder="Brief summary of the product (150-200 characters)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Description"
                name="longDescription"
                value={productData.longDescription}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={6}
                placeholder="Detailed product description with features, benefits, and use cases"
              />
            </Grid>
          </Grid>

          {/* Inventory Management */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Inventory
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Quantity in Stock"
                name="inventory.quantity"
                type="number"
                value={productData.inventory.quantity}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                name="inventory.lowStockThreshold"
                type="number"
                value={productData.inventory.lowStockThreshold}
                onChange={handleChange}
                variant="outlined"
                helperText="Notification will be sent when stock falls below this number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="inventory.weight"
                type="number"
                value={productData.inventory.weight}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2" gutterBottom>
                Dimensions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Length"
                    name="length"
                    type="number"
                    value={productData.inventory.dimensions.length}
                    onChange={handleDimensionChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Width"
                    name="width"
                    type="number"
                    value={productData.inventory.dimensions.width}
                    onChange={handleDimensionChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Height"
                    name="height"
                    type="number"
                    value={productData.inventory.dimensions.height}
                    onChange={handleDimensionChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Shipping Information */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Shipping
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productData.shipping.free}
                    onChange={handleShippingFreeChange}
                    name="shipping.free"
                  />
                }
                label="Free Shipping"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Shipping Cost"
                name="shipping.price"
                type="number"
                value={productData.shipping.price}
                onChange={handleChange}
                variant="outlined"
                disabled={productData.shipping.free}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Estimated Delivery Time"
                name="shipping.estimatedDelivery"
                value={productData.shipping.estimatedDelivery}
                onChange={handleChange}
                variant="outlined"
                placeholder="e.g., 2-4 business days"
              />
            </Grid>
          </Grid>

          {/* Product Images */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Product Images
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              <Typography variant="caption" display="block" gutterBottom>
                You can upload multiple images. First image will be used as the
                product thumbnail.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                {/* {productData.images.map((image, index) => ( */}
                <Box
                  // key={index}
                  sx={{
                    position: "relative",
                    width: 150,
                    height: 150,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={productData.images}
                    alt={`Product ₹{index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(0)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      bgcolor: "rgba(255,255,255,0.8)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  {/* {index === 0 && (
                      <Chip
                        label="Main"
                        size="small"
                        color="primary"
                        sx={{
                          position: "absolute",
                          bottom: 5,
                          left: 5,
                        }}
                      />
                    )} */}
                </Box>
                {/* ))} */}
              </Box>
            </Grid>
          </Grid>

          {/* Product Specifications */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Product Specifications
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <TextField
                  label="Specification Name"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  variant="outlined"
                  sx={{ mr: 1, flex: 1 }}
                  placeholder="e.g., Color, Material, Display Size"
                />
                <TextField
                  label="Specification Value"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  variant="outlined"
                  sx={{ mr: 1, flex: 1 }}
                  placeholder="e.g., Black, Aluminum, 15.6 inches"
                />
                <Button
                  variant="contained"
                  onClick={handleAddSpecification}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Paper
                variant="outlined"
                sx={{ p: 2, maxHeight: 300, overflow: "auto" }}
              >
                {productData.specifications.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    No specifications added yet
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {productData.specifications.map((spec, index) => (
                      <Grid item xs={12} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography variant="subtitle2">
                              {spec.key}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {spec.value}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveSpecification(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        {index < productData.specifications.length - 1 && (
                          <Divider sx={{ my: 1 }} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* SEO Information */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            SEO Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                name="seo.metaTitle"
                value={productData.seo.metaTitle}
                onChange={handleChange}
                variant="outlined"
                placeholder="SEO optimized title (max 60 characters)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Description"
                name="seo.metaDescription"
                value={productData.seo.metaDescription}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                placeholder="Brief description for search engines (max 160 characters)"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <TextField
                  fullWidth
                  label="Add Keywords"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddKeyword())
                  }
                  variant="outlined"
                  placeholder="Enter keyword and press Enter or Add button"
                  sx={{ mr: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddKeyword}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {productData.seo.keywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    onDelete={() => handleRemoveKeyword(keyword)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Product Status */}
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 4, mb: 2 }}
          >
            Product Status
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productData.visibility}
                    onChange={handleSwitchChange}
                    name="visibility"
                  />
                }
                label="Product Visibility (Published/Draft)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={productData.featured}
                    onChange={handleSwitchChange}
                    name="featured"
                  />
                }
                label="Featured Product"
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Save Product
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewProduct;
