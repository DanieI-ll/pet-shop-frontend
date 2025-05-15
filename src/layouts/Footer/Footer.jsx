import instagram from "../../assets/social_networks/instagram.svg";
import whatsapp from "../../assets/social_networks/whatsapp.svg";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h4 className={styles.footer_title}>Contact</h4>

      <div className={styles.info_box_container}>
        <div className={styles.info_box} style={{ height: "150px" }}>
          <div className={styles.info_title}>Phone</div>
          <div className={styles.info_content}>+49 30 915-88492</div>
        </div>

        <div className={styles.info_box} style={{ height: "150px" }}>
          <div className={styles.info_title}>Socials</div>
          <div className={styles.social_icons}>
            <a href="https://www.instagram.com/">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.whatsapp.com/">
              <img src={whatsapp} alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className={styles.info_box} style={{ height: "194px" }}>
          <div className={styles.info_title}>Address</div>
          <div className={styles.info_content}>
            Wallstraße 9-13, 10179 Berlin, Deutschland
          </div>
        </div>

        <div className={styles.info_box} style={{ height: "194px" }}>
          <div className={styles.info_title}>Working Hours</div>
          <div className={styles.info_content}>24 hours a day</div>
        </div>
      </div>

      <iframe
        className={styles.map}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7980541597695!2d13.411708115915275!3d52.51418307981239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c9e098c6d1%3A0x421b1f5741d50a0!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1641229612815!5m2!1sen!2sus"
        allowFullScreen
        loading="lazy"
        title="Google Maps Location"
      ></iframe>
    </footer>
  );
}
