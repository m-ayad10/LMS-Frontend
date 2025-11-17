export const dummyCourseData = {
  courseId: {
    _id: "68f9d404bb865d05ab556dfc",
    title: "JavaScript Mastery",
    curiculum: [
      {
        public_id: "course_video_intro_1",
        sectionName: "Introduction to JavaScript",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_datatypes_2",
        sectionName: "Data Types and Variables",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_functions_3",
        sectionName: "Functions and Scope",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_objects_4",
        sectionName: "Objects and Arrays",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_dom_5",
        sectionName: "DOM Manipulation",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_async_6",
        sectionName: "Async JavaScript",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_es6_7",
        sectionName: "ES6+ Features",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        public_id: "course_video_projects_8",
        sectionName: "Final Project",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      }
    ],
    totalLessons: 8,
    category: "Programming language",
    description: "Learn JavaScript from basic to advanced concepts",
    instructorId: "68de27b192ed5b966f959cc5",
    isPaid: true,
    level: "Beginner",
    previewVideo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    price: 2000,
    revenue: 4000,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    createdAt: "2025-10-23T07:06:44.713Z",
    updatedAt: "2025-10-27T07:48:38.668Z",
    __v: 0
  },
  completedLesson: [
    "course_video_intro_1",
    "course_video_datatypes_2",
    "course_video_functions_3"
  ],
  progress: 37.5, // 3 out of 8 lessons completed
  studentId: "68f8df74a41a926c043fe9e2",
  createdAt: "2025-10-27T07:48:38.668Z",
  updatedAt: "2025-10-27T07:48:38.668Z",
  __v: 0,
  _id: "68ff23d663f4e4f86b6717ca"
};

export const dummyReviews = [
  {
    id: "review_1",
    userName: "Alice Johnson",
    rating: 5,
    text: "This course completely changed my understanding of JavaScript. The instructor explains complex concepts in a very simple way. Highly recommended for beginners!",
    date: "2025-10-20"
  },
  {
    id: "review_2",
    userName: "Bob Smith",
    rating: 4,
    text: "Great course content and well structured. The projects helped me apply what I learned. Would love to see more advanced topics covered.",
    date: "2025-10-18"
  },
  {
    id: "review_3",
    userName: "Carol Davis",
    rating: 5,
    text: "As a complete beginner, I found this course incredibly helpful. The pace was perfect and the examples were relevant to real-world scenarios.",
    date: "2025-10-15"
  },
  {
    id: "review_4",
    userName: "David Wilson",
    rating: 3,
    text: "Good course overall, but some sections could use more detailed explanations. The DOM manipulation part was particularly challenging without more examples.",
    date: "2025-10-12"
  },
  {
    id: "review_5",
    userName: "Emma Brown",
    rating: 5,
    text: "Excellent course! The way async JavaScript was explained finally made it click for me. The instructor's teaching style is very engaging.",
    date: "2025-10-10"
  },
  {
    id: "review_6",
    userName: "Frank Miller",
    rating: 4,
    text: "Solid foundation in JavaScript. The course materials are well organized and the video quality is great. Looking forward to the advanced course!",
    date: "2025-10-08"
  }
];

export const dummyNextCourse = {
  id: "68f9d404bb865d05ab556dfd",
  title: "Advanced JavaScript Patterns"
};

// Mock functions for the component props
export const mockOnLessonComplete = (lessonId: string) => {
  console.log(`Lesson completed: ${lessonId}`);
  // In real app, this would make an API call to update progress
};

export const mockOnAddReview = (rating: number, text: string) => {
  console.log(`New review - Rating: ${rating}, Text: ${text}`);
  // In real app, this would make an API call to submit review
};