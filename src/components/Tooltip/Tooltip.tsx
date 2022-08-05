import { motion } from "framer-motion";
import { useState } from "react";
import { Transitions } from "../../animations";
import './Tooltip.styles.scss'

type TooltipProps = {
    tooltipName: string,
    children: JSX.Element
}

const Tooltip = ({ tooltipName, children }:TooltipProps) => {
    const [ show, setShow ] = useState(false)

	return (
		<div className="tooltip-container">
			<button onClick={ () => setShow(!show) }>
                { tooltipName }
            </button>
            { show && (
                <motion.div
                    className="tooltip-content"
                    initial={Transitions.basic.initial}
                    animate={Transitions.basic.animate}
                    transition={Transitions.basic.transition}
                >
                    {children}
                </motion.div>
            ) }
		</div>
	);
};

export default Tooltip;
