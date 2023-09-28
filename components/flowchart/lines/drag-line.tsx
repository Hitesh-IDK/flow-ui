import styles from "./drag-line.module.css";
import Image from "next/image";
import Tooltip from "../../helpers/tooltip";
import arrowDown from "@/public/arrows/arrowDown.svg";
import lineStart from "@/public/arrows/line_start.svg";
import DemoItem from "../demo-item";

export default function (): React.JSX.Element {
  return (
    <>
      <div className={styles.line__active}>
        <Image src={lineStart} alt="point to" className={styles.line__start} />
        <DemoItem />
        <Image
          src={arrowDown}
          alt="short arrow pointing"
          className={styles.arrow__short}
        />
      </div>
    </>
  );
}
