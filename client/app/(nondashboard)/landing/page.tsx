"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { featuredCoursesTags, heroImages } from "@/data";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title" />
          <Skeleton className="landing-skeleton__subtitle" />
          <Skeleton className="landing-skeleton__subtitle-secondary" />
          <Skeleton className="landing-skeleton__button" />
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>
      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />

        <div className="landing-skeleton__tags">
          {[...Array(featuredCoursesTags.length)].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__tag" />
          ))}
        </div>
        <div className="landing-skeleton__courses">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__courses-card" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  // custom hook to manage the carousel state
  const currentImage = useCarousel({ totalImages: 3 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            Explore a wide range of courses to enhance your skills and
            knowledge.
          </p>
          <div className="landing__cta">
            <Link href="/search">
              <div className="landing__cta-button">Explore Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {heroImages.map((image, index) => (
            <Image
              key={index}
              src={`${image}`}
              alt={`Hero Image ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`landing__hero-image ${index === currentImage ? "landing__hero-image--active" : ""}`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          Discover our most popular courses that learners love.
        </p>
        <div className="landing__tags">
          {featuredCoursesTags.map((tag, index) => (
            <Link
              key={index}
              href={`/search?tag=${tag}`}
              className="landing__tag"
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className="landing__courses">
          {/* Courses will be displayed here */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
