import { useDispatch, useSelector } from 'react-redux';
import {
  selectImageHeight,
  selectImagePreview,
  selectImageWidth,
  setImageHeight,
  setImagePriview,
  setImageWidth,
} from '../../redux/slices/imageSlice';
import styles from './imageView.module.css';
import { useContext, useEffect } from 'react';
import { fabric } from 'fabric';
import { CanvasContext } from '../../contexts/canvasContext';
import useDimensions from '../../hooks/dimention';

export default function ImageView() {
  const imagePreview = useSelector(selectImagePreview);
  const { canvasRef, getCanvasAtResoution } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const { width } = useDimensions();
  const imageHeight = useSelector(selectImageHeight);
  const imageWidth = useSelector(selectImageWidth);


  /**
   * Effect to initialize the Fabric.js canvas on component mount.
   */
  useEffect(() => {
    if (canvasRef && !canvasRef.current) {
      canvasRef.current = new fabric.Canvas('canvas-mapeamento');
      canvasRef.current.setWidth(1000);
      canvasRef.current.setHeight(600);
    }
  }, []);

  return (
      <>
        <div className={styles.imageParent}>
          <canvas id="canvas-mapeamento" className={styles.baseImage} />
        </div>
      </>
  );
}
