// AddCoursePricing.tsx
import React, { useCallback, useContext } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { activeTabContext } from "../InstructorAddCourse/InstructorAddCourse";
import { CourseContext } from "../AddCourseForm/CourseProvider";

export default function AddCoursePricing() {
  const { setActiveTab } = useContext(activeTabContext);
  const { course, setCourse } = useContext(CourseContext);

  const setIsPaid = useCallback(
    (paid: boolean) => setCourse((c) => ({ ...c, isPaid: paid, price: paid ? c.price ?? 0 : null })),
    [setCourse]
  );

  const setPrice = useCallback(
    (val: string) =>
      setCourse((c) => ({ ...c, price: val === "" ? null : Number(val) })),
    [setCourse]
  );

  return (
    <>
      <div className="add-course-payment-type">
  <label className="add-course-label">Is Paid:</label>

  <div className="add-course-payment-option">
    <input
      type="radio"
      checked={course.isPaid === true}
      onChange={() => setIsPaid(true)}
      name="isPaid"
      id="paid"
    />
    <label className="add-course-label" htmlFor="paid">Paid</label>
  </div>

  <div className="add-course-payment-option">
    <input
      type="radio"
      checked={course.isPaid === false}
      onChange={() => setIsPaid(false)}
      name="isPaid"
      id="free"
    />
    <label className="add-course-label" htmlFor="free">Free</label>
  </div>
</div>

{course.isPaid && (
  <div className="add-course-price-input">
    <label className="add-course-label">Price</label>
    <input
      type="number"
      className="add-course-input"
      placeholder="Price"
      value={course.price ?? ""}
      onChange={(e) => setPrice(e.target.value)}
    />
  </div>
)}

      <div className="mt-4 flex justify-between">
        <button
          className="add-course-nav-btn"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("basic");
          }}
        >
          <FaArrowLeftLong className="add-course-nav-btn-icon" /> Prev
        </button>

        <button
          className="add-course-nav-btn"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("media");
          }}
        >
          Next <FaArrowRightLong className="add-course-nav-btn-icon" />
        </button>
      </div>
    </>
  );
}
