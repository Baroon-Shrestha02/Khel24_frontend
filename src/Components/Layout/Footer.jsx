import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" fill="white" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const socials = [
  { label: "Facebook", Icon: FaFacebook },
  { label: "Twitter", Icon: BsTwitterX },
  { label: "Instagram", Icon: BsInstagram },
  { label: "YouTube", Icon: BsYoutube },
];

const sports = [
  { label: "Football", to: "/category/football" },
  { label: "Cricket", to: "/category/cricket" },
  { label: "Basketball", to: "/category/basketball" },
  { label: "Tennis", to: "/category/tennis" },
  { label: "Esports", to: "/category/esports" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Latest News", to: "/news" },
  { label: "Live Scores", to: "/scores" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const bottomLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Cookie Settings", to: "/cookies" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const linkHover = { x: 4, transition: { duration: 0.15 } };

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        {/* Main Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand Column */}
          <motion.div variants={colVariants}>
            <Link to="/" className="inline-block mb-3">
              <Link to="/" className="flex items-center">
                <img src="/main/logobg.png" alt="KhelLive24" className="h-20" />
              </Link>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Your daily source for sports news, live scores, match analysis,
              and trending stories from around the world.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socials.map(({ label, Icon }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Sports Column */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-5">
              Sports
            </p>
            <ul className="space-y-3">
              {sports.map(({ label, to }) => (
                <motion.li key={label} whileHover={linkHover}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity duration-150 text-xs">
                      →
                    </span>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <motion.li key={label} whileHover={linkHover}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity duration-150 text-xs">
                      →
                    </span>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={colVariants}>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-600 mb-5">
              Stay Updated
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Get the latest match results and breaking stories in your inbox.
            </p>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 focus-within:border-red-400 dark:focus-within:border-red-500 transition-colors duration-200">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none"
              />
              <motion.button
                onClick={handleSubscribe}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xs font-semibold transition-colors duration-150 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>

            {/* Success message */}
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={
                subscribed ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
              }
              transition={{ duration: 0.25 }}
              className="mt-2 text-xs text-green-500 dark:text-green-400"
            >
              ✓ You're subscribed! Thanks for joining.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-200 dark:border-gray-800"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Bottom Row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} Khel Khabar. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {bottomLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
