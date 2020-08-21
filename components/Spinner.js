import styles from './Spinner.module.scss';

export default ({ children, loading }) => (
  <div>
    <div style={{ display: loading ? 'block' : 'none' }} className={styles.spinner}>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    {children}
  </div>
)