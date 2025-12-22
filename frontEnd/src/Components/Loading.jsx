import { motion } from "framer-motion";
import '../styles/Loading.css';

const Loading = ({ text = "Loading..." }) => {
  return (
    <motion.div
      className="loading-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default Loading;
