"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function AdminPage() {
  useEffect(() => {
    // Dynamically load the CMS script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Identity if needed
    const initIdentity = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", (user: any) => {
          if (!user) {
            window.netlifyIdentity.on("login", () => {
              document.location.href = "/admin/";
            });
          }
        });
      }
    };

    if (window.netlifyIdentity) {
      initIdentity();
    } else {
      // Wait for layout script to load if not yet ready
      const identityScript = document.querySelector('script[src*="netlify-identity-widget.js"]');
      if (identityScript) {
        identityScript.addEventListener('load', initIdentity);
      }
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <link rel="cms-config-url" type="text/yaml" href="/admin/config.yml" />
      <div id="nc-root" />
    </>
  );
}
