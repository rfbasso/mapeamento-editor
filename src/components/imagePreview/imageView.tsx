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
  const imageUrl = '../floorplan.jpg';
  const maxWidth = 1000;
  const maxHeight = 600;
  const imagePreview = useSelector(selectImagePreview);
  const { canvasRef, getCanvasAtResoution } = useContext(CanvasContext);
  const dispatch = useDispatch();
  const { width } = useDimensions();
  const imageHeight = useSelector(selectImageHeight);
  const imageWidth = useSelector(selectImageWidth);

  const toDataURL = (urlImage:string, callbackFunction: (dataUrl: string)=>any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var base_image = new Image();
    base_image.src = urlImage;
    base_image.onload = function() {
      canvas.width = base_image.width;
      canvas.height = base_image.height;

      ctx?.drawImage(base_image, 0, 0);

      callbackFunction(canvas.toDataURL('image/png'));

      canvas.remove();
    }
  }

  /**
   * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
   * images to fit into a certain area.
   *
   * @param {Number} srcWidth width of source image
   * @param {Number} srcHeight height of source image
   * @param {Number} maxWidthF maximum available width
   * @param {Number} maxHeightF maximum available height
   * @return {Object} { width, height }
   */
  const calculateAspectRatioFit = (srcWidth:number, srcHeight:number, maxWidthF:number, maxHeightF:number) => {
    let ratio = Math.min(maxWidthF / srcWidth, maxHeightF / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
  }


  /**
   * Effect to initialize the Fabric.js canvas on component mount.
   */
  useEffect(() => {
    if (canvasRef && !canvasRef.current) {
      canvasRef.current = new fabric.Canvas('canvas-mapeamento');
      canvasRef.current.setWidth(maxWidth);
      canvasRef.current.setHeight(maxHeight);
    }

    toDataURL(imageUrl, (dataUrl: string) => {
      dispatch(setImagePriview(imageUrl as string));
    });

  }, []);

  /**
   * Effect to set the uploaded image as the canvas background and resize the canvas.
   */
  useEffect(() => {
    if (canvasRef?.current && imagePreview) {
      fabric.Image.fromURL(imagePreview, (img) => {
        let imgWidth = typeof(img.width) !== 'undefined' ? img.width : 0;
        let imgHeight = typeof(img.height) !== 'undefined' ? img.height : 0;

        let ratio = Math.min(maxWidth/imgWidth, maxHeight/imgHeight);

        if(imgWidth > imgHeight) {
          img.scaleToWidth(imgWidth * ratio);
        } else {
          img.scaleToHeight(imgHeight*ratio);
        }

        // @ts-ignore
        canvasRef.current?.setBackgroundImage(img, canvasRef.current!.renderAll.bind(canvasRef.current), {
          originX: 'left',
          originY: 'top',
          left: (maxWidth-(imgWidth * ratio))/2,
          top: (maxHeight-(imgHeight * ratio))/2,
        });

      });
    }

  }, [imagePreview]);

  return (
      <>
        <div className={styles.imageParent}>
          <canvas id="canvas-mapeamento" className={styles.baseImage} />
        </div>
      </>
  );
}
