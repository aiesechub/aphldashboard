// src/admin/App.jsx

import aiesecLogo from './assets/logos/AIESEC-white.png';
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { F, BRAND, NOISE_SVG, Spinner } from "./lib/constants.jsx";

import EventsManager      from "./pages/EventsManager.jsx";
import Opportunities      from "./pages/Opportunities.jsx";
import ExternalsDashboard from "./pages/ExternalsDashboard";
import InternalsDashboard from "./pages/InternalsDashboard";

// ─── GOOGLE ICON ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ domainError, onGoogleSignIn, loading }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: F.body,
      backgroundColor: "#ffffff",
      position: "relative", overflow: "hidden",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      {/* Subtle blue accent corners */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.blueMid} 50%, ${BRAND.blueLight} 100%)`,
      }} />
      <div style={{
        position: "absolute", top: "-12rem", right: "-12rem",
        width: "28rem", height: "28rem", borderRadius: "9999px",
        background: `radial-gradient(circle, ${BRAND.blueLight}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10rem", left: "-10rem",
        width: "24rem", height: "24rem", borderRadius: "9999px",
        background: `radial-gradient(circle, ${BRAND.blueLight}1a 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 420 }}>
        <div style={{
          position: "relative",
          backgroundColor: "#ffffff",
          border: `1px solid ${BRAND.border}`,
          borderRadius: 20,
          padding: "44px 36px 36px",
          boxShadow: "0 4px 24px rgba(3, 126, 243, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{
              backgroundColor: BRAND.blue,
              padding: "12px 24px", borderRadius: 12,
              display: "inline-flex", alignItems: "center",
              boxShadow: `0 8px 24px ${BRAND.blue}33`,
            }}>
              <img src={aiesecLogo} alt="AIESEC PH"
                style={{ height: "1.9rem", width: "auto", objectFit: "contain" }} />
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{
              fontFamily: F.barabara, fontSize: 20, margin: 0,
              color: BRAND.text, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              fontFamily: F.body, fontSize: 13, color: BRAND.textLight,
              margin: "8px 0 0", lineHeight: 1.5,
            }}>
              Sign in with your AIESEC Google account
            </p>
          </div>

          {domainError && (
            <div style={{
              backgroundColor: "#fff5f5",
              border: `1px solid ${BRAND.danger}33`,
              borderRadius: 10, padding: "10px 14px",
              fontSize: 12, color: BRAND.danger, fontWeight: 600,
              marginBottom: 20,
            }}>
              ✕ {domainError}
            </div>
          )}

          <button
            onClick={onGoogleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              padding: "14px 20px",
              backgroundColor: "#ffffff",
              border: `1.5px solid ${BRAND.border}`,
              borderRadius: 12,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: F.body, fontSize: 14, fontWeight: 600, color: BRAND.text,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => {
              if (loading) return;
              e.currentTarget.style.borderColor = BRAND.blue;
              e.currentTarget.style.backgroundColor = BRAND.blueGhost || "#f5fbff";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = `0 4px 12px ${BRAND.blue}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = BRAND.border;
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}>
            {loading ? <Spinner size={16} color={BRAND.text} /> : <GoogleIcon />}
            {loading ? "Signing in…" : "Continue with Google"}
          </button>

          <div style={{
            marginTop: 28, paddingTop: 20,
            borderTop: `1px solid ${BRAND.border}`,
            textAlign: "center",
          }}>
            <p style={{
              fontSize: 11, color: BRAND.textLight, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.14em",
              margin: 0,
            }}>
              AIESEC in the Philippines · Admin Only
            </p>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── SECTION SELECTOR ─────────────────────────────────────────────────────────
