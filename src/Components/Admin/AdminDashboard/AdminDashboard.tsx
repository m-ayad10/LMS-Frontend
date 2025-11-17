import { FaBook, FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
// import { LineChart } from "@mui/x-charts/LineChart";

import { FaUserFriends } from "react-icons/fa";
import { memo, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";



function LineChartComponent() {
 const instructorDashboard = useSelector(
     (state: RootState) => state.adminDashboard
   );
 
   const monthlyRevenue = useMemo(() => {
     const monthMap = new Map<string, number>(); 
 
     instructorDashboard.enrolled.forEach((enroll) => {
       const date = new Date(enroll.createdAt);
       const monthName = date.toLocaleString("default", { month: "short" }); // e.g. "Jan"
       const price = enroll.courseId?.price || 0;
 
       monthMap.set(monthName, (monthMap.get(monthName) || 0) + price*30/100);
     });
 
     const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
     const sortedData = monthOrder
       .filter((m) => monthMap.has(m))
       .map((m) => ({
         month: m,
         revenue: monthMap.get(m) || 0,
       }));
 
     return sortedData;
   }, [instructorDashboard.enrolled]);
 
   return (
    <>
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
    </>
  );
}

function AdminHeader(){
  const admin=useSelector((state:RootState)=>state.user)
  const courses=useSelector((state:RootState)=>state.courses)
  const adminDashboard=useSelector((state:RootState)=>state.adminDashboard)
    return(
        <>
          <div className="dashboard-header">
          <div className="dashboard-title">
            <MdOutlineDashboard className="dashboard-title-icon" /> Dashboard
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="dashboard-stat-item">
            <FaBook className="dashboard-stat-icon" />
            <span className="dashboard-stat-value">{courses?.courses?.length} </span>
            <span className="dashboard-stat-label"> Number of courses</span>
          </div>
          <div className="dashboard-stat-item">
            <FaBook className="dashboard-stat-icon" />
            <span className="dashboard-stat-value">{adminDashboard?.instructors?.length}</span>
            <span className="dashboard-stat-label"> Number of Instructors</span>
          </div>
          <div className="dashboard-stat-item">
            <FaUserFriends className="dashboard-stat-icon" />
            <span className="dashboard-stat-value">{adminDashboard?.students?.length} </span>
            <span className="dashboard-stat-label"> Number of Students</span>
          </div>
          <div className="dashboard-stat-item">
            <FaIndianRupeeSign className="dashboard-stat-icon" />
            <span className="dashboard-stat-value">{admin?.user?.revenue} </span>
            <span className="dashboard-stat-label">Total revenue</span>
          </div>
        </div>
        </>
    )
}

function AdminDashboardComponent() {
  const courses=useSelector((state:RootState)=>state.courses)
  return (
    <>
      <div className="dashboard-section">
      <AdminHeader/>
        <div className="dashborad-charts-section">
          <div className="dashboard-revenue-chart-section">
            <h4 className="dashboard-chart-title">Admin revenue</h4>
            <LineChartComponent />
          </div>
          <div className="dashboard-piechart-section">
            <h4 className="dashboard-chart-title">Total no of students per course</h4>
            <PieChart className="dashboard-pie-chart"
              series={[
                {
                  data: courses?.courses?.map((course) => {
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

const AdminDashboard = memo(AdminDashboardComponent);
export default AdminDashboard;
