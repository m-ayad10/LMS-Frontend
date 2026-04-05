import "./style.css";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import React, { useState } from "react";

type CourseFilterLevel = "All" | "Beginner" | "Intermediate" | "Advanced";

type Modal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleApplyFilter: (level: CourseFilterLevel, categories: string[]) => void;
};

const LEVELS: CourseFilterLevel[] = ["All", "Beginner", "Intermediate", "Advanced"];

function SearchModal({ open, setOpen, handleApplyFilter }: Modal) {
  const categories = useSelector((state: RootState) => state.category);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [level, setLevel] = useState<CourseFilterLevel>("All");

  const handleClose = () => setOpen(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((v) => v !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setLevel("All");
  };

  const handleApply = () => {
    setOpen(false);
    handleApplyFilter(level, selectedCategories);
  };

  if (!open) return null;

  return (
    <div className="fm-overlay" onClick={handleClose}>
      <div className="fm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="fm-header">
          <h3 className="fm-title">Filters</h3>
          <button className="fm-close" onClick={handleClose}>
            <IoClose />
          </button>
        </div>

        <div className="fm-body">
          {categories.status === "succeeded" && categories.category.length > 0 && (
            <div className="fm-section">
              <p className="fm-section-title">Category</p>
              <div className="fm-chips">
                {categories.category.map((value) => (
                  <button
                    key={value._id}
                    className={`fm-chip ${selectedCategories.includes(value.name) ? "fm-chip-active" : ""}`}
                    onClick={() => handleCategoryChange(value.name)}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="fm-section">
            <p className="fm-section-title">Level</p>
            <div className="fm-levels">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  className={`fm-level-btn ${level === l ? "fm-level-active" : ""}`}
                  onClick={() => setLevel(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fm-footer">
          <button className="fm-reset-btn" onClick={handleReset}>Reset</button>
          <button className="fm-apply-btn" onClick={handleApply}>Apply filters</button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
