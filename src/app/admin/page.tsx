"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function AdminPage() {
  useEffect(() => {
    // Load Identity script specifically for this page to be safe
    const idScript = document.createElement("script");
    idScript.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    idScript.async = true;
    document.head.appendChild(idScript);

    // Load CMS script
    const cmsScript = document.createElement("script");
    cmsScript.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    cmsScript.async = true;
    document.body.appendChild(cmsScript);

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

    idScript.addEventListener('load', initIdentity);

    return () => {
      if (document.head.contains(idScript)) document.head.removeChild(idScript);
      if (document.body.contains(cmsScript)) document.body.removeChild(cmsScript);
    };
  }, []);

  return (
    <>
      <link rel="cms-config-url" type="text/yaml" href="/admin/config.yml" />
      <div id="nc-root" />
    </>
  );
}
