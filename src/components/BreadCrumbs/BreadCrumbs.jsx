import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadCrumbs.module.css";

const BreadCrumbs = ({ items }) => {
  return (
    <div className={styles.breadCrumb_container}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className={styles.breadCrumb_separator}></div>}
            {item.isActive ? (
              <span 
                className={`${styles.breadCrumb_item} ${styles.breadCrumb_active}`}
              >
                {item.label && item.label.length <= 20
                  ? item.label
                  : `${JSON.stringify(item.label).slice(1, 28)}...`}
              </span>
            ) : (
              <Link to={item.path} className={styles.breadCrumb_item}>
                {item.label && item.label.length <= 15
                  ? item.label
                  : `${JSON.stringify(item.label).slice(1, 15)}...`}
              </Link>
            )}
          </React.Fragment>
        ))
      ) : (
        <span>No breadcrumbs available</span>
      )}
    </div>
  );
};

export default BreadCrumbs;