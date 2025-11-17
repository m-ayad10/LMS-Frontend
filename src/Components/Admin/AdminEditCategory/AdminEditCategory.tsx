import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../Redux/store';
import { server_url } from '../../../Hooks/customHook';
import type { Category } from '../../../Redux/Slices/Category/CategoryType';
import { updateCategory } from '../../../Redux/Slices/Category/CategoryThunk';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    thumbnail: null as File | null | string
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    async function fetchCategory() {
      try {
        setIsFetching(true);
        const response = await fetch(`${server_url}/category/${id}`, { 
          credentials: "include" 
        });
        const data = await response.json();
        
        if (!data.success) {
          toast.error(data.message);
          navigate('/admin/category');
          return;
        }
        
        const category: Category = data.data;
        setCategory(category);
        setFormData({
          name: category.name,
          thumbnail: category.url || ''
        });
        
      } catch (error: any) {
        toast.error(error?.message || error || "Something went wrong");
      } finally {
        setIsFetching(false);
      }
    }
    fetchCategory();
  }, [id, navigate]);

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

    if (!id) {
      toast.error('Category ID is missing');
      return;
    }

    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('categoryId', id);
      if (formData.thumbnail && typeof formData.thumbnail !== 'string') {
        submitData.append('image', formData.thumbnail);
      }
      
      const response = await dispatch(updateCategory(submitData)).unwrap();
      
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      
      toast.success('Category updated successfully!');
      navigate('/admin/category');
      
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast.error(error?.message || 'Failed to update category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }));
  };

  // Show loading while fetching category data
  if (isFetching) {
    return (
      <div className="add-category-page">
        <div className="add-category-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft />
            Back
          </button>
          <h1 className="add-category-title">Edit Category</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading category data...</p>
        </div>
      </div>
    );
  }

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
        <h1 className="add-category-title">Edit Category</h1>
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
                    ? (typeof formData.thumbnail === 'string' 
                        ? 'Change thumbnail image' 
                        : formData.thumbnail.name)
                    : 'Choose thumbnail image (optional)'}
                </span>
              </label>
              
              {/* Show existing or new thumbnail preview */}
              {(formData.thumbnail && typeof formData.thumbnail === 'string') && (
                <div className="file-preview">
                  <p className="current-thumbnail-label">Current Thumbnail:</p>
                  <img 
                    src={formData.thumbnail} 
                    alt="Current thumbnail" 
                    className="thumbnail-preview"
                  />
                  <button 
                    type="button" 
                    onClick={removeThumbnail}
                    className="remove-thumbnail-btn"
                  >
                    Remove Thumbnail
                  </button>
                </div>
              )}
              
              {(formData.thumbnail && typeof formData.thumbnail !== 'string') && (
                <div className="file-preview">
                  <p className="new-thumbnail-label">New Thumbnail Preview:</p>
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
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;