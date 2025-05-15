import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { Modal } from "@mui/material";
import styles from "./FormCart.module.css";
import { sendOrder } from "../../redux/thunks";
import closeIcon from "../../assets/icons/closeIcon.svg";

function FormCart({ orderData, form = {}, onInputChange }) {
  const { register, handleSubmit, formState } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const { errors } = formState;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(
        sendOrder({
          name: data.name,
          phone: data.phone,
          email: data.email,
          products: orderData.products,
        })
      );
  
      if (sendOrder.fulfilled.match(resultAction)) {
        setIsSubmitted(true);
        handlePlaceOrder();
      } else {
        setIsError(true);
        throw new Error(resultAction.payload || "Failed to place order");
      }
    } catch (error) {
      setIsError(true);
      console.error("Error submitting form", error);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setIsModalOpen(false);
    if (isSubmitted) {
      setTimeout(() => {
        dispatch(clearCart());
      }, 1000);
    }
    setIsError(false);
  };

  function handlePlaceOrder() {
    setIsModalOpen(true);
  }

  return (
    <div className={styles.Form_form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          style={{
            borderColor: errors.name ? "red" : "",
          }}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          className={styles.inputField}
          placeholder="Name"
          value={form?.name || ""}
          onChange={onInputChange}
          name="name"
        />
        {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

        <input
          style={{
            borderColor: errors.phone ? "red" : "",
          }}
          {...register("phone", {
            required: "Phone is required",
            minLength: {
              value: 10,
              message: "Phone must be at least 10 characters",
            },
          })}
          className={styles.inputField}
          placeholder="Phone number"
          value={form?.phone || ""}
          onChange={onInputChange}
          name="phone"
        />
        {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>}

        <input
          style={{
            borderColor: errors.email ? "red" : "",
          }}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Entered value does not match email format",
            },
          })}
          className={styles.inputField}
          placeholder="Email"
          value={form?.email || ""}
          onChange={onInputChange}
          name="email"
        />
        {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}

        <button
          type="submit"
          className={isSubmitted ? styles.submitedButtondButton : styles.submitButton}
          disabled={isLoading}
        >
          {isSubmitted ? "The Order is Placed" : isLoading ? "Submitting..." : "Order"}
        </button>
      </form>

      <Modal open={isModalOpen} onClose={handleClose}>
        <div className={styles.modalContent}>
          {isError ? (
            <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
              <h2>Sorry</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p>We encountered an error while processing your order.</p>
                <p>We are working on fixing it.</p>
              </div>
            </div>
          ) : (
            <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
              <h2>Congratulations!</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p>Your order has been successfully placed on the website.</p>
                <p>A manager will contact you shortly to confirm your order.</p>
              </div>
            </div>
          )}
          <div style={{ alignSelf: "start" }}>
            <button onClick={handleClose} className={styles.closeButton}><img src={closeIcon} alt="close" /></button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FormCart;
