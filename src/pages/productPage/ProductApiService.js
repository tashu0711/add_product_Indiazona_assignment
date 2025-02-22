// ProductApiService.js
const ProductApiService = {
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        // Ensure each product has a valid image URL
        const productsWithImages = products.map(product => ({
          ...product,
          images: product.images?.length > 0 
            ? product.images 
            : [{ url: '/api/placeholder/400/200', name: 'placeholder' }]
        }));
        console.log('ProductApiService.getProducts:', productsWithImages);
        resolve(productsWithImages);
      }, 500);
    });
  },

  createProduct: (productData) => {
    return new Promise((resolve) => {
      console.log('ProductApiService.createProduct - Received data:', productData); // Log incoming data
      
      setTimeout(() => {
        // Transform the form data to match the display format
        const transformedProduct = {
          id: Date.now().toString(),
          name: productData.name,
          sku: productData.sku,
          price: parseFloat(productData.price),
          discountPrice: productData.discountPrice ? parseFloat(productData.discountPrice) : null,
          category: productData.category,
          subcategory: productData.subcategory,
          brand: productData.brand,
          tags: productData.tags,
          shortDescription: productData.shortDescription,
          longDescription: productData.longDescription,
          inventory: {
            quantity: parseInt(productData.inventory.quantity),
            lowStockThreshold: parseInt(productData.inventory.lowStockThreshold),
            weight: parseFloat(productData.inventory.weight),
            dimensions: productData.inventory.dimensions
          },
          shipping: productData.shipping,
          images: productData.images ? productData.images : "",
          specifications: productData.specifications,
          seo: productData.seo,
          visibility: productData.visibility,
          featured: productData.featured
        };

        console.log('ProductApiService.createProduct - Transformed data:', transformedProduct); // Log transformed data

        // Get existing products and add new one
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        console.log('ProductApiService.createProduct - Existing products:', existingProducts); // Log existing products
        
        existingProducts.push(transformedProduct);
        
        try {
          localStorage.setItem('products', JSON.stringify(existingProducts));
          console.log('ProductApiService.createProduct - Successfully saved to localStorage');
        } catch (error) {
          console.error('ProductApiService.createProduct - Error saving to localStorage:', error);
          throw error;
        }

        resolve(transformedProduct);
      }, 500);
    });
  },

  deleteProduct: (productId) => {
    return new Promise((resolve) => {
      console.log('ProductApiService.deleteProduct - Deleting product:', productId); // Log deletion attempt
      
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        console.log('ProductApiService.deleteProduct - Remaining products:', updatedProducts); // Log remaining products
        resolve({ success: true });
      }, 500);
    });
  },

  updateProduct: (productId, productData) => {
    return new Promise((resolve) => {
      console.log('ProductApiService.updateProduct - Updating product:', productId, productData); // Log update attempt
      
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex !== -1) {
          products[productIndex] = {
            ...products[productIndex],
            ...productData
          };
          localStorage.setItem('products', JSON.stringify(products));
          console.log('ProductApiService.updateProduct - Successfully updated product');
          resolve({ success: true });
        } else {
          console.error('ProductApiService.updateProduct - Product not found');
          resolve({ success: false, error: 'Product not found' });
        }
      }, 500);
    });
  }
};

export default ProductApiService;