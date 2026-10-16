import React, { useEffect, useRef, useState } from "react";

/**
 * Reusable animated section wrapper using IntersectionObserver.
 * Triggers fade-up, fade-in, scale, or slide animations once entered in viewport.
 * Respects prefers-reduced-motion accessibility setting.
 */
export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up", // 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in'
  delay = 0,
  threshold = 0.12,
  as: Component = "div",
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, disconnect observer so it doesn't flicker or re-trigger jarringly
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, isVisible]);

  // Determine initial and visible classes based on animation type
  let animationClasses = "";
  if (animation === "fade-up") {
    animationClasses = isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8";
  } else if (animation === "fade-in") {
    animationClasses = isVisible ? "opacity-100" : "opacity-0";
  } else if (animation === "slide-left") {
    animationClasses = isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8";
  } else if (animation === "slide-right") {
    animationClasses = isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8";
  } else if (animation === "zoom-in") {
    animationClasses = isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95";
  } else if (animation === "flip-3d") {
    animationClasses = isVisible
      ? "opacity-100 [transform:perspective(1000px)_rotateX(0deg)_translateY(0)]"
      : "opacity-0 [transform:perspective(1000px)_rotateX(12deg)_translateY(24px)]";
  } else if (animation === "tilt-3d") {
    animationClasses = isVisible
      ? "opacity-100 [transform:perspective(1000px)_rotateY(0deg)_translateZ(0)]"
      : "opacity-0 [transform:perspective(1000px)_rotateY(8deg)_translateZ(-20px)]";
  }

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Component
      ref={ref}
      style={delayStyle}
      className={`transition-all duration-700 ease-out will-change-transform will-change-opacity ${animationClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
