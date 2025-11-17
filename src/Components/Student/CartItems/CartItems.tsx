import { MdCurrencyRupee } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./style.css";
import "./responsive.css";
// import image from "../../../assets/course_thumbnail_default-new_121741669230.jpg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { Fragment } from "react/jsx-runtime";
import { removeFromCart } from "../../../Redux/Slices/Cart/CartThunk";
import type React from "react";
import { enrollFromCart } from "../../../Redux/Slices/Enrolled/EnrolledThunk";
import { useNavigate } from "react-router-dom";
import { server_url } from "../../../Hooks/customHook";
import toast from "react-hot-toast";

function CartItems() {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRemoveCart = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    dispatch(removeFromCart(courseId));
  };
  // const handleCourseEnroll = () => {
  //   dispatch(enrollFromCart());
  // };
  const handlePayment = async (): Promise<void> => {
    try {

      const orderResponse = await fetch(
        `${server_url}/enrollment/create-razorpay-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            totalPrice: cart.cart?.totalPrice,
          }),
        }
      );

      const orderData: {
        status: boolean;
        message?: string;
        amount: number;
        currency: string;
        key: string;
        razorpayOrderId: string;
      } = await orderResponse.json();

      if (!orderData.status) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const { amount, currency, key, razorpayOrderId } = orderData;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        order_id: razorpayOrderId,
        name: "Academy",
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            const verifyResponse = await fetch(
              `${server_url}/enrollment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                }),
              }
            );

            const verifyData: { status: boolean; message?: string } =
              await verifyResponse.json();

            if (verifyData.status) {
              dispatch(enrollFromCart())
            } else {
              toast.error("Payment verification failed: " + verifyData.message);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.user?.firstName + " " + user?.user?.lastName,
          email: user?.user?.email,
        },
        theme: {
          color: "#754FFE",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage =
        error.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="cart-section">
        <h3 className="cart-title">Your Cart Items</h3>

        <div className="cart-content">
          <div className="cart-item-lists">
            <div className="cart-items-wrapper">
              <div className="cart-header">
                <p className="cart-header-item">Items</p>
                <p className="cart-header-price">Price</p>
              </div>
            </div>

            <hr className="cart-divider" />
            <div className="cart-items-scroll">
              {cart.status === "loading" ? (
                <div className="text-center text-gray-400 mt-10 text-lg font-medium animate-pulse">
                  Loading your cart...
                </div>
              ) : cart.cart?.courses?.length === 0 ? (
                <div className="text-center text-gray-500 mt-10 text-lg font-medium">
                  🛒 No items in your cart yet.
                  <p className="text-sm text-gray-400 mt-1">
                    Browse courses and add them to your cart.
                  </p>
                </div>
              ) : null}
              {cart.cart?.courses?.map((item) => {
                return (
                  <Fragment key={item.courseId._id}>
                    <div
                      className="cart-item-row"
                      onClick={() => navigate(`/detail/${item.courseId._id}`)}
                    >
                      <div className="cart-item-details">
                        <div className="cart-item-image-wrapper">
                          <img
                            src={item?.courseId?.thumbnail}
                            className="cart-item-image"
                            alt="thumbnail"
                          />
                        </div>
                        <div className="cart-item-info">
                          <h5 className="cart-item-title">
                            {item?.courseId.title}
                          </h5>
                          <h5 className="cart-item-instructor">
                            {item.courseId?.instructorId
                              ? `${item.courseId.instructorId.firstName} ${item.courseId.instructorId.lastName}`
                              : "Instructor not found"}
                          </h5>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <p className="cart-item-price">
                          <MdCurrencyRupee className="cart-price-icon" />{" "}
                          {item?.courseId?.price}
                        </p>
                        <RiDeleteBin6Line
                          className="cart-remove-icon"
                          onClick={(e) =>
                            handleRemoveCart(e, item.courseId._id)
                          }
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className="cart-summary">
            <h6 className="cart-summary-title">Total</h6>

            <div className="cart-summary-row">
              <p className="cart-summary-label">Sub total</p>
              <p className="cart-summary-value">
                <MdCurrencyRupee className="cart-price-icon" />{" "}
                {cart.cart?.totalPrice}
              </p>
            </div>

            <div className="cart-summary-row">
              <p className="cart-summary-label">Discount</p>
              <p className="cart-summary-value">
                <MdCurrencyRupee className="cart-price-icon" />
                {0}
              </p>
            </div>

            <div className="cart-summary-row">
              <p className="cart-summary-label">Total</p>
              <p className="cart-summary-value">
                <MdCurrencyRupee className="cart-price-icon" />
                {cart.cart?.totalPrice}
              </p>
            </div>
            {/* <div className="cart-coupon-wrapper">
              <input
                type="text"
                className="cart-coupon-input"
                placeholder="Apply coupon"
              />
              <button className="cart-coupon-apply-btn">Apply</button>
            </div> */}
            <button className="cart-checkout-btn " onClick={handlePayment}>
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItems;
