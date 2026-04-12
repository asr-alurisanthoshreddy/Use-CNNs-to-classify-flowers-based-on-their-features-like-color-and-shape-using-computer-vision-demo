import { Link } from "wouter";
import { Leaf, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-black/50 dark:border-white/5"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 group-active:scale-95">
            <Leaf className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl font-bold tracking-tight text-foreground"
          >
            HSSAN
          </span>
        </Link>

        <Link href="/architecture" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <BookOpen className="h-4 w-4" />
          <span>Architecture</span>
        </Link>
      </div>
    </motion.header>
  );
}
