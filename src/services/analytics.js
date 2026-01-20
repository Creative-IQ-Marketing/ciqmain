// Enhanced Analytics Service with state tracking
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag("event", eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }

  // Also track in dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackPageView = (path = window.location.pathname) => {
  if (window.gtag) {
    window.gtag("config", "G-XXXXXXXXXX", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track specific state transitions
export const trackStateChange = (state, fromState, toState, metadata = {}) => {
  trackEvent(`state_change_${state}`, {
    from: fromState,
    to: toState,
    ...metadata,
  });
};

// Track user interactions
export const trackUserInteraction = (action, label, category, value = null) => {
  trackEvent(`user_interaction`, {
    action,
    label,
    category,
    value,
  });
};

// Track form events
export const trackFormEvent = (formName, eventType, fields = {}) => {
  trackEvent(`form_${eventType}`, {
    form_name: formName,
    form_fields: Object.keys(fields),
    timestamp: new Date().toISOString(),
  });
};

// Track service/section views
export const trackSectionView = (sectionName) => {
  trackEvent("section_view", {
    section: sectionName,
    viewport_height: window.innerHeight,
    viewport_width: window.innerWidth,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent("scroll_depth", {
    depth_percentage: depth,
    page_path: window.location.pathname,
  });
};

// Track outbound links
export const trackOutboundLink = (url, linkText = "") => {
  trackEvent("click_outbound", {
    link_url: url,
    link_text: linkText,
    page_path: window.location.pathname,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, buttonId = "", category = "button") => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_id: buttonId,
    category,
  });
};

// Track contact form submissions
export const trackFormSubmission = (formType) => {
  trackEvent("form_submission", {
    form_type: formType,
    page_path: window.location.pathname,
  });
};

// Track service selections
export const trackServiceSelection = (serviceName, serviceId = "") => {
  trackEvent("service_selection", {
    service_name: serviceName,
    service_id: serviceId,
  });
};

// Track testimonial views
export const trackTestimonialView = (testimonialId, testimonialAuthor = "") => {
  trackEvent("testimonial_view", {
    testimonial_id: testimonialId,
    author: testimonialAuthor,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName, ctaType, ctaText = "") => {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_type: ctaType,
    cta_text: ctaText,
    page_path: window.location.pathname,
  });
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Track page view on initialization
  trackPageView();

  // Set up scroll depth tracking
  let maxScrollDepth = 0;
  window.addEventListener("scroll", () => {
    const scrollPercentage =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage > maxScrollDepth + 25) {
      maxScrollDepth = Math.floor(scrollPercentage / 25) * 25;
      trackScrollDepth(maxScrollDepth);
    }
  });

  // Track time on page
  const startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent("page_exit", {
      time_on_page_seconds: timeOnPage,
      page_path: window.location.pathname,
    });
  });
};
