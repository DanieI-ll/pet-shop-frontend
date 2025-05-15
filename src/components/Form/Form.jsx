import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [buttonText, setButtonText] = useState("Get a discount");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3333/sale/send", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setShowAlert(true);
      setButtonText("Request Submitted");
      setTimeout(() => {
        setShowAlert(false);
        setButtonText("Get a discount");
      }, 5000);
      reset();
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          {/* <label htmlFor="name">Name</label> */}
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={errors.name ? styles.inputError : styles.input}
            placeholder="Name"
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          {/* <label htmlFor="phone">Phone</label> */}
          <input
            id="phone"
            type="text"
            {...register("phone", {
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Phone must be at least 10 characters",
              },
            })}
            className={errors.phone ? styles.inputError : styles.input}
            placeholder="Phone number"
          />
          {errors.phone && (
            <p className={styles.errorText}>{errors.phone.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          {/* <label htmlFor="email">Email</label> */}
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            className={errors.email ? styles.inputError : styles.input}
            placeholder="Email"
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </form>

      {showAlert && (
        <div className={styles.alert}>Form submitted successfully!</div>
      )}
    </>
  );
}