import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 32, className = "", testId }) => (
  <motion.div
    data-testid={testId}
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
