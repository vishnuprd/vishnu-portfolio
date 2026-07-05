"use client";

import { motion } from "framer-motion";
import { duration, ease } from "@/lib/motion";

/**
 * Route transition. `template.tsx` re-mounts on every navigation, so this
 * cross-fades between pages (e.g. home → /blog/[slug]).
 *
 * IMPORTANT: opacity only — animating transform/filter here would create a
 * containing block and break every `position: fixed` element (Navbar, Cursor,
 * Background, BackToTop). MotionConfig downgrades this to an instant show for
 * reduced-motion users.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
