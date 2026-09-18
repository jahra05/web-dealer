import { motion } from "framer-motion"


export default function SectionReveal({ children, className = {} }) {
    return (
        <motion.div initial={{ opacity: 0, y: 45, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    )
}