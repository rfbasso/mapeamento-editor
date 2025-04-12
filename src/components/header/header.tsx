import Clear from '../clear/clear';
import ImageSaver from '../imageSaver/imageSaver';
import styles from './header.module.css';

/**
 * Header component for the image app editor.
 *
 * This component renders the header of the website, which consists of:
 * - Title
 * - One button for interacting with the canvas:
 *   - Clear the canvas.
 *
 * @returns A React component that renders the header section
 */
export default function Header() {

  return (
    <div className={styles.header}>
      {/* Logo and application name */}
      <div className={styles.logoText}>
          {/* <img src="logo.png" className={styles.image} alt="Logo" /> */}
        <div className={styles.name}>Image Editor</div>
      </div>

      {/* Buttons for saving and clearing the canvas */}
      <div className={styles.updown}>
        <ImageSaver />
        <Clear />
      </div>
    </div>
  );
}
