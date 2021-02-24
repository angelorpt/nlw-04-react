import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}> 
      <img src="https://avatars.githubusercontent.com/u/1192083?s=460&u=38a4381efc8e3bea833141382829ccd4b9561da6&v=4" alt="Foto Perfil" />
      <div>
        <strong>Angelo Rafael</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}