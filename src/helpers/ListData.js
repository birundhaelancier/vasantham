import Ads1 from "../assets/img/01.jpg";
import Ads2 from "../assets/img/02.jpg";
import Ads3 from "../assets/img/03.jpg";
import Ads4 from "../assets/img/04.jpg";

export const BannerImgs = [Ads1, Ads2, Ads4];
let flag = 1;

export const colorSet = (index) => {
  if (flag == 1) {
    flag = flag + 1;
    return "back3";
  } else if (flag == 2) {
    flag = flag + 1;
    return "back5";
  } else if (flag == 3) {
    flag = flag + 1;
    return "back2";
  } else if (flag == 4) {
    flag = flag + 1;
    return "back1";
  } else if (flag == 5) {
    flag = flag + 1;
    return "back4";
  } else if (flag == 6) {
    flag = 1;
    return "back6";
  }
};
