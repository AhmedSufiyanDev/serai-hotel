import React, { useEffect, useState, useContext } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import Scrollbars from 'react-custom-scrollbars';
import { cartImage1, cartImage2, deleteIcon } from "../../../assets/images/images";
import { Zoom, Slide } from 'react-reveal';
import { useCart } from './cartContext'
import { currency } from '../../../environment';
import moment from 'moment'; 
// const cartDetail = [
//     { image: cartImage2, title: 'Super Deluxe Family Suite', amount: '5,000' },
//     { image: cartImage1, title: 'Two-Bedrooms w/ Parking', amount: '5,400' },
//     { image: cartImage1, title: 'Two-Bedrooms w/ Parking', amount: '5,400' },
//     { image: cartImage1, title: 'Two-Bedrooms w/ Parking', amount: '5,400' },
//   ]

function CartModal(props) {
  const {itemAddedCart} = props
  const { cartItems, checkInDateRoom, checkOutDateRoom, numOfAdultsRoom, numOfChildrenRoom, removeFromCart,roomItem,itemAdded,clearCart } = useCart();
  const [locationQuery, setLocationQuery] = useState('Islamabad');
  const [userID, setUserID] = useState();
  // const queryParams = {
  //   address: locationQuery, 
  //   fromDate: checkInDateRoom, 
  //   toDate: checkOutDateRoom, 
  //   numOfAdults: numOfAdultsRoom, 
  //   numOfChildren: numOfChildrenRoom
  // };
  // const searchString = new URLSearchParams(queryParams).toString();

  const deleteItem = (id) => {
    removeFromCart(id)
  }
  const checkout = () => {
    props.history.push({ pathname: `/booking-detail`});
  }

  // const formatPrice = (amount) => {
  //   const formattedAmount = (Number(amount)).toLocaleString('en-PK', {
  //     style: 'currency',
  //     currency:currency,
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   });

  //   return formattedAmount
  // }

  useEffect(() => {
    const user = localStorage.getItem('guest')
    const userObject = JSON.parse(user);
    if (user) {
        const userID = userObject.UserID
        console.log("userID is", userID)
        setUserID(userID)
    }

}, []);

  useEffect(() => {
    if(itemAddedCart===undefined && itemAdded){
      let data ={}
        data.Name = ''
        data.HotelID = 1
        data.SessionID = localStorage.getItem('sessionId')
        if (userID) {
            data.UserID = userID
        }
        data.CheckInDate = checkInDateRoom.format("YYYY-MM-D")
        data.CheckOutDate = checkOutDateRoom.format("YYYY-MM-D")
        data.adult = numOfAdultsRoom
        data.children = numOfChildrenRoom
        data.IsPaid = 2
        data.TaxInclude = 1
        data.RoomCatID = roomItem?.RoomCatID ? roomItem?.RoomCatID : roomItem?.room_category.id
        data.IsCms = 0
        data.room = JSON.stringify(
          [{ RoomCatID: roomItem?.RoomCatID ? roomItem?.RoomCatID : roomItem?.room_category.id, NoOfRooms: roomItem?.count, Rate: roomItem?.Price ? roomItem.Price : roomItem.room_category.Price }]);
        data.AddToCart = 1
        // console.log("no of rooms are", NoOfRooms)
        let fd = new FormData();
        for (let item in data)
            fd.append(item, data[item]);

        props.submitBookingData(fd)

    }
  }, []);


  console.log("cartItem is", cartItems)
  return (
    <div>
      <Slide top>
        <div className="cart-div">
          {cartItems.length == 0 ?
            <div class="norooms-cart">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="109" height="108" viewBox="0 0 109 108" fill="none"> <g filter="url(#filter0_d_2763_2947)"> <circle cx="54.5776" cy="53" r="50" fill="white" /> </g> <path fill-rule="evenodd" clip-rule="evenodd" d="M43.6687 36.6364V33H46.6687V36.6364H62.1533V33H65.1533V36.6364H67.3049C71.3215 36.6364 74.5776 39.8925 74.5776 43.9091V65.7273C74.5776 69.7439 71.3215 73 67.3049 73H41.8504C37.8337 73 34.5776 69.7439 34.5776 65.7273V43.9091C34.5776 39.8925 37.8337 36.6364 41.8504 36.6364H43.6687ZM43.6687 39.3637H41.8504C39.34 39.3637 37.3049 41.3987 37.3049 43.9091V48.4545H71.8503V43.9091C71.8503 41.3987 69.8153 39.3637 67.3049 39.3637H65.1533V43.9091H62.1533V39.3637H46.6687V43.9091H43.6687V39.3637ZM71.8503 65.7273V51.1818H37.3049V65.7273C37.3049 68.2377 39.34 70.2727 41.8504 70.2727H67.3049C69.8153 70.2727 71.8503 68.2377 71.8503 65.7273Z" fill="#978667" /> <defs> <filter id="filter0_d_2763_2947" x="0.577637" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="1" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2763_2947" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2763_2947" result="shape" /> </filter> </defs></svg>
              </div>
              <h5>  You don't have any bookings<br />
                In Your Cart Yet.</h5>
              <div>
                <button onClick={() => props.history.push({pathname:`/home/booking/booking-list`})}>Book Now</button>
              </div>
            </div> :
            <div>
              <h2 className="heading-title">Complete your booking</h2>
              <div>
                <Scrollbars autoHide style={{
                  height: 250,
                  borderRadius: 10
                }}
                >
                  {cartItems?.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="cart-modal">
                        <img src={item.category_gallery[0].image} alt={item.title} className="img-responsive cart-image-style" />
                        <div>
                          <h2 className="hotel-title">{item.room_category.Name}</h2>
                          <div className='d-flex'>
                            <h2 className="digit-color"><span className="rs-style"></span> {item.room_category.Price} </h2>
                            <span className='cart-count'>X {item.count}</span>
                          </div>
                        </div>
                        <div>
                        </div>
                        <div className="delete-icon-rel" onClick={() => deleteItem(item.room_category.id)}>
                          <img src={deleteIcon} />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </Scrollbars>
              </div>
              {/* <button className="view-cart-btn">VIEW CART</button> */}
              <button className="checkout-btn" onClick={checkout}>VIEW CART & CHECKOUT</button>
            </div>
          }
        </div>
      </Slide>
    </div>
  );
}

//what is needed at start
const mapStateToProps = ({ authReducer }) => {

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    submitBookingData: (data) => dispatch(actions.submitBooking(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartModal));