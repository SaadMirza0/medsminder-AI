"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSupport({ onBackHome }) {
 
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
        
     
        <motion.div variants={itemVariants} className="mb-8">
          <a 
          href='/'
            className="flex items-center gap-2 text-secondary font-label-md text-label-md bg-transparent border-0 cursor-pointer hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Dashboard
          </a>
        </motion.div>

      
        <motion.div variants={itemVariants} className="border-b border-outline-variant pb-6 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">support_agent</span>
            <h1 className="font-headline-xl text-[36px] md:text-[44px] text-primary font-bold tracking-tight m-0">
              Contact Support
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 max-w-xl leading-relaxed">
            Have questions or need assistance with the Medsminder platform? Connect with us directly through any of our channels below.
          </p>
        </motion.div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
      
          <motion.a 
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            href="mailto:saadmirzapak@://gmail.com"
            className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant hover:border-primary/50 transition-colors shadow-sm flex flex-col justify-between no-underline group"
          >
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
          <h3 className="font-headline-md text-lg text-primary font-bold m-0 mb-2">Email Address</h3>
              <p className="font-body-sm text-sm text-on-surface-variant m-0 leading-relaxed">
            Send us your clinical workflow, bug reports, or partnership inquiries anytime.
              </p>
            </div>
            <p className="font-body-md font-bold text-primary mt-6 m-0 break-all">
              saadmirzapak@gmail.com
        </p>
          </motion.a>
          <motion.a 
         variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
    href="https://wa.me" 
   target="_blank" 
            rel="noopener noreferrer"
  className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant hover:border-emerald-500/50 transition-colors shadow-sm flex flex-col justify-between no-underline group"
>
<div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </div>
              <h3 className="font-headline-md text-lg text-primary font-bold m-0 mb-2">WhatsApp Live</h3>
              <p className="font-body-sm text-sm text-on-surface-variant m-0 leading-relaxed">
                Chat with support immediately for fast assistance and response loops.
              </p>
            </div>
            <p className="font-body-md font-bold text-emerald-600 mt-6 m-0 flex items-center gap-1">
              Start Chat
              <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </p>
          </motion.a>

          <motion.a 
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            href="tel:+923010544620"
            className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant hover:border-secondary/50 transition-colors shadow-sm flex flex-col justify-between no-underline group md:col-span-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-lg text-primary font-bold m-0 mb-1">Phone Line</h3>
                  <p className="font-body-sm text-sm text-on-surface-variant m-0 max-w-md leading-relaxed">
                    Available for direct audio calls and technical consulting during business hours.
                  </p>
                </div>
              </div>
              <p className="font-headline-md text-xl font-bold text-primary m-0 self-start sm:self-center">
                0301-0544620
              </p>
            </div>
          </motion.a>

        </div>



      </motion.div>
    </div>
  );
}
