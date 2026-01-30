import styles from './ProfileCard.module.css';

function ProfileCard(){
    return(
        <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
                <div className={styles.profileImage}>
                    <img src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                </div>
            </div>
                <div className={styles.cardBody}>
                    <h2 className={styles.name}>John Doe</h2>
                    <p className={styles.title}>Backend Developer</p>


                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>1.1k</span>
                            <span className={styles.statLabel}>Followers</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>500</span>
                            <span className={styles.statLabel}>Following</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>75</span>
                            <span className={styles.statLabel}>projects</span>
                        </div>
                    </div>
                <p className={styles.Bio}>
                    Passionate developer with a love for building scalable backend systems.
                    love working with databases and APIs.
                </p>
                <div className={styles.actions}>
                    <button className={styles.primaryButton}>Follow</button>
                    <button className={styles.secondaryButton}>Message</button>
                </div>
            </div>
        </div>
       
    );
}


export default ProfileCard; 