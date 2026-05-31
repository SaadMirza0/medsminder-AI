"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function TermsOfService({ onBackHome }) {
  // Balanced cascading entry transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface py-12 px-4 md:px-margin-desktop">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-3xl mx-auto bg-white border border-outline-variant rounded-3xl p-8 md:p-12 shadow-sm"
      >
        
        {/* Navigation Row */}
        <motion.div variants={itemVariants} className="mb-8">
          <button 
            onClick={onBackHome}
            className="flex items-center gap-2 text-secondary font-label-md text-label-md bg-transparent border-0 cursor-pointer hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Dashboard
          </button>
        </motion.div>

        {/* Header Title Grid */}
        <motion.div variants={itemVariants} className="border-b border-outline-variant pb-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">gavel</span>
            <h1 className="font-headline-xl text-[36px] md:text-[44px] text-primary font-bold tracking-tight m-0">
              Terms of Service
            </h1>
          </div>
          <p className="font-body-sm text-body-sm text-outline m-0 font-medium tracking-wide uppercase">
            Last updated: May 2026
          </p>
        </motion.div>

        {/* Main Content Body */}
        <div className="space-y-8">
          
          {/* Simple Intro */}
          <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Welcome to <strong className="text-primary font-bold">Medsminder</strong>. By using our website and AI tools, you agree to follow the simple rules outlined below.
          </motion.p>

          {/* Section 1: Crucial Medical Disclaimer */}
          <motion.section variants={itemVariants} className="bg-error-container/10 border border-error-container/30 p-6 rounded-2xl space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="material-symbols-outlined text-error text-[22px]">warning</span>
              1. Important Medical Warning (Read First)
            </h3>
            <div className="space-y-3 pl-2">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-error mt-2.5 shrink-0" />
                <p className="font-body-md text-on-surface-variant m-0">
                  <strong className="text-primary font-semibold">AI is an Assistant, Not a Doctor:</strong> Medsminder uses AI to read messy handwriting. It is built for demonstration purposes and cannot replace professional medical advice, diagnosis, or treatment.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-error mt-2.5 shrink-0" />
                <p className="font-body-md text-on-surface-variant m-0">
                  <strong className="text-primary font-semibold">Double-Check Everything:</strong> Always verify the AI results with a certified pharmacist or medical professional before taking or handing out any prescription drugs.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Fair Usage */}
          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              2. Rules for Using the App
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed pl-2 m-0">
              You agree to use this platform responsibly and legally. You must only upload photos of prescriptions that belong to you, or that you have explicit legal permission to possess and analyze.
            </p>
          </motion.section>

          {/* Section 3: Safety Net Protection for the Developer */}
          <motion.section variants={itemVariants} className="space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight flex items-center gap-2 m-0">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              3. Limitation of Liability ("As Is")
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed pl-2 m-0">
              This application is provided completely <strong className="font-semibold text-primary">"as is."</strong> Because AI models can occasionally make mistakes, the developer and platform are not responsible for any medical errors, wrong dosages, or problems caused by relying on the automated results.
            </p>
          </motion.section>

          {/* Help Contact Trigger Block */}
          <motion.section variants={itemVariants} className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-headline-md text-base text-primary font-bold m-0 mb-1">Have questions about these rules?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant m-0">We respond to support queries within 10 minutes.</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/Contact"
              className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md text-label-md hover:shadow-md transition-all no-underline text-center shrink-0"
            >
              Contact Support
            </motion.a>
          </motion.section>

        </div>

        {/* Global Protection Stamp */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-outline-variant/60 text-center"
        >
          <p className="font-body-sm text-[12px] text-outline m-0">
            Platform Protection Terms • Built for Technical Demonstration
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
