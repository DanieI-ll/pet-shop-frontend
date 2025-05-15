import styles from "./DiscountForm.module.css";
import petsForm from "../../assets/images/petsForm.svg";
import Form from "../Form/Form";

export default function DiscountForm() {
  return (
    <div style={{ margin: "0 auto", maxWidth: "1360px", marginTop: "80px" }}>
    <div className={styles.form_container}>
      <h2>5% off on the first order</h2>
      <div className={styles.form_box}>
        <div className={styles.form_img}>
          <img src={petsForm} alt="pets" />
        </div>
        <div className={styles.form}>
        <Form />
        </div>
      </div>
    </div>
  </div>
  )
}
