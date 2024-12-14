import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useRoleContext } from '../hooks/useRoleContext';
import { InventoryItem } from '../inventoryReducer';

interface ProductEditDialogProps {
  onClose: () => void;
  onSave: (updatedProduct: InventoryItem) => void;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({ onClose, onSave }) => {
  const { state } = useRoleContext();
  const { dialogOpen, selectedProduct } = state.inventory;

  const [formData, setFormData] = useState<InventoryItem | null>(selectedProduct);

  useEffect(() => {
    setFormData(selectedProduct); 
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : null
    );
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData); 
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