function SectionSelector({ onSelectSection }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: F.body,
      backgroundColor: "#ffffff",
      position: "relative", overflow: "hidden",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.blueMid} 50%, ${BRAND.blueLight} 100%)`,
      }} />
      <div style={{
        position: "absolute", top: "-10rem", right: "-10rem",
        width: "28rem", height: "28rem", borderRadius: "9999px",
        background: `radial-gradient(circle, ${BRAND.blueLight}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 560 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{
            backgroundColor: BRAND.blue,
            padding: "12px 24px", borderRadius: 12,
            display: "inline-flex", alignItems: "center",
            boxShadow: `0 8px 24px ${BRAND.blue}33`,
          }}>
            <img src={aiesecLogo} alt="AIESEC PH"
              style={{ height: "1.9rem", width: "auto", objectFit: "contain" }} />
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{
            fontFamily: F.barabara, fontSize: 28, margin: 0,
            color: BRAND.text, letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            Site Manager
          </h1>
          <p style={{
            fontFamily: F.body, fontSize: 14, color: BRAND.textLight,
            margin: "12px 0 0", lineHeight: 1.6,
          }}>
            Choose which portal you'd like to manage
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <button
            onClick={() => onSelectSection("externals")}
            style={{
              padding: "40px 24px",
              border: `2px solid ${BRAND.blue}`,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
              boxShadow: "0 2px 8px rgba(3, 126, 243, 0.08)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 28px ${BRAND.blue}22`;
              e.currentTarget.style.backgroundColor = BRAND.blueGhost || "#f5fbff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(3, 126, 243, 0.08)";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}>
            <span style={{ fontSize: 48 }}>🌍</span>
            <div style={{ textAlign: "center" }}>
              <h2 style={{
                fontFamily: F.barabara, fontSize: 18, margin: 0,
                color: BRAND.text, letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                Externals
              </h2>
              <p style={{ fontFamily: F.body, fontSize: 12, color: BRAND.textLight, margin: "6px 0 0" }}>
                Global products & events
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectSection("internals")}
            style={{
              padding: "40px 24px",
              border: `2px solid ${BRAND.border}`,
              borderRadius: 16,
              backgroundColor: "#ffffff",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
              opacity: 0.6,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; }}>
            <span style={{ fontSize: 48 }}>🏢</span>
            <div style={{ textAlign: "center" }}>
              <h2 style={{
                fontFamily: F.barabara, fontSize: 18, margin: 0,
                color: BRAND.textMid, letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                Internals
              </h2>
              <p style={{ fontFamily: F.body, fontSize: 12, color: BRAND.textLight, margin: "6px 0 0" }}>
                Coming soon
              </p>
            </div>
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [session,         setSession]         = useState(undefined);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading,         setLoading]         = useState(false);
  const [domainError,     setDomainError]     = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s && !s.user.email?.endsWith("@aiesec.ph")) {
        supabase.auth.signOut();
        setDomainError("Access restricted to @aiesec.ph accounts.");
        setSession(null);
      } else {
        setSession(s);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      if (s && !s.user.email?.endsWith("@aiesec.ph")) {
        supabase.auth.signOut();
        setDomainError("Access restricted to @aiesec.ph accounts.");
        setSession(null);
      } else {
        setDomainError("");
        setSession(s);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setDomainError("");
    const googleDomain = import.meta.env.VITE_GOOGLE_DOMAIN;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        hd: googleDomain,
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    });
    if (error) {
      setDomainError(error.message || "Google sign-in failed.");
      setLoading(false);
    }
  };

  const handleBack = () => setSelectedSection(null);

  if (session === undefined) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
      <Spinner size={36} />
    </div>
  );

  if (!session) return (
    <LoginScreen
      domainError={domainError}
      onGoogleSignIn={handleGoogleSignIn}
      loading={loading}
    />
  );

  if (!selectedSection) return <SectionSelector onSelectSection={setSelectedSection} />;
  if (selectedSection === "externals") return <ExternalsDashboard session={session} onBack={handleBack} />;
  if (selectedSection === "internals") return <InternalsDashboard session={session} onBack={handleBack} />;

  return <SectionSelector onSelectSection={setSelectedSection} />;
}