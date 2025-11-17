import { FaBook, FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
// import { LineChart } from "@mui/x-charts/LineChart";
import "./style.css";
import "./responsive.css";
import { FaUserFriends } from "react-icons/fa";
import { memo, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";


function LineChartComponent() {
  const instructorDashboard = useSelector(
    (state: RootState) => state.instructorDashboard
  );

  const monthlyRevenue = useMemo(() => {
  if (!instructorDashboard.enrolled?.length) return [];

  const monthMap = new Map<string, number>();

  for (const enroll of instructorDashboard.enrolled) {
    if (!enroll?.createdAt || !enroll?.courseId?.price) continue;

    const date = new Date(enroll.createdAt);
    const monthName = date.toLocaleString("default", { month: "short" }); 
    const revenue = (enroll.courseId.price * 70) / 100; 
    monthMap.set(monthName, (monthMap.get(monthName) || 0) + revenue);
  }

  const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return monthOrder.map((m) => ({
    month: m,
    revenue: monthMap.get(m) || 0,
  }));
}, [instructorDashboard.enrolled]);

  return (
    <LineChart
      className="dashboard-revenue-chart"
      xAxis={[
        {
          data: monthlyRevenue.map((d) => d.month),
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: monthlyRevenue.map((d) => d.revenue),
          label: "Monthly Revenue",
        },
      ]}
    />
  );
}

function InstructorHeader() {
  const instructorDashboard = useSelector(
    (state: RootState) => state.instructorDashboard
  );
  const instructor = useSelector((state: RootState) => state.user.user);
  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <MdOutlineDashboard className="dashboard-title-icon" /> Dashboard
        </div>
      </div>
      <div className="dashboard-stats">
        <div className="dashboard-stat-item">
          <FaBook className="dashboard-stat-icon" />
          <span className="dashboard-stat-value">
            {instructorDashboard.courses.length}
          </span>
          <span className="dashboard-stat-label"> Number of courses</span>
        </div>
        {/* <div className="dashboard-stat-item">
          <FaBook className="dashboard-stat-icon" />
          <span className="dashboard-stat-value">4 </span>
          <span className="dashboard-stat-label"> Number of courses</span>
        </div> */}
        <div className="dashboard-stat-item">
            <FaUserFriends className="dashboard-stat-icon" />
            <span className="dashboard-stat-value">{instructorDashboard.totalStudents} </span>
            <span className="dashboard-stat-label"> Number of Students</span>
          </div>
        <div className="dashboard-stat-item">
          <FaIndianRupeeSign className="dashboard-stat-icon" />
          <span className="dashboard-stat-value">
            {instructor.revenue || 0}{" "}
          </span>
          <span className="dashboard-stat-label">Total revenue</span>
        </div>
      </div>
    </>
  );
}

function InstructorDashboardComponent() {
  const instructorDashboard = useSelector(
    (state: RootState) => state.instructorDashboard
  );
  return (
    <>
      <div className="dashboard-section">
        <InstructorHeader />
        <div className="dashborad-charts-section">
          <div className="dashboard-revenue-chart-section">
            <h4 className="dashboard-chart-title">Instructor revenue</h4>
            <LineChartComponent />
          </div>
          <div className="dashboard-piechart-section">
            <h4 className="dashboard-chart-title">
              Total no of students per course
            </h4>
            <PieChart
              className="dashboard-pie-chart"
              series={[
                {
                  data: instructorDashboard?.courses?.map((course) => {
                    return {
                      id: course._id || 0,
                      value: course.totalStudents || 0,
                      label: course.title || "Untitled course",
                    };
                  }),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const InstructorDashboard = memo(InstructorDashboardComponent);
export default InstructorDashboard;
