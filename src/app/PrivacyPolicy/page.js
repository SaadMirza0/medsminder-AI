"use client";

import React from "react";
import { motion } from "framer-motion";
export default function PrivacyPolicy({ onBackHome }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface py-12 px-4 md:px-margin-desktop">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-3xl mx-auto bg-white border border-outline-variant rounded-3xl p-8 md:p-12 shadow-sm"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <a
            href="/"
            className="flex items-center gap-2 text-secondary font-label-md text-label-md bg-transparent border-0 cursor-pointer hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Dashboard
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border-b border-outline-variant pb-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">
              shield_health
            </span>
            <h1 className="font-headline-xl text-[36px] md:text-[44px] text-primary font-bold tracking-tight m-0">
              Privacy Policy
            </h1>
          </div>
          <p className="font-body-sm text-body-sm text-outline m-0 font-medium tracking-wide uppercase">
            Last updated: May 2026
          </p>
        </motion.div>

        {/* Main Body */}
        <div className="space-y-8">
          <motion.p
            variants={itemVariants}
            className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
          >
            At <strong className="text-primary font-bold">Medsminder</strong>,
            we are committed to protecting your medical and personal data. This
            policy outlines how we handle information when you use our AI
            prescription analyzer tool.
          </motion.p>

          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              1. Data Collection &amp; Processing
            </h3>
            <ul className="list-none p-0 m-0 space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">
                  check_circle
                </span>
                <p className="font-body-md text-on-surface-variant m-0">
                  <strong className="text-primary font-semibold">
                    Prescription Images:
                  </strong>{" "}
                  Any photos of prescriptions you upload are processed instantly
                  in real-time by our secure AI engine to extract medication
                  details.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">
                  check_circle
                </span>
                <p className="font-body-md text-on-surface-variant m-0">
                  <strong className="text-primary font-semibold">
                    No Permanent Storage:
                  </strong>{" "}
                  Uploaded prescription images are used solely for extraction
                  and are immediately discarded. We do not store your medical
                  documents on our servers.
                </p>
              </li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              2. Data Security
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed pl-2 m-0">
              We use industry-standard encryption protocol layers to safeguard
              data transmission. Your healthcare details are strictly
              confidential, heavily protected, and legally guarded.
            </p>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-surface-container-low/50 border border-outline-variant p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="material-symbols-outlined text-secondary">
                alternate_email
              </span>
              3. Contact Us
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed m-0">
              If you have any questions about your data privacy, please contact
              us directly:
            </p>
            <div className="pt-2">
              <motion.a
                whileHover={{ x: 2 }}
                href="mailto:saadmirzapak@://gmail.com"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold font-body-md no-underline group"
              >
                saadmirzapak@gmail.com
                <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </motion.a>
            </div>
          </motion.section>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-outline-variant/60 text-center"
        >
          <p className="font-body-sm text-[12px] text-outline m-0">
            Compliance Secured • Medsminder Healthcare Operations Group
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
