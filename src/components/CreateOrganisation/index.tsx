import Form from "./Form";

import styles from "./styles.module.css";

export default function CreateOrganisation(): JSX.Element {
  return (
    <div className={styles.orgWrapper}>
      <div className={styles.container}>
        <section className={styles.widget}>
          <div>
            <header>
              <h2 className={styles.h2}>Create a new organisation</h2>
            </header>
            <Form />
          </div>
        </section>
      </div>
    </div>
  );
}
