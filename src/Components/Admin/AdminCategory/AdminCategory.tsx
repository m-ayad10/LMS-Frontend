import { FaPen } from "react-icons/fa6";
import { RiBookShelfLine, RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/html logo.webp";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { deleteCategory } from "../../../Redux/Slices/Category/CategoryThunk";

function AdminCategory() {
  const category = useSelector((state: RootState) => state.category);
  const navigate=useNavigate()
  const dispatch=useDispatch<AppDispatch>()
  return (
    <>
      <div className="category-manager-section">
        <div className="category-manage-header">
          <div className="category-manage-header-left">
            <RiBookShelfLine className="category-manage-header-icon" />
            <h3 className="category-manage-title">Categories</h3>
          </div>
          <Link to={"/admin/add-category"}>
            <button className="category-manage-add-btn">
              + Add new category
            </button>
          </Link>
        </div>
        {category.status === "loading" && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#754FFE]"></div>
          </div>
        )}
        {category.category.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">
              No categories found
            </div>
            <p className="text-gray-400 text-sm">
              Get started by creating your first category
            </p>
          </div>
        )}
        <div className="category-list">
          {category.category.map((category) => {
            return (
              <div className="category-card" key={category._id}>
                <img
                  src={category.url || ""}
                  className="category-card-thumbnail"
                  alt="Category thumbnail"
                />
                <p className="category-card-name">{category.name}</p>
                <div className="category-card-actions">
                  <button className="category-edit-btn" onClick={()=>navigate(`/admin/edit-category/${category._id}`)}>
                    <FaPen /> Edit
                  </button>
                  <button className="category-delete-btn" onClick={()=>dispatch(deleteCategory(category._id))}>
                    <RiDeleteBin6Line /> Delete
                  </button>
                </div>
              </div>
            );
          })}

          {/* <div className="category-card">
            <img
              src={logo}
              className="category-card-thumbnail"
              alt="Category thumbnail"
            />
            <p className="category-card-name">Mobile Development</p>
            <div className="category-card-actions">
              <button className="category-edit-btn">
                <FaPen /> Edit
              </button>
              <button className="category-delete-btn">
                <RiDeleteBin6Line /> Delete
              </button>
            </div>
          </div> */}

        </div>
      </div>
    </>
  );
}

export default AdminCategory;
