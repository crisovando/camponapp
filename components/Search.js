import React from 'react';
import styles from './Search.module.scss';


function Search() {
  return (
    <section className={styles.search}>
      <h2 className={styles.h2}>Qué quieres ver hoy?</h2>
      <input id="inputSearch" type="search" placeholder="Buscar..." className={styles.input} />
    </section>
  );
}

export default Search;
