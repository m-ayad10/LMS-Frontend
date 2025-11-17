import React, { useState, useRef } from 'react';
import { FaCheck, FaPlay, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './style.css';
import './responsive.css'

interface Lesson {
  public_id: string;
  sectionName: string;
  url: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}

interface CourseData {
  courseId: {
    _id: string;
    title: string;
    curiculum: Lesson[];
    totalLessons: number;
  };
  completedLesson: string[];
  progress: number;
}

interface CourseWatchProps {
  courseData: CourseData;
  onLessonComplete: (lessonId: string) => void;
  onAddReview: (rating: number, text: string) => void;
  nextCourse?: {
    id: string;
    title: string;
  };
}

const CourseWatch: React.FC<CourseWatchProps> = ({
  courseData,
  onLessonComplete,
  onAddReview,
  nextCourse
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [showMobileContent, setShowMobileContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const lessons = courseData.courseId.curiculum;
  const currentLesson = lessons[currentLessonIndex];

  // Auto-mark as completed when video ends
  const handleVideoEnd = () => {
    const currentLessonId = currentLesson.public_id;
    if (!courseData.completedLesson.includes(currentLessonId)) {
      onLessonComplete(currentLessonId);
    }
    
    // Auto-advance to next lesson if available
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleLessonClick = (index: number) => {
    setCurrentLessonIndex(index);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.text.trim()) {
      onAddReview(newReview.rating, newReview.text);
      setNewReview({ rating: 0, text: '' });
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return courseData.completedLesson.includes(lessonId);
  };

  // Progress calculation
  const progressPercentage = (courseData.completedLesson.length / lessons.length) * 100;

  return (
    <div className="course-watch-container">
      <div className="course-main-layout">
        {/* Video Section */}
        <div className="course-video-section">
          <div className="course-video-container">
            <video
              ref={videoRef}
              className="course-video-player"
              controls
              onEnded={handleVideoEnd}
              key={currentLesson.url}
            >
              <source src={currentLesson.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <h1 className="course-video-title">{currentLesson.sectionName}</h1>
          
          
          {/* Mobile Content Toggle */}
          <div className="mobile-content-toggle md:hidden" onClick={() => setShowMobileContent(!showMobileContent)}>
            <h3>Course Content</h3>
            {showMobileContent ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className={`course-content-sidebar ${!showMobileContent ? 'mobile-content-hidden' : ''}`}>
          <h2 className="course-content-header">Course Content</h2>
          {lessons.map((lesson, index) => (
            <div
              key={lesson.public_id}
              className={`lesson-item ${
                index === currentLessonIndex ? 'lesson-item-current' : ''
              } ${
                isLessonCompleted(lesson.public_id) ? 'lesson-item-completed' : ''
              }`}
              onClick={() => handleLessonClick(index)}
            >
              <div className="lesson-check">
                {isLessonCompleted(lesson.public_id) ? (
                  <FaCheck />
                ) : (
                  <FaPlay />
                )}
              </div>
              <span className="lesson-number">{index + 1}.</span>
              <span className="lesson-title">{lesson.sectionName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="course-reviews-section">
        <h2 className="reviews-header">Course Reviews</h2>
        
        {/* Review Form */}
        <div className="review-form">
          <h3 className="review-form-title">Add Your Review</h3>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= newReview.rating ? 'active' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                <FaStar />
              </span>
            ))}
          </div>
          <textarea
            className="review-textarea"
            placeholder="Share your experience with this course..."
            value={newReview.text}
            onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
          />
          <button className="submit-review-btn" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review.userName}</span>
                <div className="review-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} className={i < review.rating ? 'active' : ''} />
                  ))}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="course-navigation">
          <div></div> {/* Spacer */}
          {nextCourse && (
            <a href={`/course/${nextCourse.id}`} className="next-course-btn">
              Next Course: {nextCourse.title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseWatch;