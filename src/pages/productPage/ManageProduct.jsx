import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Mock API service
const ProductApiService = {
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        resolve(products);
      }, 500);
    });
  },
  deleteProduct: (productId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        resolve({ success: true });
      }, 500);
    });
  }
};

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from API
  const loadProducts = async () => {
    console.log('Attempting to load products...'); // Log when loading starts
    try {
      const fetchedProducts = await ProductApiService.getProducts();
      console.log('Fetched products:', fetchedProducts); // Log fetched products
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to load products:', error); // Log any errors
      setSnackbar({
        open: true,
        message: 'Failed to load products',
        severity: 'error'
      });
    }
  };

  // Handle search and filters
  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter(product => {
        if (statusFilter === 'published') return product.visibility;
        if (statusFilter === 'draft') return !product.visibility;
        if (statusFilter === 'featured') return product.featured;
        return true;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, statusFilter, products]);

  // Handle delete confirmation
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = async () => {
    try {
      await ProductApiService.deleteProduct(productToDelete.id);
      await loadProducts();
      setSnackbar({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete product',
        severity: 'error'
      });
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <Box component="main" sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
        {/* Header with title and add button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Manage Products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin-dashboard/product/add')}
          >
            Add New Product
          </Button>
        </Box>

        {/* Filters and Search */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="featured">Featured</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
              <CardMedia
                  component="img"
                  height="200"
                  image={product.images || '/api/placeholder/400/200'}
                  alt={product.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" noWrap sx={{ flex: 1 }}>
                      {product.name}
                    </Typography>
                    {product.visibility ? (
                      <VisibilityIcon color="action" fontSize="small" />
                    ) : (
                      <VisibilityOffIcon color="action" fontSize="small" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    SKU: {product.sku}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" color="primary">
                    ₹{product.price}
                    </Typography>
                    {product.discountPrice && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        ₹{product.discountPrice}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="default" 
                      variant="outlined" 
                    />
                    {product.featured && (
                      <Chip 
                        label="Featured" 
                        size="small" 
                        color="primary" 
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Stock: {product.inventory.quantity}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/admin-dashboard/product/edit/${product.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredProducts.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="text.secondary" sx={{ my: 4 }}>
                No products found
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ManageProduct;



