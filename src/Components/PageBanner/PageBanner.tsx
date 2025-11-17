import { IoIosArrowForward, IoMdHome } from "react-icons/io"
import './style.css'

function PageBanner(){
    return(
        <>
        <div className="page-banner-section">
            <div className="breadcrumb">
                <IoMdHome className="breadcumb-icon"/> Home <IoIosArrowForward className="breadcumb-icon"/> Courses
            </div>
            <h2 className="banner-title">Courses</h2>
        </div>
        </>
    )
}
export default PageBanner