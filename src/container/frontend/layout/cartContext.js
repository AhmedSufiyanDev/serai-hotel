import React, { createContext, useState ,useContext,useEffect } from 'react';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import moment from 'moment'; 

export const CartContext = createContext();

export function CartProvider  ({children,props}){
  const [cartItems, setCartItems] = useState([]);
  const [checkInDateRoom, setCheckInDate] = useState(moment());
  const [checkOutDateRoom, setCheckOutDate] = useState(moment().add(1, 'day'));
  const [numOfAdultsRoom, setNumOfAdults] = useState(2);
  const [numOfChildrenRoom, setNumOfChildren] = useState(0);
  const [roomItem, setRoomItem] = useState([]);
  const [itemAdded, setItemAdded] = useState(false);
  

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item,checkInDate,checkOutDate,numOfAdults,numOfChildren) => { //not add cart item if already added 
    setCheckInDate(checkInDate)
    setCheckOutDate(checkOutDate)
    setNumOfAdults(numOfAdults)
    setNumOfChildren(numOfChildren)
    setItemAdded(false)
    if (!cartItems.some((cartItem) =>cartItem.room_category.id === item.room_category.id)){
        const cartRoom = [...cartItems, item]
        setCartItems(cartRoom);
        localStorage.setItem('cart', JSON.stringify(cartRoom));
        setRoomItem(item)
        setItemAdded(true)

      } //if cart has same item but update count
    else {
        const cartRoom = cartItems.map((cartItem) =>
        cartItem.room_category.id === item.room_category.id ? { ...cartItem, count: item.count } : cartItem);
        setCartItems(cartRoom);
        setItemAdded(false)
        localStorage.setItem('cart',JSON.stringify(cartRoom));   
    }    
  };

  const removeFromCart = (itemId) => {
    const cartRoom = cartItems.filter((item) => item.room_category.id !== itemId);
    setCartItems(cartRoom);
    localStorage.setItem('cart',JSON.stringify(cartRoom));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkInDateRoom,
        checkOutDateRoom,
        numOfChildrenRoom,
        numOfAdultsRoom,
        roomItem,
        itemAdded,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
const mapStateToProps = ({ cmsReducer }) => {
  const { loading, error, successBooking, guestData, bookingData, paymentData, successpaymentData } = cmsReducer;
  return { loading, error, successBooking, guestData, bookingData, paymentData, successpaymentData };

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {
      submitBookingData: (data) => dispatch(actions.submitBooking(data)),
      //cmsMessageHandler: () => dispatch(actions.cmsMessageHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProvider);

export function useCart() {
  
    return useContext(CartContext);
}


