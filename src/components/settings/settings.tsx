import {
  selectFillColor,
  setFillColor,
} from '../../redux/slices/canvasSlice';
import ColorPicker from '../colorPicker/colorPicker';
import styles from './settings.module.css';

/**
 * Settings component for selecting colors, stroke sizes, and font sizes.
 *
 * This component includes color pickers for stroke color, fill color, and text color.
 * It also provides stroke size and font size picker components.
 *
 * @returns A React component for configuring drawing settings.
 */
export default function Settings() {
  return (
    <div>

      {/* Main settings section */}
      <div className={styles.setting}>
        {/* First row of settings */}
        <div className={styles.settingRow}>
          {/* Column for fill color */}
          <div className={styles.settingColumn}>
            <img src="/settings/fill.png" className={styles.icon} alt="Fill Color Icon" />
            {/* Color picker for fill color */}
            <ColorPicker setFunc={setFillColor} getFunc={selectFillColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
