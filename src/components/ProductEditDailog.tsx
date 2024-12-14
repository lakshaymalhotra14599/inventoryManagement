// ProductEditDialog.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useRoleContext } from '../hooks/useRoleContext';

interface ProductEditDialogProps {
  onClose: () => void;
  onSave: (updatedProduct: any) => void;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({ onClose, onSave }) => {
    const {state} =  useRoleContext() ;
    const { dialogOpen , selectedProduct} = state.inventory ;

    const [formData, setFormData] = useState<any>(selectedProduct);

  useEffect(() => {
    setFormData(selectedProduct); // Reset form data when selectedProduct changes
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData); // Pass the updated product data back to parent
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Category"
          name="category"
          value={formData?.category || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={formData?.price || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={formData?.quantity || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Value"
          name="value"
          value={formData?.value || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditDialog;
