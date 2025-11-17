import "./style.css";
import "./responsive.css";
import { Box, Modal } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import React, { useState } from "react";

type CourseFilterLevel = "All" | "Beginner" | "Intermediate" | "Advanced";

type Modal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleApplyFilter: (level: CourseFilterLevel, categories: string[]) => void;
};

function SearchModal({ open, setOpen ,handleApplyFilter}: Modal) {
  const categories = useSelector((state: RootState) => state.category);
  const [selectedCategories,setSelectedCategories]=useState<string[]>([])
  const [level, setLevel] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 290,
    maxHeight: "80vh",
    overflowY: "auto",
    width: "60%",
    maxWidth: 420,
    bgcolor: "background.paper",
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1,
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      return prev.includes(category)
        ? prev.filter((v) => v != category)
        : [...prev, category];
    });

  }

  const handleApply=()=>{
    setOpen(false)
    handleApplyFilter(level,selectedCategories)
  }

  return (
    <>
      <Modal
        open={open}
        // onClose={handleClose}
        className="filter-modal-overlay"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="filter-modal-header">
            <ImCross
              className="filter-modal-close-icon"
              onClick={handleClose}
            />
          </div>
          <div className="filter-modal-body">
            {categories.status === "succeeded" && (
              <>
                <div className="filter-category-group">
                  <h5 className="filter-group-title">Category</h5>
                  <div className="filter-category-group-items">
                    {categories.category.map((value) => (
                      <div
                        className="filter-category-group-option"
                        key={value._id}
                      >
                        <input
                          type="checkbox"
                          className="filter-checkbox"
                          checked={selectedCategories.includes(value.name)}
                          onChange={() => handleCategoryChange(value.name)}
                        />
                        <p className="filter-group-label">{value.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="filter-group">
              <h5 className="filter-group-title">Level</h5>

              <div className="filter-group-option">
                <input
                  type="radio"
                  name="level"
                  className="filter-group-radio"
                  checked={level === "All"}
                  onChange={() => setLevel("All")}
                />
                <p className="filter-group-label">All</p>
              </div>

              <div className="filter-group-option">
                <input
                  type="radio"
                  name="level"
                  className="filter-group-radio"
                  checked={level === "Beginner"}
                  onChange={() => setLevel("Beginner")}
                />
                <p className="filter-group-label">Beginner</p>
              </div>

              <div className="filter-group-option">
                <input
                  type="radio"
                  name="level"
                  className="filter-group-radio"
                  checked={level === "Intermediate"}
                  onChange={() => setLevel("Intermediate")}
                />
                <p className="filter-group-label">Intermediate</p>
              </div>

              <div className="filter-group-option">
                <input
                  type="radio"
                  name="level"
                  className="filter-group-radio"
                  checked={level === "Advanced"}
                  onChange={() => setLevel("Advanced")}
                />
                <p className="filter-group-label">Advanced</p>
              </div>
            </div>

            <div className="filter-group">
              <h5 className="filter-group-title">Ratings</h5>
              <div className="filter-group-option">
                <input
                  className="filter-group-radio"
                  name="rating"
                  type="radio"
                />
                <p className="filter-group-label">High to low</p>
              </div>
              <div className="filter-group-option">
                <input
                  className="filter-group-radio"
                  name="rating"
                  type="radio"
                />
                <p className="filter-group-label">High to low</p>
              </div>
            </div>
          </div>
          <div className="filter-modal-action">
            <button className="filter-apply-btn" onClick={handleApply}>Apply Filters</button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default SearchModal;
