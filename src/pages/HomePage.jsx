import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import aiesecLogo from './../assets/logos/AIESEC-white.png';
import { F, BRAND, Spinner } from "../lib/constants.jsx";

export default function HomePage({ session, onSelectDashboard, onLogout }) {
  const [userInfo, setUserInfo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUserInfo({
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
        email: session.user.email,
        avatar: session.user.user_metadata?.avatar_url,
      });
    }
  }, [session]);

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    onLogout?.();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: F.body,
      backgroundColor: "#f8fafc",
      position: "relative",
      overflow: "hidden",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      {/* Animated gradient background */}
      <div style={{
        position: "absolute",
        top: "-20rem",
        right: "-20rem",
        width: "40rem",
        height: "40rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${BRAND.blueLight}15 0%, transparent 70%)`,
        pointerEvents: "none",
        animation: "float 20s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-15rem",
        left: "-15rem",
        width: "30rem",
        height: "30rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${BRAND.blue}08 0%, transparent 70%)`,
        pointerEvents: "none",
        animation: "float 25s ease-in-out infinite 2s",
      }} />

      {/* Top bar with logout */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${BRAND.blue} 0%, ${BRAND.blueMid} 50%, ${BRAND.blueLight} 100%)`,
      }} />

      <div style={{
        position: "absolute",
        top: 20,
        right: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{
          fontSize: 12,
          color: BRAND.textLight,
          textAlign: "right",
        }}>
          <p style={{ margin: 0, fontWeight: 600, color: BRAND.text }}>
            {userInfo?.name}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 11 }}>
            {userInfo?.email}
          </p>
        </div>

        {userInfo?.avatar && (
          <img
            src={userInfo.avatar}
            alt="Avatar"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `2px solid ${BRAND.blue}`,
              objectFit: "cover",
            }}
          />
        )}

        <button
          onClick={handleSignOut}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f5f5f5",
            border: `1px solid ${BRAND.border}`,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: BRAND.textLight,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={e => {
            if (isLoading) return;
            e.currentTarget.style.backgroundColor = "#ffe5e5";
            e.currentTarget.style.borderColor = BRAND.danger;
            e.currentTarget.style.color = BRAND.danger;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
            e.currentTarget.style.borderColor = BRAND.border;
            e.currentTarget.style.color = BRAND.textLight;
          }}>
          {isLoading ? (
            <Spinner size={12} color={BRAND.danger} />
          ) : (
            <span>↪</span>
          )}
          {isLoading ? "Signing out..." : "Sign Out"}
        </button>
      </div>

      {/* Main content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 900,
        textAlign: "center",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
        }}>
          <div style={{
            backgroundColor: BRAND.blue,
            padding: "12px 24px",
            borderRadius: 12,
            display: "inline-flex",
            alignItems: "center",
            boxShadow: `0 8px 24px ${BRAND.blue}33`,
          }}>
            <img
              src={aiesecLogo}
              alt="AIESEC PH"
              style={{
                height: "2rem",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Welcome heading */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{
            fontFamily: F.barabara,
            fontSize: 36,
            margin: 0,
            color: BRAND.text,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}>
            Welcome back!
          </h1>
        </div>

        <div style={{
          maxWidth: 500,
          margin: "0 auto 56px",
        }}>
          <p style={{
            fontFamily: F.body,
            fontSize: 16,
            color: BRAND.textLight,
            lineHeight: 1.6,
            margin: 0,
          }}>
            Choose which portal you'd like to access and manage your dashboard
          </p>
        </div>

        {/* Dashboard cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 28,
          marginBottom: 40,
        }}>
          {/* Externals Card */}
          <div
            onMouseEnter={() => setHoveredCard("externals")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onSelectDashboard("externals")}
            style={{
              padding: 32,
              backgroundColor: "#ffffff",
              border: `2px solid ${BRAND.blue}`,
              borderRadius: 20,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: hoveredCard === "externals" ? "translateY(-8px)" : "translateY(0)",
              boxShadow: hoveredCard === "externals"
                ? `0 16px 40px ${BRAND.blue}25`
                : "0 4px 12px rgba(3, 126, 243, 0.08)",
              position: "relative",
              overflow: "hidden",
            }}>
            {/* Accent */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${BRAND.blue}00 0%, ${BRAND.blue} 50%, ${BRAND.blue}00 100%)`,
              opacity: hoveredCard === "externals" ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }} />

            <div style={{
              fontSize: 56,
              lineHeight: 1,
              animation: hoveredCard === "externals" ? "bounce 0.6s ease" : "none",
            }}>
              🌍
            </div>

            <div>
              <h2 style={{
                fontFamily: F.barabara,
                fontSize: 22,
                margin: 0,
                color: BRAND.text,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 8,
              }}>
                Global Externals
              </h2>
              <p style={{
                fontFamily: F.body,
                fontSize: 13,
                color: BRAND.textLight,
                margin: 0,
                lineHeight: 1.5,
              }}>
                Manage global products, opportunities, and international events
              </p>
            </div>

            <div style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${BRAND.border}`,
              width: "100%",
            }}>
              <button style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: BRAND.blue,
                border: "none",
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                opacity: hoveredCard === "externals" ? 1 : 0.9,
                transform: hoveredCard === "externals" ? "scale(1.05)" : "scale(1)",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = BRAND.blueMid;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = BRAND.blue;
                }}>
                Access Dashboard →
              </button>
            </div>
          </div>

          {/* Internals Card */}
          <div
            onMouseEnter={() => setHoveredCard("internals")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onSelectDashboard("internals")}
            style={{
              padding: 32,
              backgroundColor: "#ffffff",
              border: `2px solid ${BRAND.border}`,
              borderRadius: 20,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transform: hoveredCard === "internals" ? "translateY(-8px)" : "translateY(0)",
              boxShadow: hoveredCard === "internals"
                ? `0 16px 40px ${BRAND.blue}15`
                : "0 2px 8px rgba(0, 0, 0, 0.04)",
              opacity: 0.7,
              pointerEvents: "none",
            }}>
            <div style={{
              position: "absolute",
              top: 8,
              right: 12,
              backgroundColor: BRAND.blue,
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              zIndex: 10,
              pointerEvents: "auto",
            }}>
              Coming Soon
            </div>

            <div style={{
              fontSize: 56,
              lineHeight: 1,
              opacity: 0.5,
            }}>
              🏢
            </div>

            <div>
              <h2 style={{
                fontFamily: F.barabara,
                fontSize: 22,
                margin: 0,
                color: BRAND.textMid,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 8,
              }}>
                Local Internals
              </h2>
              <p style={{
                fontFamily: F.body,
                fontSize: 13,
                color: BRAND.textLight,
                margin: 0,
                lineHeight: 1.5,
              }}>
                Manage local members, chapters, and internal operations
              </p>
            </div>

            <div style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${BRAND.border}`,
              width: "100%",
            }}>
              <button style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: BRAND.textMid,
                border: "none",
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "not-allowed",
                opacity: 0.5,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          textAlign: "center",
          fontSize: 11,
          color: BRAND.textLight,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          AIESEC in the Philippines · Admin Portal
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
