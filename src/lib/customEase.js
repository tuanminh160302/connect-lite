import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase)

const slideEase = () => {
    CustomEase.create('slide', "M0,0 C0.29,0 0.345,0.015 0.416,0.1 0.485,0.183 0.478,0.358 0.498,0.502 0.512,0.602 0.517,0.794 0.58,0.888 0.655,0.999 0.704,1 1,1 ")
}

export default slideEase