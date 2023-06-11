import "./stylesheets/css-reset.css";
import { ImageSlider } from "./modules/ImageSlider.js";

const mainPageModules = {
    mainImageSlider: new ImageSlider("main", 5, 1250),
  },
  startApp = () => {
    mainPageModules.mainImageSlider.init(document.body);
  };

startApp();
