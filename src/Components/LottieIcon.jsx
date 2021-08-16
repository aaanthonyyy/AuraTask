import { useRef } from "react";
import Lottie from "react-lottie";

const LottieIcon = (props) => {
	const ref = useRef();

	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData: props.animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<Lottie
			ref={ref}
			options={defaultOptions}
			height={30}
			width={30}
			onMouseEnter={(ref) => props.handleStartHover(ref)}
			onMouseLeave={(ref) => props.handleStopHover(ref)}
			onClick={props.onClick}
		/>
	);
};

export default LottieIcon;
