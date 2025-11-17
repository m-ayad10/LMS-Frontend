import React, { useState } from 'react';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './style.css'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../Redux/store';
import { addCategory } from '../../../Redux/Slices/Category/CategoryThunk';

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    name: '',
    thumbnail: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      if (formData.thumbnail) {
        submitData.append('image', formData.thumbnail);
      }
     const response= await dispatch(addCategory(submitData)).unwrap()
     if(!response.success)
     {
        toast.error(response.message)
        return
     }
    toast.success('Category created successfully!');
    navigate('/admin/category')
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-category-page">
      {/* Header */}
      <div className="add-category-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <FaArrowLeft />
          Back
        </button>
        <h1 className="add-category-title">Add New Category</h1>
      </div>

      {/* Form */}
      <div className="add-category-form-container">
        <form onSubmit={handleSubmit} className="add-category-form">
          {/* Category Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              className="form-input"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="form-group">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail Image
            </label>
            <div className="file-upload-area">
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="thumbnail" className="file-upload-label">
                <FaUpload className="upload-icon" />
                <span>
                  {formData.thumbnail 
                    ? formData.thumbnail.name 
                    : 'Choose thumbnail image (optional)'}
                </span>
              </label>
              {formData.thumbnail && (
                <div className="file-preview">
                  <img 
                    src={URL.createObjectURL(formData.thumbnail)} 
                    alt="Preview" 
                    className="thumbnail-preview"
                  />
                </div>
              )}
            </div>
            <p className="file-hint">Recommended: 400x300px, max 5MB</p>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="submit-button"
            >
              <FaSave />
              {isLoading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;